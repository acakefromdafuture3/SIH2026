/**
 * Seed Data for Firestore — Majuli District, Assam (SIH2026)
 *
 * Populates:
 *   1. villages (10 documents) — Majuli, Assam: 8 baseline + 2 lopsided "hero" demo villages
 *   2. relocation_sites (3 documents) — High-plinth flood resettlement centers
 *   3. config/weights (1 document) — Singleton scoring weights
 *
 * Usage:
 *   Local emulator: node seed/seedData.js
 *   Live Firestore: node seed/seedData.js --live
 */

"use strict";

const admin = require("firebase-admin");
const { computePriorityScore, computeTopFactors } = require("../priorityEngine");

// 1. Mock Villages (8 documents — Majuli, Assam)
const villagesData = [
  // ── IMMEDIATE RISK (Score >= 71) ───────────────────────────────────────────
  {
    id: "mock-village-majuli-01",
    name: "Mock Salmora Riverfront",
    district: "Majuli",
    state: "Assam",
    lat: 26.8720,
    lng: 94.3120,
    population: 2350,
    elderly_pct: 22.0,
    road_access: "poor",
    hazard_score: 93,
    hazard_factors: {
      slope: 82,
      rainfall: 95,
      landslide_history: 96, // Riverbank erosion & breach frequency
      elevation: 90,        // Low elevation waterlogging risk
    },
    exposure_score: 90,
    vulnerability_score: 92,
    history_score: 95,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-majuli-02",
    name: "Mock Kamalabari Lowland",
    district: "Majuli",
    state: "Assam",
    lat: 26.9150,
    lng: 94.1680,
    population: 1950,
    elderly_pct: 19.5,
    road_access: "poor",
    hazard_score: 88,
    hazard_factors: {
      slope: 80,
      rainfall: 91,
      landslide_history: 92,
      elevation: 86,
    },
    exposure_score: 85,
    vulnerability_score: 87,
    history_score: 89,
    priority_score: null,
    priority_category: null,
  },

  // ── SHORT-TERM RISK (Score 51–70) ──────────────────────────────────────────
  {
    id: "mock-village-majuli-03",
    name: "Mock Garmur Wetland Border",
    district: "Majuli",
    state: "Assam",
    lat: 27.0120,
    lng: 94.2380,
    population: 1600,
    elderly_pct: 16.0,
    road_access: "moderate",
    hazard_score: 72,
    hazard_factors: {
      slope: 72,
      rainfall: 74,
      landslide_history: 76,
      elevation: 70,
    },
    exposure_score: 69,
    vulnerability_score: 73,
    history_score: 71,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-majuli-04",
    name: "Mock Bongaon Embankment Flank",
    district: "Majuli",
    state: "Assam",
    lat: 26.9850,
    lng: 94.3450,
    population: 2150,
    elderly_pct: 15.0,
    road_access: "moderate",
    hazard_score: 67,
    hazard_factors: {
      slope: 68,
      rainfall: 67,
      landslide_history: 70,
      elevation: 64,
    },
    exposure_score: 72,
    vulnerability_score: 66,
    history_score: 64,
    priority_score: null,
    priority_category: null,
  },

  // ── MEDIUM-TERM RISK (Score 31–50) ─────────────────────────────────────────
  {
    id: "mock-village-majuli-05",
    name: "Mock Jengraimukh Basin",
    district: "Majuli",
    state: "Assam",
    lat: 27.0850,
    lng: 94.3720,
    population: 1100,
    elderly_pct: 11.5,
    road_access: "moderate",
    hazard_score: 49,
    hazard_factors: {
      slope: 50,
      rainfall: 48,
      landslide_history: 47,
      elevation: 49,
    },
    exposure_score: 51,
    vulnerability_score: 47,
    history_score: 45,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-majuli-06",
    name: "Mock Rawanapar Terrace",
    district: "Majuli",
    state: "Assam",
    lat: 26.9640,
    lng: 94.2210,
    population: 1500,
    elderly_pct: 10.5,
    road_access: "good",
    hazard_score: 41,
    hazard_factors: {
      slope: 42,
      rainfall: 41,
      landslide_history: 40,
      elevation: 43,
    },
    exposure_score: 44,
    vulnerability_score: 39,
    history_score: 41,
    priority_score: null,
    priority_category: null,
  },

  // ── MONITOR (Score < 31) ───────────────────────────────────────────────────
  {
    id: "mock-village-majuli-07",
    name: "Mock Ahotguri Inland Plain",
    district: "Majuli",
    state: "Assam",
    lat: 26.9320,
    lng: 94.0750,
    population: 890,
    elderly_pct: 8.0,
    road_access: "good",
    hazard_score: 24,
    hazard_factors: {
      slope: 25,
      rainfall: 27,
      landslide_history: 22,
      elevation: 28,
    },
    exposure_score: 25,
    vulnerability_score: 23,
    history_score: 21,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-majuli-08",
    name: "Mock Dakhinpat Ridge",
    district: "Majuli",
    state: "Assam",
    lat: 26.8910,
    lng: 94.2620,
    population: 620,
    elderly_pct: 6.5,
    road_access: "good",
    hazard_score: 17,
    hazard_factors: {
      slope: 16,
      rainfall: 19,
      landslide_history: 17,
      elevation: 18,
    },
    exposure_score: 19,
    vulnerability_score: 16,
    history_score: 14,
    priority_score: null,
    priority_category: null,
  },
];

