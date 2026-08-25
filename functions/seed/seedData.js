// MOCK DATA FOR DEMO PURPOSES ONLY — not real hazard assessments of actual locations.

/**
 * Firestore Data Seeding Script & Utility
 * Populates Firestore (local emulator by default, live if --live flag is passed)
 * with mock demo data for Chamoli district, Uttarakhand.
 */

const admin = require("firebase-admin");

// 1. Mock Villages (8 documents across the 4 risk spectrum tiers)
const villagesData = [
  // --- Immediate Risk (2 villages) ---
  {
    id: "mock-village-chamoli-01",
    name: "Mock Joshigarh Upper",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.5562,
    lng: 79.5638,
    population: 2450,
    elderly_pct: 24.5,
    road_access: "poor",
    hazard_score: 92,
    hazard_factors: {
      slope: 88,
      rainfall: 94,
      landslide_history: 95,
      elevation: 85,
    },
    exposure_score: 89,
    vulnerability_score: 91,
    history_score: 95,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-chamoli-02",
    name: "Mock Helang Valley",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.5284,
    lng: 79.5126,
    population: 1820,
    elderly_pct: 21.0,
    road_access: "poor",
    hazard_score: 87,
    hazard_factors: {
      slope: 85,
      rainfall: 89,
      landslide_history: 90,
      elevation: 82,
    },
    exposure_score: 84,
    vulnerability_score: 86,
    history_score: 88,
    priority_score: null,
    priority_category: null,
  },

  // --- Short-term Risk (2 villages) ---
  {
    id: "mock-village-chamoli-03",
    name: "Mock Birahi Ridge",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4321,
    lng: 79.4182,
    population: 1400,
    elderly_pct: 18.2,
    road_access: "moderate",
    hazard_score: 72,
    hazard_factors: {
      slope: 74,
      rainfall: 70,
      landslide_history: 75,
      elevation: 68,
    },
    exposure_score: 68,
    vulnerability_score: 74,
    history_score: 70,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-chamoli-04",
    name: "Mock Pipalkoti Slope",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4290,
    lng: 79.3325,
    population: 2100,
    elderly_pct: 16.5,
    road_access: "moderate",
    hazard_score: 68,
    hazard_factors: {
      slope: 70,
      rainfall: 66,
      landslide_history: 72,
      elevation: 65,
    },
    exposure_score: 71,
    vulnerability_score: 67,
    history_score: 65,
    priority_score: null,
    priority_category: null,
  },

  // --- Medium-term Risk (2 villages) ---
  {
    id: "mock-village-chamoli-05",
    name: "Mock Nandaprayag East",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.3312,
    lng: 79.3245,
    population: 980,
    elderly_pct: 12.0,
    road_access: "moderate",
    hazard_score: 48,
    hazard_factors: {
      slope: 50,
      rainfall: 45,
      landslide_history: 48,
      elevation: 49,
    },
    exposure_score: 52,
    vulnerability_score: 46,
    history_score: 44,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-chamoli-06",
    name: "Mock Gopeshwar Heights",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4124,
    lng: 79.3512,
    population: 1650,
    elderly_pct: 11.5,
    road_access: "good",
    hazard_score: 42,
    hazard_factors: {
      slope: 44,
      rainfall: 40,
      landslide_history: 41,
      elevation: 43,
    },
    exposure_score: 45,
    vulnerability_score: 40,
    history_score: 42,
    priority_score: null,
    priority_category: null,
  },

  // --- Monitor (2 villages) ---
  {
    id: "mock-village-chamoli-07",
    name: "Mock Karnaprayag West",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.2598,
    lng: 79.2184,
    population: 820,
    elderly_pct: 8.5,
    road_access: "good",
    hazard_score: 25,
    hazard_factors: {
      slope: 22,
      rainfall: 28,
      landslide_history: 20,
      elevation: 30,
    },
    exposure_score: 26,
    vulnerability_score: 24,
    history_score: 22,
    priority_score: null,
    priority_category: null,
  },
  {
    id: "mock-village-chamoli-08",
    name: "Mock Tharali Basin",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.0654,
    lng: 79.5021,
    population: 540,
    elderly_pct: 7.0,
    road_access: "good",
    hazard_score: 18,
    hazard_factors: {
      slope: 15,
      rainfall: 20,
      landslide_history: 18,
      elevation: 19,
    },
    exposure_score: 20,
    vulnerability_score: 17,
    history_score: 15,
    priority_score: null,
    priority_category: null,
  },
];

// 2. Mock Relocation Sites (3 documents)
const relocationSitesData = [
  {
    id: "mock-site-chamoli-01",
    name: "Gopeshwar Safe Plateau Resettlement Zone",
    district: "Chamoli",
    lat: 30.4050,
    lng: 79.3280,
    hazard_risk_score: 18,
    estimated_capacity: 3500,
    water_availability: "high",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
  {
    id: "mock-site-chamoli-02",
    name: "Karnaprayag Southern Terrace Site",
    district: "Chamoli",
    lat: 30.2510,
    lng: 79.2310,
    hazard_risk_score: 22,
    estimated_capacity: 2800,
    water_availability: "good",
    road_access: "good",
    healthcare_available: true,
    schools_available: true,
  },
  {
    id: "mock-site-chamoli-03",
    name: "Gauchar Low-Hazard Valley Extension",
    district: "Chamoli",
    lat: 30.2880,
    lng: 79.1550,
    hazard_risk_score: 14,
    estimated_capacity: 4000,
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
    safety: 0.40,
    capacity: 0.20,
    infrastructure: 0.15,
    accessibility: 0.10,
    water: 0.10,
    distance: 0.05,
  },
};

/**
 * Seeds initial mock data into Firestore.
 * @param {FirebaseFirestore.Firestore} db - Firestore instance
 * @returns {Promise<{villagesCount: number, relocationSitesCount: number, configSeeded: boolean}>}
 */
async function seedFirestore(db) {
  if (!db) {
    throw new Error("Firestore database instance must be provided.");
  }

  const batch = db.batch();

  // 1. Seed villages
  for (const village of villagesData) {
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
    villagesCount: villagesData.length,
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
        console.log("[Seed] Firestore seeded successfully with Chamoli mock data:");
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
        console.log("[Seed] Live Firestore seeded successfully with Chamoli mock data:");
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
  relocationSitesData,
  weightsConfigData,
  seedFirestore,
};
