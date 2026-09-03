/**
 * SIH2026 — Firebase Cloud Functions Entrypoint
 * Region: asia-south1 (Mumbai)
 */

"use strict";

const { onRequest }          = require("firebase-functions/v2/https");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentWritten }  = require("firebase-functions/v2/firestore");
const { setGlobalOptions }   = require("firebase-functions/v2");
const logger                 = require("firebase-functions/logger");
const admin                  = require("firebase-admin");
// firebase-admin v12+ moved FieldValue out of the admin.firestore namespace
const { FieldValue }         = require("firebase-admin/firestore");

// ─── Global config ─────────────────────────────────────────────────────────────
setGlobalOptions({
  region: "asia-south1",
  cors: true,
  invoker: "public",
});

admin.initializeApp();
const db = admin.firestore();

// ─── Input validation helpers ──────────────────────────────────────────────────
/**
 * Validate a village document id.
 * @param {*} villageId
 * @returns {string} the validated villageId
 */
function validateVillageId(villageId) {
  if (typeof villageId !== "string") {
    throw new HttpsError("invalid-argument", "villageId must be a string.");
  }
  if (villageId.length < 3 || villageId.length > 128) {
    throw new HttpsError(
      "invalid-argument",
      "villageId must be between 3 and 128 characters."
    );
  }
  if (!/^[A-Za-z0-9_-]+$/.test(villageId)) {
    throw new HttpsError(
      "invalid-argument",
      "villageId may only contain alphanumeric characters, hyphens and underscores."
    );
  }
  return villageId;
}

/**
 * Validate a district name.
 * @param {*} district
 * @returns {string} the trimmed, validated district
 */
function validateDistrict(district) {
  if (typeof district !== "string") {
    throw new HttpsError("invalid-argument", "district must be a string.");
  }
  const trimmed = district.trim();
  if (trimmed.length < 2 || trimmed.length > 64) {
    throw new HttpsError(
      "invalid-argument",
      "district must be between 2 and 64 characters."
    );
  }
  return trimmed;
}

const PRIORITY_CATEGORIES = ["Immediate", "Short-term", "Medium-term", "Monitor"];

/**
 * Validate a priority category.
 * @param {*} category
 * @returns {string} the validated category
 */
function validatePriorityCategory(category) {
  if (typeof category !== "string" || !PRIORITY_CATEGORIES.includes(category)) {
    throw new HttpsError(
      "invalid-argument",
      `priority_category must be one of: ${PRIORITY_CATEGORIES.join(", ")}.`
    );
  }
  return category;
}

/**
 * Check that a lat/lng pair are numbers within India's bounding box.
 * @param {*} lat @param {*} lng
 * @returns {boolean} true if valid
 */
function isValidIndianCoordinate(lat, lng) {
  if (typeof lat !== "number" || typeof lng !== "number" ||
      Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new HttpsError(
      "invalid-argument",
      "Coordinates must be numbers."
    );
  }
  if (lat < 6.0 || lat > 37.5 || lng < 68.0 || lng > 97.5) {
    throw new HttpsError(
      "invalid-argument",
      `Coordinates (${lat}, ${lng}) are outside India bounds (lat 6.0–37.5, lng 68.0–97.5).`
    );
  }
  return true;
}

// ─── Pure scoring engines ──────────────────────────────────────────────────────
const { computePriorityScore, computeTopFactors } = require("./priorityEngine");
const { computeSuitability }                       = require("./siteRanking");

// ─── Seed utility (kept for HTTP seed endpoint) ────────────────────────────────
const { seedFirestore, relocationSitesData } = require("./seed/seedData");

// ─── Fields that are written BY recomputePriority (used for loop guard) ────────
const PRIORITY_COMPUTED_FIELDS = new Set([
  "priority_score",
  "priority_category",
  "top_factors",
  "updated_at",
]);

// ─── Haversine distance helper ─────────────────────────────────────────────────
/**
 * Straight-line distance between two lat/lng points in kilometres.
 * @param {number} lat1 @param {number} lng1
 * @param {number} lat2 @param {number} lng2
 * @returns {number}
 */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const DEFAULT_PRIORITY_WEIGHTS = Object.freeze({
  hazard: 0.35,
  exposure: 0.25,
  vulnerability: 0.20,
  history: 0.20,
});

