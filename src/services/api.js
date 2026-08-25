import {
  fetchVillages as fbFetchVillages,
  fetchVillageDetail as fbFetchVillageDetail,
  fetchSiteMatches as fbFetchSiteMatches,
  updateScoringWeights as fbUpdateWeights
} from "../firebase";
import {
  MOCK_VILLAGES,
  MOCK_RELOCATION_SITES,
  DEFAULT_WEIGHTS,
  getMockMatchesForVillage
} from "../data/mockChamoliData";

// In-memory state for local fallback simulation
let currentVillages = [...MOCK_VILLAGES];
let currentWeights = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS));

export const ApiService = {
  /**
   * Fetch list of villages with optional district and priority_category filtering
   */
  async getVillages(district, priorityCategory) {
    try {
      const response = await fbFetchVillages(district, priorityCategory);
      if (response && response.villages) {
        return {
          source: "live_firebase",
          count: response.count || response.villages.length,
          villages: response.villages
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
        return {
          source: "live_firebase",
          village
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
          ...response
        };
      }
    } catch (err) {
      console.warn("Live Firebase getSiteMatches unavailable, computing local matches.", err.message);
    }

    const matchData = getMockMatchesForVillage(villageId, currentWeights.site_ranking);
    return {
      source: "local_dataset",
      ...matchData
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
      console.warn("Live Firebase updateWeights unavailable, recomputing locally.", err.message);
    }

    if (newPriorityWeights) {
      currentWeights.priority = { ...currentWeights.priority, ...newPriorityWeights };
    }
    if (newSiteWeights) {
      currentWeights.site_ranking = { ...currentWeights.site_ranking, ...newSiteWeights };
    }

    // Recalculate priority scores for all villages locally
    currentVillages = currentVillages.map((v) => {
      const pw = currentWeights.priority;
      const hazardPart = (v.hazard_score || 50) * pw.hazard;
      const exposurePart = (v.exposure_score || 50) * pw.exposure;
      const vulnPart = (v.vulnerability_score || 50) * pw.vulnerability;
      const histPart = (v.history_score || 50) * pw.history;

      const priority_score = parseFloat((hazardPart + exposurePart + vulnPart + histPart).toFixed(2));

      let priority_category = "Monitor";
      if (priority_score >= 71) priority_category = "Immediate";
      else if (priority_score >= 51) priority_category = "Short-term";
      else if (priority_score >= 31) priority_category = "Medium-term";

      return {
        ...v,
        priority_score,
        priority_category
      };
    });

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
