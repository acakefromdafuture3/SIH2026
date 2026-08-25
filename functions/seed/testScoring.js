/**
 * Standalone scoring sanity-check test script.
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

// ─── Sample villages ──────────────────────────────────────────────────────────
const VILLAGES = [
  {
    name: "Mock Joshigarh Upper (Immediate)",
    data: {
      population: 2450,
      hazard_score: 92,
      exposure_score: 89,
      vulnerability_score: 91,
      history_score: 95,
      hazard_factors: { slope: 88, rainfall: 94, landslide_history: 95, elevation: 85 },
    },
  },
  {
    name: "Mock Gopeshwar Heights (Medium-term)",
    data: {
      population: 1650,
      hazard_score: 42,
      exposure_score: 45,
      vulnerability_score: 40,
      history_score: 42,
      hazard_factors: { slope: 44, rainfall: 40, landslide_history: 41, elevation: 43 },
    },
  },
  {
    name: "Mock Tharali Basin (Monitor)",
    data: {
      population: 540,
      hazard_score: 18,
      exposure_score: 20,
      vulnerability_score: 17,
      history_score: 15,
      hazard_factors: { slope: 15, rainfall: 20, landslide_history: 18, elevation: 19 },
    },
  },
];

// ─── Sample relocation sites ──────────────────────────────────────────────────
const SITES = [
  {
    name: "Gopeshwar Safe Plateau Resettlement Zone",
    data: {
      hazard_risk_score: 18,
      estimated_capacity: 3500,
      water_availability: "high",
      road_access: "good",
      healthcare_available: true,
      schools_available: true,
    },
  },
  {
    name: "Karnaprayag Southern Terrace Site",
    data: {
      hazard_risk_score: 22,
      estimated_capacity: 2800,
      water_availability: "good",
      road_access: "good",
      healthcare_available: true,
      schools_available: true,
    },
  },
];

// ─── Distance matrix (village → site) km ─────────────────────────────────────
// Approximate straight-line values; in production these come from geo calculations
const DISTANCES = {
  "Mock Joshigarh Upper (Immediate)": {
    "Gopeshwar Safe Plateau Resettlement Zone": 18.4,
    "Karnaprayag Southern Terrace Site": 32.1,
  },
  "Mock Gopeshwar Heights (Medium-term)": {
    "Gopeshwar Safe Plateau Resettlement Zone": 4.2,
    "Karnaprayag Southern Terrace Site": 17.8,
  },
  "Mock Tharali Basin (Monitor)": {
    "Gopeshwar Safe Plateau Resettlement Zone": 34.7,
    "Karnaprayag Southern Terrace Site": 23.5,
  },
};

// ─── Run tests ────────────────────────────────────────────────────────────────
console.log("════════════════════════════════════════════════════════════════════");
console.log("  SCORING SANITY-CHECK — priorityEngine + siteRanking");
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
    const distance_km = DISTANCES[village.name]?.[site.name] ?? 20;
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