async function getWeights() {
  const snap = await db.collection("config").doc("weights").get();
  if (!snap.exists) {
    throw new HttpsError(
      "not-found",
      "config/weights document not found. Run npm run seed first."
    );
  }
  return snap.data();
}

/**
 * Load the priority weights, never throwing — falls back to defaults so scoring
 * always has something usable.
 * @returns {Promise<Object>}
 */
async function resolvePriorityWeights() {
  try {
    const snap = await db.collection("config").doc("weights").get();
    const priority = snap.exists ? snap.data().priority : null;
    if (priority && typeof priority === "object") return priority;
  } catch (err) {
    logger.warn("[resolvePriorityWeights] falling back to defaults", err);
  }
  return { ...DEFAULT_PRIORITY_WEIGHTS };
}

/**
 * True when a village doc already carries a usable priority_score + category.
 * @param {Object} village
 * @returns {boolean}
 */
function hasComputedPriority(village) {
  return (
    village &&
    typeof village.priority_score === "number" &&
    Number.isFinite(village.priority_score) &&
    PRIORITY_CATEGORIES.includes(village.priority_category)
  );
}

/**
 * Fill in priority_score / priority_category / top_factors on a village object
 * in place, using the supplied weights. Returns true if anything was added.
 * @param {Object} village
 * @param {Object} weights
 * @returns {boolean} whether the village was mutated
 */
function backfillPriority(village, weights) {
  if (hasComputedPriority(village) &&
      Array.isArray(village.top_factors) && village.top_factors.length > 0) {
    return false;
  }
  const { priority_score, priority_category } = computePriorityScore(village, weights);
  village.priority_score = Number.isFinite(village.priority_score)
    ? village.priority_score
    : priority_score;
  village.priority_category = PRIORITY_CATEGORIES.includes(village.priority_category)
    ? village.priority_category
    : priority_category;
  if (!Array.isArray(village.top_factors) || village.top_factors.length === 0) {
    village.top_factors = computeTopFactors(village.hazard_factors || {});
  }
  return true;
}

/**
 * Recompute priority for every village document from the given weights.
 * Batched to respect Firestore's 500-op limit.
 * @param {Object} priorityWeights
 * @returns {Promise<number>} count of villages recomputed
 */
async function recomputeAllVillagePriorities(priorityWeights) {
  const villagesSnap = await db.collection("villages").get();

  const BATCH_SIZE = 499;
  let batch = db.batch();
  let opCount = 0;
  let recomputed = 0;

  for (const doc of villagesSnap.docs) {
    const village = doc.data();
    const { priority_score, priority_category } = computePriorityScore(village, priorityWeights);
    const top_factors = computeTopFactors(village.hazard_factors || {});

    batch.update(doc.ref, {
      priority_score,
      priority_category,
      top_factors,
      updated_at: FieldValue.serverTimestamp(),
    });
    opCount++;
    recomputed++;

    if (opCount >= BATCH_SIZE) {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
    }
  }
  if (opCount > 0) {
    await batch.commit();
  }

  return recomputed;
}

