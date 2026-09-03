import {
  fetchVillages as fbFetchVillages,
  fetchVillageDetail as fbFetchVillageDetail,
  fetchSiteMatches as fbFetchSiteMatches,
  updateScoringWeights as fbUpdateWeights,
  recomputeAllPriorities as fbRecomputeAllPriorities
} from "../firebase";
import {
  MOCK_VILLAGES,
  MOCK_RELOCATION_SITES,
  DEFAULT_WEIGHTS,
  getMockMatchesForVillage
} from "../data/mockChamoliData";
import {
  computePriorityScore,
  ensureVillagePriority,
  ensureVillagesPriority
} from "../utils/priority";

// In-memory state for local fallback simulation
let currentVillages = [...MOCK_VILLAGES];
let currentWeights = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS));

// Fire the backend self-repair at most once per page load, so a stale Firestore
// (villages seeded but never scored) gets permanently fixed without hammering it.
let backendHealRequested = false;

function requestBackendHeal(reason) {
  if (backendHealRequested) return;
  backendHealRequested = true;
  console.warn(`[ApiService] ${reason} — requesting one-time backend priority recompute.`);
  Promise.resolve()
    .then(() => fbRecomputeAllPriorities())
    .then((res) => {
      if (res && typeof res.villages_recomputed === "number") {
        console.info(`[ApiService] backend recomputed ${res.villages_recomputed} villages.`);
      }
    })
    .catch((err) => {
      // Non-fatal: the client-side heal already made the UI correct.
      console.warn("[ApiService] backend recompute unavailable:", err?.message || err);
    });
}

/**
 * Normalize relocation-site match data into a consistent array shape,
 * regardless of whether the backend returns an array or a keyed object.
 * Only items with a string site_id, numeric suitability_score and numeric
 * distance_km are kept.
 * @param {*} raw
 * @returns {Array}
 */
export function validateSiteMatches(raw) {
  if (raw === null || raw === undefined) {
    return [];
  }

  const hasRequiredFields = (item) =>
    item &&
    typeof item.site_id === "string" &&
    typeof item.suitability_score === "number" &&
    typeof item.distance_km === "number";

  let candidates;
  if (Array.isArray(raw)) {
    candidates = raw;
  } else if (typeof raw === "object") {
    candidates = Object.entries(raw).map(([key, value]) => ({
      site_id: value && typeof value.site_id === "string" ? value.site_id : key,
      ...value
    }));
  } else {
    console.warn("validateSiteMatches: unexpected input type, returning empty array.", raw);
    return [];
  }

  return candidates.filter((item) => {
    if (!hasRequiredFields(item)) {
      console.warn("validateSiteMatches: dropping item missing required fields.", item);
      return false;
    }
    return true;
  });
}

export const ApiService = {
  /**
   * Fetch list of villages with optional district and priority_category filtering
   */
  async getVillages(district, priorityCategory) {
    try {
      const response = await fbFetchVillages(district, priorityCategory);
      if (response && response.villages) {
        // Guarantee every record has a usable priority_score / priority_category
        // even if the backend returned nulls (unseeded scores, stale deploy…).
        const healed = ensureVillagesPriority(response.villages, currentWeights.priority);
        const healedCount = healed.filter((v) => v.priority_healed).length;
        if (healedCount > 0) {
          requestBackendHeal(`getVillages returned ${healedCount} village(s) without a priority score`);
        }
        healed.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
        return {
          source: healedCount > 0 ? "live_firebase_healed" : "live_firebase",
          count: response.count || healed.length,
          villages: healed
        };
      }
    } catch (err) {
      console.warn("Live Firebase getVillages unavailable, using local Chamoli data.", err.message);
    }

    // Fallback logic
    let filtered = [...currentVillages];
    if (district && district !== "All") {
      filtered = filtered.filter(
        (v) => v.district.toLowerCase() === district.toLowerCase()
      );
    }
    if (priorityCategory && priorityCategory !== "All") {
      filtered = filtered.filter(
        (v) => v.priority_category.toLowerCase() === priorityCategory.toLowerCase()
      );
    }

    // Sort descending by priority_score
    filtered.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));

    return {
      source: "local_dataset",
      count: filtered.length,
      villages: filtered
    };
  },

  /**
   * Fetch full village detail
   */
  async getVillageDetail(villageId) {
    try {
      const village = await fbFetchVillageDetail(villageId);
      if (village) {
        const healed = ensureVillagePriority(village, currentWeights.priority);
        if (healed.priority_healed) {
          requestBackendHeal(`getVillageDetail(${villageId}) had no priority score`);
        }
        return {
          source: healed.priority_healed ? "live_firebase_healed" : "live_firebase",
          village: healed
        };
      }
    } catch (err) {
      console.warn("Live Firebase getVillageDetail unavailable, using local Chamoli data.", err.message);
    }

    const village = currentVillages.find((v) => v.id === villageId) || currentVillages[0];
    return {
      source: "local_dataset",
      village
    };
  },

  /**
   * Fetch relocation site matches for a village
   */
  async getSiteMatches(villageId) {
    try {
      const response = await fbFetchSiteMatches(villageId);
      if (response && response.matches) {
        return {
          source: "live_firebase",
          village_id: response.village_id || villageId,
          matches: validateSiteMatches(response.matches)
        };
      }
    } catch (err) {
      console.warn("Live Firebase getSiteMatches unavailable, computing local matches.", err.message);
    }

    const matchData = getMockMatchesForVillage(villageId, currentWeights.site_ranking) || {};
    return {
      source: "local_dataset",
      village_id: matchData.village_id || villageId,
      matches: validateSiteMatches(matchData.matches)
    };
  },

  /**
   * Update weights and recalculate priority scores
   */
  async updateWeights(newPriorityWeights, newSiteWeights) {
    try {
      const response = await fbUpdateWeights(newPriorityWeights, newSiteWeights);
      if (response && response.new_weights) {
        return {
          source: "live_firebase",
          ...response
        };
      }
    } catch (err) {
      // A validation rejection (bad weights) won't be fixed by falling back to a
      // local recompute — surface it so the UI can tell the user what's wrong.
      if (err?.code === "functions/invalid-argument" || err?.code === "invalid-argument") {
        throw new Error(err.message || "Invalid weights. Each group must sum to 100%.");
      }
      console.warn("Live Firebase updateWeights unavailable, recomputing locally.", err.message);
    }

    if (newPriorityWeights) {
      currentWeights.priority = { ...currentWeights.priority, ...newPriorityWeights };
    }
    if (newSiteWeights) {
      currentWeights.site_ranking = { ...currentWeights.site_ranking, ...newSiteWeights };
    }

    // Recalculate priority scores for all villages locally, using the exact same
    // formula and thresholds as the backend (functions/priorityEngine.js).
    currentVillages = currentVillages.map((v) => ({
      ...v,
      ...computePriorityScore(v, currentWeights.priority)
    }));

    return {
      source: "local_dataset",
      message: `Weights updated and priority recomputed for ${currentVillages.length} villages.`,
      new_weights: currentWeights,
      villages_recomputed: currentVillages.length
    };
  },

  /**
   * Get all relocation sites
   */
  getRelocationSites() {
    return MOCK_RELOCATION_SITES;
  },

  /**
   * Get current weights configuration
   */
  getWeights() {
    return currentWeights;
  }
};