// 2. Mock Relocation Sites (4 documents — Distributed Highland Flood Resettlement Centers)
const relocationSitesData = [
  {
    id: "mock-site-majuli-01",
    name: "Jengraimukh Safe Highland Resettlement Campus",
    district: "Majuli",
    state: "Assam",
    lat: 27.1200,
    lng: 94.4100,
    hazard_risk_score: 12,
    estimated_capacity: 3800,
    water_availability: "high",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
  {
    id: "mock-site-majuli-02",
    name: "Rawanapar Elevated Relief Campus",
    district: "Majuli",
    state: "Assam",
    lat: 26.9680,
    lng: 94.2250,
    hazard_risk_score: 14,
    estimated_capacity: 4000,
    water_availability: "high",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
  {
    id: "mock-site-majuli-03",
    name: "Kamalabari Safe Corridor Terminal",
    district: "Majuli",
    state: "Assam",
    lat: 26.8850,
    lng: 94.1350,
    hazard_risk_score: 14,
    estimated_capacity: 3600,
    water_availability: "high",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
  {
    id: "mock-site-majuli-04",
    name: "Dakhinpat Highland Resettlement Center",
    district: "Majuli",
    state: "Assam",
    lat: 26.8750,
    lng: 94.2550,
    hazard_risk_score: 12,
    estimated_capacity: 3800,
    water_availability: "high",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
];

// 3. Config / Weights (Singleton config/weights document)
const weightsConfigData = {
  priority: {
    hazard: 0.35,
    exposure: 0.25,
    vulnerability: 0.20,
    history: 0.20,
  },
  site_ranking: {
    safety: 0.35,
    capacity: 0.20,
    infrastructure: 0.15,
    accessibility: 0.10,
    water: 0.10,
    distance: 0.10,
  },
};

// ── Hero villages (Majuli, Assam) — deliberately lopsided demo contrast pair ────
// Both sit mid-table under the default weights, but each is dominated by a single
// pillar. Shifting the weight sliders swings their scores ~40+ points in opposite
// directions and flips their ranking — a clear "what does the policy value?" demo.
const HERO_VILLAGES = [
  {
    // HAZARD-DOMINANT: an active erosion spur with almost no recorded disaster
    // history — extreme present-day physical risk, low everything else.
    id: "hero-majuli-erosion-spur",
    name: "Mock Bhakat Chapori Erosion Spur",
    district: "Majuli",
    state: "Assam",
    lat: 26.9430,
    lng: 94.2900,
    population: 1750,
    elderly_pct: 12.0,
    road_access: "poor",
    hazard_score: 97,
    hazard_factors: {
      slope: 96,
      rainfall: 94,
      landslide_history: 90,
      elevation: 95,
    },
    exposure_score: 30,
    vulnerability_score: 24,
    history_score: 12,
    priority_score: null,
    priority_category: null,
  },
  {
    // HISTORY-DOMINANT: repeatedly devastated by past embankment breaches, now
    // shielded by a new spur dyke — low current hazard, catastrophic track record.
    id: "hero-majuli-legacy-breach",
    name: "Mock Kherkota Legacy Breach Village",
    district: "Majuli",
    state: "Assam",
    lat: 27.0450,
    lng: 94.1950,
    population: 1400,
    elderly_pct: 27.5,
    road_access: "moderate",
    hazard_score: 18,
    hazard_factors: {
      slope: 20,
      rainfall: 35,
      landslide_history: 40,
      elevation: 25,
    },
    exposure_score: 30,
    vulnerability_score: 28,
    history_score: 96,
    priority_score: null,
    priority_category: null,
  },
];

/**
 * Seeds initial mock data into Firestore and cleans up obsolete documents.
 * @param {FirebaseFirestore.Firestore} db - Firestore instance
 * @returns {Promise<{villagesCount: number, relocationSitesCount: number, configSeeded: boolean}>}
 */
/**
 * Returns a copy of a village with priority_score / priority_category / top_factors
 * computed up front, so seeded documents are immediately usable even if the
 * recomputePriority trigger never fires.
 * @param {Object} village
 * @param {Object} priorityWeights
 * @returns {Object}
 */
function withComputedPriority(village, priorityWeights) {
  const { priority_score, priority_category } = computePriorityScore(village, priorityWeights);
  return {
    ...village,
    priority_score,
    priority_category,
    top_factors: computeTopFactors(village.hazard_factors || {}),
  };
}

async function seedFirestore(db) {
  if (!db) {
    throw new Error("Firestore database instance must be provided.");
  }

  // All villages to seed = base mock set + curated hero villages, each with
  // priority scores precomputed from the seeded weights.
  const priorityWeights = weightsConfigData.priority;
  const allVillages = [...villagesData, ...HERO_VILLAGES].map((v) =>
    withComputedPriority(v, priorityWeights)
  );

  // 0. Clean up obsolete documents
  const validVillageIds = new Set(allVillages.map(v => v.id));
  const validSiteIds = new Set(relocationSitesData.map(s => s.id));

  const existingVillages = await db.collection("villages").get();
  for (const doc of existingVillages.docs) {
    if (!validVillageIds.has(doc.id)) {
      await doc.ref.delete();
    }
  }

  const existingSites = await db.collection("relocation_sites").get();
  for (const doc of existingSites.docs) {
    if (!validSiteIds.has(doc.id)) {
      await doc.ref.delete();
    }
  }

  const existingMatches = await db.collection("village_site_matches").get();
  for (const doc of existingMatches.docs) {
    if (!validVillageIds.has(doc.id)) {
      await doc.ref.delete();
    }
  }

  const batch = db.batch();

  // 1. Seed villages
  for (const village of allVillages) {
    const { id, ...data } = village;
    const docRef = db.collection("villages").doc(id);
    batch.set(docRef, data, { merge: true });
  }

  // 2. Seed relocation_sites
  for (const site of relocationSitesData) {
    const { id, ...data } = site;
    const docRef = db.collection("relocation_sites").doc(id);
    batch.set(docRef, data, { merge: true });
  }

  // 3. Seed config/weights
  const configWeightsRef = db.collection("config").doc("weights");
  batch.set(configWeightsRef, weightsConfigData, { merge: true });

  await batch.commit();

  return {
    villagesCount: allVillages.length,
    relocationSitesCount: relocationSitesData.length,
    configSeeded: true,
  };
}

// Support CLI execution directly (e.g. node seed/seedData.js [--live])
if (require.main === module) {
  const isLive = process.argv.includes("--live");

  if (!isLive) {
    process.env.FIRESTORE_EMULATOR_HOST =
      process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
    process.env.GCLOUD_PROJECT = process.env.GCLOUD_PROJECT || "sih2026-4b480";
    console.log(
      `[Seed] Target: Local Emulator (${process.env.FIRESTORE_EMULATOR_HOST}, Project: ${process.env.GCLOUD_PROJECT})`
    );

    if (!admin.apps.length) {
      admin.initializeApp({ projectId: "sih2026-4b480" });
    }
    const db = admin.firestore();

    seedFirestore(db)
      .then((result) => {
        console.log("[Seed] Firestore seeded successfully with Majuli, Assam mock data:");
        console.log(`  - Villages seeded: ${result.villagesCount}`);
        console.log(`  - Relocation sites seeded: ${result.relocationSitesCount}`);
        console.log(`  - Config weights seeded: ${result.configSeeded}`);
        process.exit(0);
      })
      .catch((error) => {
        console.error("[Seed] Error seeding Firestore:", error);
        process.exit(1);
      });
  } else {
    console.log("[Seed] Target: Live Firebase Project (sih2026-4b480)");
    
    // Seed via live Cloud Function endpoint
    fetch("https://seeddatabase-yhfkm2apwq-el.a.run.app")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("[Seed] Live Firestore seeded successfully with Majuli, Assam mock data:");
        console.log(`  - Villages seeded: ${result.villagesCount}`);
        console.log(`  - Relocation sites seeded: ${result.relocationSitesCount}`);
        console.log(`  - Config weights seeded: ${result.configSeeded}`);
        process.exit(0);
      })
      .catch((error) => {
        console.error("[Seed] Error seeding live Firestore:", error);
        process.exit(1);
      });
  }
}

module.exports = {
  villagesData,
  HERO_VILLAGES,
  relocationSitesData,
  weightsConfigData,
  seedFirestore,
};