// ==============================================================================
// 1. recomputePriority  — Firestore trigger on villages/{villageId}
// ==============================================================================
exports.recomputePriority = onDocumentWritten(
  "villages/{villageId}",
  async (event) => {
    const { villageId } = event.params;

    // After-state of the document
    const afterSnap = event.data.after;
    if (!afterSnap.exists) {
      // Document was deleted — nothing to do
      return null;
    }

    const after  = afterSnap.data();
    const before = event.data.before.exists ? event.data.before.data() : {};

    // ── Infinite-loop guard ───────────────────────────────────────────────────
    // If EVERY changed field is one that we ourselves write, skip to avoid
    // infinite write loops.
    const changedFields = Object.keys(after).filter(
      (k) => JSON.stringify(after[k]) !== JSON.stringify(before[k])
    );
    if (
      changedFields.length > 0 &&
      changedFields.every((f) => PRIORITY_COMPUTED_FIELDS.has(f))
    ) {
      logger.info(`[recomputePriority] ${villageId}: only computed fields changed — skipping.`);
      return null;
    }

    // ── Load weights ──────────────────────────────────────────────────────────
    let weights;
    try {
      const weightsSnap = await db.collection("config").doc("weights").get();
      weights = weightsSnap.exists ? weightsSnap.data().priority : null;
    } catch (err) {
      logger.error(`[recomputePriority] ${villageId}: failed to load weights`, err);
      return null;
    }

    if (!weights) {
      logger.warn(`[recomputePriority] ${villageId}: config/weights.priority missing — using defaults.`);
      weights = { hazard: 0.35, exposure: 0.25, vulnerability: 0.20, history: 0.20 };
    }

    // ── Compute ───────────────────────────────────────────────────────────────
    const { priority_score, priority_category } = computePriorityScore(after, weights);
    const top_factors = computeTopFactors(after.hazard_factors || {});

    logger.info(`[recomputePriority] ${villageId}: score=${priority_score} category=${priority_category}`);

    // ── Write back (only the computed fields) ─────────────────────────────────
    await db.collection("villages").doc(villageId).update({
      priority_score,
      priority_category,
      top_factors,
      updated_at: FieldValue.serverTimestamp(),
    });

    return null;
  }
);

// ==============================================================================
// 2. getVillages  — onCall
//    Optional params: { district?, priority_category? }
//    Returns village docs sorted by priority_score desc.
// ==============================================================================
exports.getVillages = onCall({ cors: true, invoker: "public" }, async (request) => {
  const { district, priority_category } = request.data || {};

  let query = db.collection("villages");

  if (district !== undefined && district !== null && district !== "") {
    query = query.where("district", "==", validateDistrict(district));
  }
  if (priority_category !== undefined && priority_category !== null && priority_category !== "") {
    query = query.where("priority_category", "==", validatePriorityCategory(priority_category));
  }

  const snapshot = await query.get();
  const villages = [];
  snapshot.forEach((doc) => villages.push({ id: doc.id, ...doc.data() }));

  // ── Self-heal: any village served without a computed priority gets one now ──
  // This covers docs that were seeded but never picked up by recomputePriority
  // (trigger not deployed, cold seed, etc.). We also persist the fix so it only
  // ever happens once per document.
  const needHeal = villages.filter((v) => !hasComputedPriority(v));
  if (needHeal.length > 0) {
    const weights = await resolvePriorityWeights();
    needHeal.forEach((v) => backfillPriority(v, weights));

    logger.warn(`[getVillages] backfilled priority for ${needHeal.length} village(s)`, {
      ids: needHeal.map((v) => v.id),
    });

    const batch = db.batch();
    for (const v of needHeal) {
      batch.update(db.collection("villages").doc(v.id), {
        priority_score: v.priority_score,
        priority_category: v.priority_category,
        top_factors: v.top_factors,
        updated_at: FieldValue.serverTimestamp(),
      });
    }
    // Best-effort persistence — don't fail the read if the write-back fails.
    batch.commit().catch((err) =>
      logger.error("[getVillages] priority write-back failed", err)
    );
  }

  // Sort in-process (avoids needing a composite index for every filter combo)
  villages.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));

  logger.info(`[getVillages] returned ${villages.length} villages`, { district, priority_category });
  return { villages, count: villages.length };
});

