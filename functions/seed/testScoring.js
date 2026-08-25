/**
 * Standalone scoring sanity-check test script for Majuli, Assam.
 * Run with: node functions/seed/testScoring.js
 *
 * No external dependencies — pure logic, no Firestore.
 */

const { computePriorityScore, computeTopFactors } = require("../priorityEngine");
const { computeSuitability } = require("../siteRanking");

// ─── Shared weights (matches config/weights in Firestore) ─────────────────────
const PRIORITY_WEIGHTS = {
  hazard: 0.35,
  exposure: 0.25,
  vulnerability: 0.20,
  history: 0.20,
};

const SITE_WEIGHTS = {
  safety: 0.40,
  capacity: 0.20,
  infrastructure: 0.15,
  accessibility: 0.10,
  water: 0.10,
  distance: 0.05,
};

// ─── Sample villages (Majuli, Assam) ───────────────────────────────────────────
const VILLAGES = [
  {
    name: "Mock Salmora Riverfront (Immediate)",
    data: {
      population: 2350,
      hazard_score: 93,
      exposure_score: 90,
      vulnerability_score: 92,
      history_score: 95,
      hazard_factors: { slope: 82, rainfall: 95, landslide_history: 96, elevation: 90 },
    },
  },
  {
    name: "Mock Jengraimukh Basin (Medium-term)",
    data: {
      population: 1100,
      hazard_score: 49,
      exposure_score: 51,
      vulnerability_score: 47,
      history_score: 45,
      hazard_factors: { slope: 50, rainfall: 48, landslide_history: 47, elevation: 49 },
    },
  },
  {
    name: "Mock Dakhinpat Ridge (Monitor)",
    data: {
      population: 620,
      hazard_score: 17,
      exposure_score: 19,
      vulnerability_score: 16,
      history_score: 14,
      hazard_factors: { slope: 16, rainfall: 19, landslide_history: 17, elevation: 18 },
    },
  },
];

// ─── Sample relocation sites (Majuli, Assam) ───────────────────────────────────
const SITES = [
  {
    name: "Garmur Central High-Plinth Resettlement Campus",
    data: {
      hazard_risk_score: 14,
      estimated_capacity: 4500,
      water_availability: "high",
      road_access: "good",
      healthcare_available: true,
      schools_available: true,
    },
  },
  {
    name: "Rawanapar Multi-Purpose Highland Relief Center",
    data: {
      hazard_risk_score: 18,
      estimated_capacity: 3200,
      water_availability: "high",
      road_access: "good",
      healthcare_available: true,
      schools_available: true,
    },
  },
];

// ─── Distance matrix (village → site) km ─────────────────────────────────────
const DISTANCES = {
  "Mock Salmora Riverfront (Immediate)": {
    "Garmur Central High-Plinth Resettlement Campus": 17.5,
    "Rawanapar Multi-Purpose Highland Relief Center": 14.2,
  },
  "Mock Jengraimukh Basin (Medium-term)": {
    "Garmur Central High-Plinth Resettlement Campus": 16.8,
    "Rawanapar Multi-Purpose Highland Relief Center": 19.4,
  },
  "Mock Dakhinpat Ridge (Monitor)": {
    "Garmur Central High-Plinth Resettlement Campus": 13.6,
    "Rawanapar Multi-Purpose Highland Relief Center": 9.8,
  },
};

// ─── Run tests ────────────────────────────────────────────────────────────────
console.log("════════════════════════════════════════════════════════════════════");
console.log("  SCORING SANITY-CHECK — Majuli, Assam (priorityEngine + siteRanking)");
console.log("════════════════════════════════════════════════════════════════════\n");

for (const village of VILLAGES) {
  console.log(`╔══ Village: ${village.name}`);

  // Priority scoring
  const { priority_score, priority_category } = computePriorityScore(
    village.data,
    PRIORITY_WEIGHTS
  );
  console.log(`║  Priority score : ${priority_score}`);
  console.log(`║  Category       : ${priority_category}`);

  // Top hazard factors
  const topFactors = computeTopFactors(village.data.hazard_factors);
  console.log(`║  Top 3 hazard factors:`);
  topFactors.forEach(({ factor, contribution }) => {
    console.log(`║    • ${factor.padEnd(20)} ${contribution}`);
  });

  // Suitability against each site
  for (const site of SITES) {
    const distance_km = DISTANCES[village.name]?.[site.name] ?? 15;
    const { suitability_score, criteria_breakdown } = computeSuitability(
      site.data,
      village.data,
      distance_km,
      SITE_WEIGHTS
    );
    console.log(`║`);
    console.log(`║  ↳ Site: ${site.name}`);
    console.log(`║     Distance       : ${distance_km} km`);
    console.log(`║     Suitability    : ${suitability_score}`);
    console.log(`║     Criteria breakdown:`);
    for (const [criterion, { score, weight, weighted }] of Object.entries(criteria_breakdown)) {
      console.log(
        `║       ${criterion.padEnd(16)} raw=${String(score).padStart(3)}  ×${weight}  → ${String(weighted).padStart(5)}`
      );
    }
  }

  console.log(`╚${"═".repeat(65)}\n`);
}

console.log("All scoring checks complete.\n");
