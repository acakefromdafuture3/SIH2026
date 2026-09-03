/**
 * Preview every Policy Weights preset without opening the app.
 *
 * Runs each preset through the SAME scoring code the dashboard uses
 * (src/utils/priority.js + src/data/mockChamoliData.js) and prints:
 *   1. a village-ranking matrix — one column per priority preset
 *   2. per-preset category counts and the biggest movers vs "Balanced"
 *   3. the safe-haven ranking for the top village under each site preset
 *
 * Usage:
 *   npm run test:presets
 *   node scripts/preview-weight-presets.mjs
 *   node scripts/preview-weight-presets.mjs --village hero-majuli-legacy-breach
 */

import {
  PRIORITY_WEIGHT_PRESETS,
  SITE_WEIGHT_PRESETS,
} from "../src/constants/weightPresets.js";
import { MOCK_VILLAGES, getMockMatchesForVillage } from "../src/data/mockChamoliData.js";
import { computePriorityScore, normalizeWeights } from "../src/utils/priority.js";

const arg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
};

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
const CAT_SHORT = {
  Immediate: "IMM",
  "Short-term": "SHORT",
  "Medium-term": "MED",
  Monitor: "MON",
};

// ── Rank every village under every priority preset ─────────────────────────────
function rankUnder(weights) {
  const w = normalizeWeights(weights);
  return MOCK_VILLAGES
    .map((v) => ({ id: v.id, name: v.name, ...computePriorityScore(v, w) }))
    .sort((a, b) => b.priority_score - a.priority_score)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

const rankings = Object.fromEntries(
  PRIORITY_WEIGHT_PRESETS.map((p) => [p.id, rankUnder(p.weights)])
);
const baseline = rankings.balanced ?? rankings[PRIORITY_WEIGHT_PRESETS[0].id];
const baseById = Object.fromEntries(baseline.map((r) => [r.id, r]));

// ── 1. Ranking matrix ─────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(96));
console.log("  VILLAGE RANKING BY PRIORITY PRESET   (rank · score · category)");
console.log("=".repeat(96));

const nameW = 38;
let header = pad("Village", nameW);
for (const p of PRIORITY_WEIGHT_PRESETS) header += pad(p.label, 16);
console.log(header);
console.log("-".repeat(96));

// Order rows by the baseline ranking
for (const base of baseline) {
  let line = pad(base.name, nameW);
  for (const p of PRIORITY_WEIGHT_PRESETS) {
    const row = rankings[p.id].find((r) => r.id === base.id);
    line += pad(`#${row.rank} ${padL(row.priority_score.toFixed(0), 3)} ${CAT_SHORT[row.priority_category]}`, 16);
  }
  console.log(line);
}

// ── 2. Category counts + movers ───────────────────────────────────────────────
console.log("\n" + "=".repeat(96));
console.log("  PER-PRESET SUMMARY");
console.log("=".repeat(96));

for (const p of PRIORITY_WEIGHT_PRESETS) {
  const rows = rankings[p.id];
  const counts = rows.reduce((acc, r) => {
    acc[r.priority_category] = (acc[r.priority_category] || 0) + 1;
    return acc;
  }, {});
  const countStr = ["Immediate", "Short-term", "Medium-term", "Monitor"]
    .map((c) => `${CAT_SHORT[c]} ${counts[c] || 0}`)
    .join("  ");

  console.log(`\n▸ ${p.label}  —  ${p.description}`);
  console.log(`  weights: ${JSON.stringify(p.weights)}`);
  console.log(`  categories: ${countStr}`);

  if (p.id !== baseline[0]?.presetId && p.id !== "balanced") {
    const movers = rows
      .map((r) => {
        const b = baseById[r.id];
        return {
          name: r.name,
          rankDelta: b.rank - r.rank, // positive = moved up
          scoreDelta: r.priority_score - b.priority_score,
          from: b.priority_category,
          to: r.priority_category,
        };
      })
      .filter((m) => m.rankDelta !== 0 || m.from !== m.to)
      .sort((a, b) => Math.abs(b.scoreDelta) - Math.abs(a.scoreDelta))
      .slice(0, 3);

    if (movers.length) {
      console.log("  biggest movers vs Balanced:");
      for (const m of movers) {
        const dir = m.rankDelta > 0 ? `▲${m.rankDelta}` : m.rankDelta < 0 ? `▼${-m.rankDelta}` : "  ";
        const catFlip = m.from !== m.to ? `  [${CAT_SHORT[m.from]} → ${CAT_SHORT[m.to]}]` : "";
        console.log(
          `    ${dir}  ${pad(m.name, nameW)} ${(m.scoreDelta >= 0 ? "+" : "") + m.scoreDelta.toFixed(1)} pts${catFlip}`
        );
      }
    }
  }
}

// ── 3. Site-ranking presets for the top village ──────────────────────────────
const focusId = arg("--village") || baseline[0].id;
const focus = MOCK_VILLAGES.find((v) => v.id === focusId) || MOCK_VILLAGES[0];

console.log("\n" + "=".repeat(96));
console.log(`  SAFE-HAVEN RANKING FOR "${focus.name}"  BY SITE PRESET`);
console.log("=".repeat(96));

for (const p of SITE_WEIGHT_PRESETS) {
  const { matches } = getMockMatchesForVillage(focus.id, normalizeWeights(p.weights));
  console.log(`\n▸ ${p.label}  —  ${p.description}`);
  matches.forEach((m, i) => {
    console.log(
      `    #${i + 1}  ${pad(m.site_name, 48)} fit ${padL(m.suitability_score.toFixed(1), 5)}   ${padL(m.distance_km, 5)} km`
    );
  });
}

console.log("\n" + "=".repeat(96));
console.log("  done — every preset above uses the same formula as the live dashboard.");
console.log("=".repeat(96) + "\n");