// ==============================================================================
// 3. getVillageDetail  — onCall
//    Param: { villageId }
//    Returns full village doc; if recommended_site_id is set, merges site doc.
// ==============================================================================
exports.getVillageDetail = onCall({ cors: true, invoker: "public" }, async (request) => {
  const { villageId } = request.data || {};

  if (!villageId) {
    throw new HttpsError("invalid-argument", "villageId is required.");
  }
  validateVillageId(villageId);

  const villageSnap = await db.collection("villages").doc(villageId).get();
  if (!villageSnap.exists) {
    throw new HttpsError("not-found", `Village '${villageId}' not found.`);
  }

  const village = { id: villageSnap.id, ...villageSnap.data() };

  // Self-heal a village that was never scored (see getVillages for rationale).
  if (!hasComputedPriority(village) ||
      !Array.isArray(village.top_factors) || village.top_factors.length === 0) {
    const weights = await resolvePriorityWeights();
    if (backfillPriority(village, weights)) {
      logger.warn(`[getVillageDetail] backfilled priority for ${villageId}`);
      db.collection("villages").doc(villageId).update({
        priority_score: village.priority_score,
        priority_category: village.priority_category,
        top_factors: village.top_factors,
        updated_at: FieldValue.serverTimestamp(),
      }).catch((err) => logger.error("[getVillageDetail] write-back failed", err));
    }
  }

  // Merge recommended site if one has been assigned
  if (village.recommended_site_id) {
    const siteSnap = await db.collection("relocation_sites").doc(village.recommended_site_id).get();
    if (siteSnap.exists) {
      village.recommended_site = { id: siteSnap.id, ...siteSnap.data() };
    }
  }

  logger.info(`[getVillageDetail] ${villageId} fetched.`);
  return { village };
});

// ==============================================================================
// 4. getSiteMatches  — onCall
//    Param: { villageId }
//    Loads the village + all relocation_sites, computes haversine distance and
//    suitability score for each site, returns sorted array (best first), and
//    writes/updates village_site_matches as a side effect.
// ==============================================================================
exports.getSiteMatches = onCall({ cors: true, invoker: "public" }, async (request) => {
  const { villageId } = request.data || {};

  if (!villageId) {
    throw new HttpsError("invalid-argument", "villageId is required.");
  }
  validateVillageId(villageId);

  // Load village
  const villageSnap = await db.collection("villages").doc(villageId).get();
  if (!villageSnap.exists) {
    throw new HttpsError("not-found", `Village '${villageId}' not found.`);
  }
  const village = { id: villageSnap.id, ...villageSnap.data() };

  // Guard against malformed village coordinates before distance math
  isValidIndianCoordinate(village.lat, village.lng);

  // Load site_ranking weights
  const weightsDoc = await db.collection("config").doc("weights").get();
  const siteWeights = weightsDoc.exists
    ? weightsDoc.data().site_ranking
    : { safety: 0.40, capacity: 0.20, infrastructure: 0.15, accessibility: 0.10, water: 0.10, distance: 0.05 };

  // Load all relocation sites
  const sitesSnap  = await db.collection("relocation_sites").get();
  const sitesRaw   = [];
  sitesSnap.forEach((doc) => sitesRaw.push({ id: doc.id, ...doc.data() }));

  // Score each site
  const scored = sitesRaw.map((site) => {
    const distance_km = haversineKm(
      village.lat, village.lng,
      site.lat,    site.lng
    );
    const { suitability_score, criteria_breakdown } = computeSuitability(
      site, village, distance_km, siteWeights
    );
    return {
      site_id:          site.id,
      site_name:        site.name,
      distance_km:      Math.round(distance_km * 10) / 10,
      suitability_score,
      criteria_breakdown,
      site,
    };
  });

  // Sort best match first
  scored.sort((a, b) => b.suitability_score - a.suitability_score);

  // ── Side-effect: write village_site_matches docs ──────────────────────────
  const batch = db.batch();
  for (const match of scored) {
    const matchId  = `${villageId}_${match.site_id}`;
    const matchRef = db.collection("village_site_matches").doc(matchId);
    batch.set(
      matchRef,
      {
        village_id:         villageId,
        site_id:            match.site_id,
        distance_km:        match.distance_km,
        suitability_score:  match.suitability_score,
        criteria_breakdown: match.criteria_breakdown,
        computed_at:        FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  await batch.commit();

  logger.info(`[getSiteMatches] ${villageId}: ranked ${scored.length} sites, matches written.`);

  // Return matches without the nested site object (keep payload lean)
  return {
    village_id: villageId,
    matches:    scored.map(({ site, ...rest }) => rest),
  };
});

// ==============================================================================
// 5. updateWeights  — onCall
//    Param: { priority?, site_ranking? }  (partial or full weights object)
//    Overwrites config/weights, then batch-recomputes priority for all villages.
// ==============================================================================
exports.updateWeights = onCall({ cors: true, invoker: "public" }, async (request) => {
  const { priority, site_ranking } = request.data || {};

  if (!priority && !site_ranking) {
    throw new HttpsError(
      "invalid-argument",
      "Provide at least one of: priority, site_ranking weight objects."
    );
  }

  // Validate that priority weights sum to ~1.0 if provided
  if (priority) {
    const sum = Object.values(priority).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1.0) > 0.01) {
      throw new HttpsError(
        "invalid-argument",
        `priority weights must sum to 1.0, got ${sum.toFixed(3)}`
      );
    }
  }

  // Validate site_ranking weights sum to ~1.0 if provided
  if (site_ranking) {
    const sum = Object.values(site_ranking).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1.0) > 0.01) {
      throw new HttpsError(
        "invalid-argument",
        `site_ranking weights must sum to 1.0, got ${sum.toFixed(3)}`
      );
    }
  }

  // Load existing weights so we merge (don't clobber the other key)
  const existing   = await getWeights();
  const newWeights = {
    priority:     priority     || existing.priority,
    site_ranking: site_ranking || existing.site_ranking,
  };

  await db.collection("config").doc("weights").set(newWeights);
  logger.info("[updateWeights] config/weights updated.", newWeights);

  // ── Batch-recompute priority for all villages ─────────────────────────────
  const recomputed = await recomputeAllVillagePriorities(newWeights.priority);

  logger.info(`[updateWeights] Recomputed priority for ${recomputed} villages.`);

  return {
    message:    `Weights updated and priority recomputed for ${recomputed} villages.`,
    new_weights: newWeights,
    villages_recomputed: recomputed,
  };
});

