/**
 * Integration test script for SIH2026 Cloud Functions.
 * Runs against the Firebase Emulator Suite.
 *
 * Usage (via firebase emulators:exec):
 *   npx firebase emulators:exec --only firestore,functions "node functions/seed/testFunctions.js"
 *
 * Or via npm script:
 *   npm run test:functions
 */

"use strict";

const BASE = "http://127.0.0.1:5001/sih2026-demo/asia-south1";

// ─── Thin wrappers ─────────────────────────────────────────────────────────────

async function httpGet(path) {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, body: await res.json() };
}

async function httpPost(path, body = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

/**
 * Calls a v2 onCall function via its HTTP surface.
 * The emulator exposes onCall as POST with body { data: <payload> }.
 * It returns { result: <returnValue> } on success.
 */
async function callFn(name, data = {}) {
  const res = await fetch(`${BASE}/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(
      `[${name}] HTTP ${res.status} — ${JSON.stringify(json.error || json)}`
    );
  }
  return json.result;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pass(label) {
  console.log(`  ✅ PASS  ${label}`);
}
function fail(label, detail) {
  console.error(`  ❌ FAIL  ${label}`);
  if (detail) console.error(`         ${detail}`);
}
function section(title) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ${title}`);
  console.log("─".repeat(60));
}

function assert(condition, label, detail) {
  condition ? pass(label) : fail(label, detail);
}

// ─── Delay helper (give trigger time to fire) ──────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Tests ────────────────────────────────────────────────────────────────────

async function run() {
  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("  SIH2026 Cloud Functions — Integration Tests (Emulator)");
  console.log("════════════════════════════════════════════════════════════════");

  // ── 0. Seed & health check ─────────────────────────────────────────────────
  section("0. Setup: health check + seed data");

  const health = await httpGet("/healthCheck");
  assert(health.status === 200, "healthCheck returns 200");
  assert(health.body.status === "ok", "healthCheck body.status === 'ok'");

  const seed = await httpGet("/seedDatabase");
  assert(seed.status === 200, "seedDatabase returns 200");
  assert(seed.body.villagesCount === 10, `seeded 10 villages (got ${seed.body.villagesCount})`);
  assert(seed.body.relocationSitesCount === 4, `seeded 4 sites (got ${seed.body.relocationSitesCount})`);

  // Give the recomputePriority trigger time to fire on each village write
  console.log("\n  ⏳ Waiting 8 s for recomputePriority triggers to settle...");
  await sleep(8000);

  // ── 1. getVillages ────────────────────────────────────────────────────────
  section("1. getVillages");

  const gv = await callFn("getVillages", {});
  assert(Array.isArray(gv.villages), "returns villages array");
  assert(gv.villages.length === 10, `10 villages returned (got ${gv.villages.length})`);

  // Should be sorted priority_score descending
  const scores = gv.villages.map((v) => v.priority_score);
  const isSorted = scores.every((s, i) => i === 0 || s <= scores[i - 1]);
  assert(isSorted, "villages sorted by priority_score descending", JSON.stringify(scores));

  // Every village must carry a usable, numeric priority_score. This is the core
  // guarantee: seed precomputes it, the trigger maintains it, and getVillages
  // self-heals anything that slipped through — so the dashboard can never show 0.
  const VALID_CATEGORIES = ["Immediate", "Short-term", "Medium-term", "Monitor"];
  const scored = gv.villages.every(
    (v) => typeof v.priority_score === "number" && Number.isFinite(v.priority_score) && v.priority_score > 0
  );
  assert(scored, "all villages have a finite priority_score > 0");
  const categorised = gv.villages.every((v) => VALID_CATEGORIES.includes(v.priority_category));
  assert(categorised, "all villages have a valid priority_category");
  const withFactors = gv.villages.every((v) => Array.isArray(v.top_factors) && v.top_factors.length > 0);
  assert(withFactors, "all villages have top_factors populated");

  // ── 1b. recomputeAllPriorities (idempotent self-repair endpoint) ──────────
  section("1b. recomputeAllPriorities");

  const rc = await callFn("recomputeAllPriorities", {});
  assert(
    rc.villages_recomputed === gv.villages.length,
    `recomputeAllPriorities recomputed all ${gv.villages.length} villages (got ${rc.villages_recomputed})`
  );
  const gvAfterRc = await callFn("getVillages", {});
  assert(
    gvAfterRc.villages.every((v) => Number.isFinite(v.priority_score) && v.priority_score > 0),
    "every village still scored after recomputeAllPriorities"
  );

  // District filter
  const gvDistrict = await callFn("getVillages", { district: "Majuli" });
  assert(gvDistrict.villages.length === 10, "district=Majuli filter returns 10");

  // Category filter — at least 2 Immediate villages seeded
  const gvImmediate = await callFn("getVillages", { priority_category: "Immediate" });
  assert(gvImmediate.villages.length >= 2, `Immediate villages >= 2 (got ${gvImmediate.villages.length})`);

  // Monitor villages
  const gvMonitor = await callFn("getVillages", { priority_category: "Monitor" });
  assert(gvMonitor.villages.length >= 1, `Monitor villages >= 1 (got ${gvMonitor.villages.length})`);

  // ── 2. getVillageDetail ───────────────────────────────────────────────────
  section("2. getVillageDetail");

  const sampleVillageId = gv.villages[0].id;
  const gvd = await callFn("getVillageDetail", { villageId: sampleVillageId });
  assert(gvd.village, "returns village object");
  assert(gvd.village.id === sampleVillageId, `correct villageId returned (${sampleVillageId})`);
  assert(typeof gvd.village.priority_score === "number", "priority_score is a number");
  assert(typeof gvd.village.priority_category === "string", "priority_category is a string");
  assert(Array.isArray(gvd.village.top_factors), "top_factors is an array");
  assert(gvd.village.top_factors.length <= 3, "top_factors has <= 3 entries");
  console.log(`  ℹ  Top village: "${gvd.village.name}" — score=${gvd.village.priority_score} (${gvd.village.priority_category})`);
  console.log(`  ℹ  Top factors: ${JSON.stringify(gvd.village.top_factors)}`);

  // Test not-found error
  let notFoundOk = false;
  try {
    await callFn("getVillageDetail", { villageId: "nonexistent-id" });
  } catch (err) {
    notFoundOk = err.message.includes("not-found") || err.message.includes("NOT_FOUND");
  }
  assert(notFoundOk, "getVillageDetail throws not-found for bad ID");

  // ── 3. getSiteMatches ─────────────────────────────────────────────────────
  section("3. getSiteMatches");

  const gsm = await callFn("getSiteMatches", { villageId: sampleVillageId });
  assert(gsm.village_id === sampleVillageId, "village_id echoed correctly");
  assert(Array.isArray(gsm.matches), "matches is an array");
  assert(gsm.matches.length === 4, `4 site matches returned (got ${gsm.matches.length})`);

  // Sorted descending by suitability
  const suitScores = gsm.matches.map((m) => m.suitability_score);
  const suitSorted = suitScores.every((s, i) => i === 0 || s <= suitScores[i - 1]);
  assert(suitSorted, "matches sorted by suitability_score descending", JSON.stringify(suitScores));

  const topMatch = gsm.matches[0];
  assert(topMatch.distance_km > 0, `top match has distance_km > 0 (got ${topMatch.distance_km})`);
  assert(topMatch.suitability_score > 0, `top match suitability_score > 0 (got ${topMatch.suitability_score})`);
  assert(topMatch.criteria_breakdown && typeof topMatch.criteria_breakdown === "object", "criteria_breakdown present");
  console.log(`  ℹ  Best match: "${topMatch.site_name}" — suitability=${topMatch.suitability_score}, dist=${topMatch.distance_km} km`);

  // Give Firestore a moment to confirm village_site_matches writes
  await sleep(1000);

  // ── 4. getSiteMatches for a low-priority village ──────────────────────────
  section("3b. getSiteMatches — Monitor-tier village");

  const monitorVillage = gvMonitor.villages[0];
  const gsmMonitor = await callFn("getSiteMatches", { villageId: monitorVillage.id });
  assert(gsmMonitor.matches.length === 4, `Monitor village also gets 4 matches (got ${gsmMonitor.matches.length})`);
  console.log(`  ℹ  Monitor village "${monitorVillage.name}" — top match: "${gsmMonitor.matches[0].site_name}" suitability=${gsmMonitor.matches[0].suitability_score}`);

  // ── 5. updateWeights ─────────────────────────────────────────────────────
  section("4. updateWeights");

  // Shift slightly more weight onto hazard
  const newPriorityWeights = { hazard: 0.40, exposure: 0.25, vulnerability: 0.20, history: 0.15 };
  const uw = await callFn("updateWeights", { priority: newPriorityWeights });
  assert(uw.villages_recomputed === 10, `recomputed all 10 villages (got ${uw.villages_recomputed})`);
  assert(uw.new_weights.priority.hazard === 0.40, "new hazard weight saved correctly");

  // Fetch villages again — top Immediate village score should have changed
  const gvAfterUpdate = await callFn("getVillages", {});
  const topAfter = gvAfterUpdate.villages[0];
  console.log(`  ℹ  Top village after weight update: "${topAfter.name}" — score=${topAfter.priority_score}`);
  assert(typeof topAfter.priority_score === "number", "priority_score is numeric after weight update");

  // Invalid weight (doesn't sum to 1) should error
  let invalidWeightOk = false;
  try {
    await callFn("updateWeights", { priority: { hazard: 0.5, exposure: 0.5, vulnerability: 0.5, history: 0.5 } });
  } catch (err) {
    invalidWeightOk = err.message.includes("invalid-argument") || err.message.includes("INVALID_ARGUMENT");
  }
  assert(invalidWeightOk, "updateWeights rejects weights that don't sum to 1.0");

  // Restore original weights
  await callFn("updateWeights", { priority: { hazard: 0.35, exposure: 0.25, vulnerability: 0.20, history: 0.20 } });

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("  All integration tests completed.");
  console.log("════════════════════════════════════════════════════════════════\n");
}

run().catch((err) => {
  console.error("\n[FATAL]", err);
  process.exit(1);
});
