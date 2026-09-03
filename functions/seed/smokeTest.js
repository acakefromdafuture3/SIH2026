/**
 * Smoke test script for deployed Live Cloud Functions on Firebase (sih2026-4b480).
 * Tests getVillages, updateWeights, getVillageDetail, and getSiteMatches against live backend.
 *
 * Usage:
 *   node functions/seed/smokeTest.js
 */

"use strict";

const BASE_URL = "https://asia-south1-sih2026-4b480.cloudfunctions.net";

/**
 * Invokes a deployed onCall Cloud Function via HTTP POST.
 * @param {string} functionName 
 * @param {Object} data 
 * @returns {Promise<any>}
 */
async function callLiveFunction(functionName, data = {}) {
  const url = `${BASE_URL}/${functionName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(`[${functionName}] HTTP ${response.status} (Non-JSON Response): ${text}`);
  }

  if (!response.ok || json.error) {
    throw new Error(
      `[${functionName}] HTTP ${response.status}: ${JSON.stringify(json.error || json)}`
    );
  }

  return json.result;
}

async function runSmokeTest() {
  console.log("════════════════════════════════════════════════════════════════");
  console.log("  LIVE SMOKE TEST — SIH2026 Firebase Backend (asia-south1)");
  console.log("════════════════════════════════════════════════════════════════\n");

  // 1. Trigger live recomputation via updateWeights
  console.log("1. Calling live updateWeights() to compute scores for all villages...");
  const updateResult = await callLiveFunction("updateWeights", {
    priority: { hazard: 0.35, exposure: 0.25, vulnerability: 0.20, history: 0.20 },
  });
  console.log(`✅ Success! ${updateResult.message}`);

  // 1b. Idempotent self-repair endpoint
  console.log("\n1b. Calling live recomputeAllPriorities()...");
  const recomputeResult = await callLiveFunction("recomputeAllPriorities", {});
  console.log(`✅ Success! ${recomputeResult.message}`);

  // 2. Test getVillages (All villages)
  console.log("\n2. Calling live getVillages()...");
  const villagesResult = await callLiveFunction("getVillages", {});
  console.log(`✅ Success! Retrieved ${villagesResult.count} villages from live Firestore:`);

  villagesResult.villages.forEach((v, index) => {
    console.log(
      `  [${index + 1}] ${v.name.padEnd(26)} | Score: ${String(v.priority_score).padEnd(5)} | Category: ${(v.priority_category || "Pending").padEnd(12)} | Pop: ${v.population}`
    );
  });

  // Assert none came back unscored — the bug this safety net exists to prevent.
  const unscored = villagesResult.villages.filter(
    (v) => typeof v.priority_score !== "number" || !Number.isFinite(v.priority_score) || !v.priority_category
  );
  if (unscored.length > 0) {
    throw new Error(
      `${unscored.length} village(s) returned without a priority score: ${unscored.map((v) => v.id).join(", ")}`
    );
  }
  console.log("✅ All villages have a numeric priority_score and category.");

  // 3. Test getVillages with Filter
  console.log("\n3. Calling live getVillages({ priority_category: 'Immediate' })...");
  const immediateResult = await callLiveFunction("getVillages", { priority_category: "Immediate" });
  console.log(`✅ Filter returned ${immediateResult.count} Immediate priority villages:`);
  immediateResult.villages.forEach((v) => {
    console.log(`  • ${v.name} (Score: ${v.priority_score})`);
  });

  // 4. Test getVillageDetail for top village
  const topVillage = villagesResult.villages[0];
  console.log(`\n4. Calling live getVillageDetail({ villageId: '${topVillage.id}' })...`);
  const detailResult = await callLiveFunction("getVillageDetail", { villageId: topVillage.id });
  console.log("✅ Success! Village Detail received from live backend:");
  console.log(`  Name: ${detailResult.village.name}`);
  console.log(`  District: ${detailResult.village.district}, State: ${detailResult.village.state}`);
  console.log(`  Priority Score: ${detailResult.village.priority_score} (${detailResult.village.priority_category})`);
  console.log(`  Top Factors:`, detailResult.village.top_factors);

  // 5. Test getSiteMatches for top village
  console.log(`\n5. Calling live getSiteMatches({ villageId: '${topVillage.id}' })...`);
  const matchesResult = await callLiveFunction("getSiteMatches", { villageId: topVillage.id });
  console.log(`✅ Success! Ranked ${matchesResult.matches.length} relocation sites for ${topVillage.name}:`);
  matchesResult.matches.forEach((m, idx) => {
    console.log(
      `  [#${idx + 1}] ${m.site_name.padEnd(42)} | Suitability: ${String(m.suitability_score).padEnd(5)} | Dist: ${m.distance_km} km`
    );
  });

  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("  Live smoke test PASSED — All deployed functions working!");
  console.log("════════════════════════════════════════════════════════════════\n");
}

runSmokeTest().catch((err) => {
  console.error("\n❌ Live smoke test FAILED:", err);
  process.exit(1);
});