// ==============================================================================
// 5b. recomputeAllPriorities  — onCall (no params)
//     Recomputes priority_score / priority_category / top_factors for every
//     village from the CURRENT config/weights, without changing any weights.
//     Used as an idempotent self-repair / ops recovery path.
// ==============================================================================
exports.recomputeAllPriorities = onCall({ cors: true, invoker: "public" }, async () => {
  const priorityWeights = await resolvePriorityWeights();
  const recomputed = await recomputeAllVillagePriorities(priorityWeights);

  logger.info(`[recomputeAllPriorities] Recomputed priority for ${recomputed} villages.`);

  return {
    message: `Priority recomputed for ${recomputed} villages.`,
    villages_recomputed: recomputed,
  };
});

// ==============================================================================
// Dev / Health utilities (onRequest — kept for quick curl checks)
// ==============================================================================

/** Quick health check */
exports.healthCheck = onRequest({ cors: true, invoker: "public" }, (req, res) => {
  logger.info("Health check called", { structuredData: true });
  res.status(200).json({
    status:    "ok",
    timestamp: new Date().toISOString(),
    region:    "asia-south1",
    message:   "SIH2026 Cloud Functions are running",
  });
});

/** Seed Firestore from HTTP (emulator dev only) */
exports.seedDatabase = onRequest({ cors: true, invoker: "public" }, async (req, res) => {
  // ── Guard 1: only allowed in demo / dev environments ─────────────────────────
  const env = process.env.ENVIRONMENT;
  if (env !== "demo" && env !== "dev") {
    logger.warn("[seedDatabase] blocked — ENVIRONMENT is not demo/dev", { env });
    res.status(403).json({ error: "Seed endpoint disabled in production" });
    return;
  }

  // ── Guard 2: bearer token check (only when SEED_TOKEN is configured) ─────────
  const seedToken = process.env.SEED_TOKEN;
  if (seedToken) {
    const authHeader = req.get("authorization") || "";
    if (authHeader !== `Bearer ${seedToken}`) {
      logger.warn("[seedDatabase] blocked — missing or invalid authorization header");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  try {
    const result = await seedFirestore(db);
    logger.info("Database seeded successfully", result);
    res.status(200).json({ message: "Sample data seeded successfully", ...result });
  } catch (error) {
    logger.error("Error seeding database:", error);
    res.status(500).json({ error: error.message });
  }
});
