# 🌐 Frontend & UI Integration Guide — SIH2026 Backend

This guide provides the frontend, GIS, and dashboard teams with the live Firebase configuration, client SDK code snippets, and exact JSON response structures from the deployed backend.

> ⚠️ **Note on ML & Hazard Data**:  
> `hazard_score`, `hazard_factors`, and the ML pipeline are currently mock data from Data/ML team's work-in-progress. Schema will not change when real ML output replaces it — only the values will.

---

## 1. Firebase Client SDK Configuration

Install the Firebase Web SDK:

```bash
npm install firebase
```

Initialize Firebase in your frontend app (e.g. `src/firebase.js` or `src/lib/firebase.ts`):

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Live Firebase Web configuration for SIH2026
const firebaseConfig = {
  apiKey: "AIzaSyDFjququvz4BVYq9PS6e5sWkpv5oY58Yhw",
  authDomain: "sih2026-4b480.firebaseapp.com",
  projectId: "sih2026-4b480",
  storageBucket: "sih2026-4b480.firebasestorage.app",
  messagingSenderId: "896652024753",
  appId: "1:896652024753:web:61062c4540f1b918b2bb90"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Direct client reads enabled for demo)
export const db = getFirestore(app);

// IMPORTANT: All Cloud Functions are deployed in Mumbai (asia-south1)
export const functions = getFunctions(app, "asia-south1");

// (Optional) Connect to local emulator during offline UI development:
// import { connectFunctionsEmulator } from "firebase/functions";
// import { connectFirestoreEmulator } from "firebase/firestore";
// if (location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);
//   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
// }
```

---

## 2. Callable Cloud Functions (`httpsCallable`)

All Cloud Functions use Firebase `onCall` (Callable) protocol. CORS and payload serialization are handled automatically by `httpsCallable`.

```javascript
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
```

### A. `getVillages`

Fetches all villages sorted by `priority_score` descending. Optionally accepts `district` and `priority_category` filter params.

```javascript
export async function fetchVillages(district, priorityCategory) {
  const getVillagesFn = httpsCallable(functions, "getVillages");
  
  // Payload is optional (pass empty object or omit filters)
  const result = await getVillagesFn({
    district: district || undefined,              // e.g. "Chamoli"
    priority_category: priorityCategory || undefined // e.g. "Immediate" | "Short-term" | "Medium-term" | "Monitor"
  });

  return result.data; // { villages: [...], count: number }
}
```

---

### B. `getVillageDetail`

Fetches complete village data by ID. If a `recommended_site_id` is assigned, it automatically merges the full site document as `recommended_site`.

```javascript
export async function fetchVillageDetail(villageId) {
  const getVillageDetailFn = httpsCallable(functions, "getVillageDetail");
  
  const result = await getVillageDetailFn({ villageId });
  return result.data.village; // Full village object with top_factors
}
```

---

### C. `getSiteMatches`

Computes straight-line haversine distance and ranks all relocation sites against the selected village based on suitability criteria. Also persists the match results to the `village_site_matches` Firestore collection as a side-effect.

```javascript
export async function fetchSiteMatches(villageId) {
  const getSiteMatchesFn = httpsCallable(functions, "getSiteMatches");
  
  const result = await getSiteMatchesFn({ villageId });
  return result.data; // { village_id: "...", matches: [...] }
}
```

---

### D. `updateWeights`

Allows admin/policymaker users to adjust scoring criteria weights in real-time. Overwrites `config/weights` and triggers a batch priority recalculation across all villages in Firestore.

```javascript
export async function updateScoringWeights(newPriorityWeights, newSiteWeights) {
  const updateWeightsFn = httpsCallable(functions, "updateWeights");
  
  const result = await updateWeightsFn({
    priority: newPriorityWeights, // e.g. { hazard: 0.40, exposure: 0.25, vulnerability: 0.20, history: 0.15 }
    site_ranking: newSiteWeights  // e.g. { safety: 0.40, capacity: 0.20, infrastructure: 0.15, accessibility: 0.10, water: 0.10, distance: 0.05 }
  });

  return result.data; // { message: "...", new_weights: {...}, villages_recomputed: 8 }
}
```

---

## 3. Exact Real JSON Response Shapes

These payloads are pulled directly from the live deployed backend (`sih2026-4b480`) with seeded Chamoli data.

### Response 1: `getVillages`

```json
{
  "count": 8,
  "villages": [
    {
      "id": "mock-village-chamoli-01",
      "name": "Mock Joshigarh Upper",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.5562,
      "lng": 79.5638,
      "population": 2450,
      "elderly_pct": 24.5,
      "road_access": "poor",
      "hazard_score": 92,
      "hazard_factors": {
        "slope": 88,
        "rainfall": 94,
        "landslide_history": 95,
        "elevation": 85
      },
      "exposure_score": 89,
      "vulnerability_score": 91,
      "history_score": 95,
      "priority_score": 91.65,
      "priority_category": "Immediate",
      "top_factors": [
        { "factor": "landslide_history", "contribution": 95 },
        { "factor": "rainfall", "contribution": 94 },
        { "factor": "slope", "contribution": 88 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-02",
      "name": "Mock Helang Valley",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.5284,
      "lng": 79.5126,
      "population": 1820,
      "elderly_pct": 21,
      "road_access": "poor",
      "hazard_score": 87,
      "hazard_factors": {
        "slope": 85,
        "rainfall": 89,
        "landslide_history": 90,
        "elevation": 82
      },
      "exposure_score": 84,
      "vulnerability_score": 86,
      "history_score": 88,
      "priority_score": 86.25,
      "priority_category": "Immediate",
      "top_factors": [
        { "factor": "landslide_history", "contribution": 90 },
        { "factor": "rainfall", "contribution": 89 },
        { "factor": "slope", "contribution": 85 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-03",
      "name": "Mock Birahi Ridge",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.4321,
      "lng": 79.4182,
      "population": 1400,
      "elderly_pct": 18.2,
      "road_access": "moderate",
      "hazard_score": 72,
      "hazard_factors": {
        "slope": 74,
        "rainfall": 70,
        "landslide_history": 75,
        "elevation": 68
      },
      "exposure_score": 68,
      "vulnerability_score": 74,
      "history_score": 70,
      "priority_score": 71,
      "priority_category": "Immediate",
      "top_factors": [
        { "factor": "landslide_history", "contribution": 75 },
        { "factor": "slope", "contribution": 74 },
        { "factor": "rainfall", "contribution": 70 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-04",
      "name": "Mock Pipalkoti Slope",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.429,
      "lng": 79.3325,
      "population": 2100,
      "elderly_pct": 16.5,
      "road_access": "moderate",
      "hazard_score": 68,
      "hazard_factors": {
        "slope": 70,
        "rainfall": 66,
        "landslide_history": 72,
        "elevation": 65
      },
      "exposure_score": 71,
      "vulnerability_score": 67,
      "history_score": 65,
      "priority_score": 67.95,
      "priority_category": "Short-term",
      "top_factors": [
        { "factor": "landslide_history", "contribution": 72 },
        { "factor": "slope", "contribution": 70 },
        { "factor": "rainfall", "contribution": 66 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-05",
      "name": "Mock Nandaprayag East",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.3312,
      "lng": 79.3245,
      "population": 980,
      "elderly_pct": 12,
      "road_access": "moderate",
      "hazard_factors": {
        "slope": 50,
        "elevation": 49,
        "landslide_history": 48,
        "rainfall": 45
      },
      "exposure_score": 52,
      "vulnerability_score": 46,
      "history_score": 44,
      "priority_score": 47.8,
      "priority_category": "Medium-term",
      "top_factors": [
        { "factor": "slope", "contribution": 50 },
        { "factor": "elevation", "contribution": 49 },
        { "factor": "landslide_history", "contribution": 48 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-06",
      "name": "Mock Gopeshwar Heights",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.4124,
      "lng": 79.3512,
      "population": 1650,
      "elderly_pct": 11.5,
      "road_access": "good",
      "hazard_factors": {
        "slope": 44,
        "elevation": 43,
        "landslide_history": 41,
        "rainfall": 40
      },
      "exposure_score": 45,
      "vulnerability_score": 40,
      "history_score": 42,
      "priority_score": 42.35,
      "priority_category": "Medium-term",
      "top_factors": [
        { "factor": "slope", "contribution": 44 },
        { "factor": "elevation", "contribution": 43 },
        { "factor": "landslide_history", "contribution": 41 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-07",
      "name": "Mock Karnaprayag West",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.2598,
      "lng": 79.2184,
      "population": 820,
      "elderly_pct": 8.5,
      "road_access": "good",
      "hazard_factors": {
        "elevation": 30,
        "rainfall": 28,
        "slope": 22,
        "landslide_history": 20
      },
      "exposure_score": 26,
      "vulnerability_score": 24,
      "history_score": 22,
      "priority_score": 24.45,
      "priority_category": "Monitor",
      "top_factors": [
        { "factor": "elevation", "contribution": 30 },
        { "factor": "rainfall", "contribution": 28 },
        { "factor": "slope", "contribution": 22 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    },
    {
      "id": "mock-village-chamoli-08",
      "name": "Mock Tharali Basin",
      "district": "Chamoli",
      "state": "Uttarakhand",
      "lat": 30.0654,
      "lng": 79.5021,
      "population": 540,
      "elderly_pct": 7,
      "road_access": "good",
      "hazard_factors": {
        "rainfall": 20,
        "elevation": 19,
        "landslide_history": 18,
        "slope": 15
      },
      "exposure_score": 20,
      "vulnerability_score": 17,
      "history_score": 15,
      "priority_score": 17.7,
      "priority_category": "Monitor",
      "top_factors": [
        { "factor": "rainfall", "contribution": 20 },
        { "factor": "elevation", "contribution": 19 },
        { "factor": "landslide_history", "contribution": 18 }
      ],
      "updated_at": {
        "_seconds": 1787671705,
        "_nanoseconds": 898000000
      }
    }
  ]
}
```

---

### Response 2: `getVillageDetail`

```json
{
  "village": {
    "id": "mock-village-chamoli-01",
    "name": "Mock Joshigarh Upper",
    "district": "Chamoli",
    "state": "Uttarakhand",
    "lat": 30.5562,
    "lng": 79.5638,
    "population": 2450,
    "elderly_pct": 24.5,
    "road_access": "poor",
    "hazard_score": 92,
    "hazard_factors": {
      "slope": 88,
      "rainfall": 94,
      "landslide_history": 95,
      "elevation": 85
    },
    "exposure_score": 89,
    "vulnerability_score": 91,
    "history_score": 95,
    "priority_score": 91.65,
    "priority_category": "Immediate",
    "top_factors": [
      { "factor": "landslide_history", "contribution": 95 },
      { "factor": "rainfall", "contribution": 94 },
      { "factor": "slope", "contribution": 88 }
    ],
    "updated_at": {
      "_seconds": 1787671705,
      "_nanoseconds": 898000000
    }
  }
}
```

---

### Response 3: `getSiteMatches`

```json
{
  "village_id": "mock-village-chamoli-01",
  "matches": [
    {
      "site_id": "mock-site-chamoli-03",
      "site_name": "Gauchar Low-Hazard Valley Extension",
      "distance_km": 49.3,
      "suitability_score": 82,
      "criteria_breakdown": {
        "safety": {
          "score": 86,
          "weight": 0.4,
          "weighted": 34.4
        },
        "capacity": {
          "score": 63,
          "weight": 0.2,
          "weighted": 12.6
        },
        "infrastructure": {
          "score": 100,
          "weight": 0.15,
          "weighted": 15
        },
        "accessibility": {
          "score": 100,
          "weight": 0.1,
          "weighted": 10
        },
        "water": {
          "score": 100,
          "weight": 0.1,
          "weighted": 10
        },
        "distance": {
          "score": 0,
          "weight": 0.05,
          "weighted": 0
        }
      }
    },
    {
      "site_id": "mock-site-chamoli-01",
      "site_name": "Gopeshwar Safe Plateau Resettlement Zone",
      "distance_km": 28.2,
      "suitability_score": 76.4,
      "criteria_breakdown": {
        "safety": {
          "score": 82,
          "weight": 0.4,
          "weighted": 32.8
        },
        "capacity": {
          "score": 43,
          "weight": 0.2,
          "weighted": 8.6
        },
        "infrastructure": {
          "score": 100,
          "weight": 0.15,
          "weighted": 15
        },
        "accessibility": {
          "score": 100,
          "weight": 0.1,
          "weighted": 10
        },
        "water": {
          "score": 100,
          "weight": 0.1,
          "weighted": 10
        },
        "distance": {
          "score": 0,
          "weight": 0.05,
          "weighted": 0
        }
      }
    },
    {
      "site_id": "mock-site-chamoli-02",
      "site_name": "Karnaprayag Southern Terrace Site",
      "distance_km": 46.6,
      "suitability_score": 66.5,
      "criteria_breakdown": {
        "safety": {
          "score": 78,
          "weight": 0.4,
          "weighted": 31.2
        },
        "capacity": {
          "score": 14,
          "weight": 0.2,
          "weighted": 2.8
        },
        "infrastructure": {
          "score": 100,
          "weight": 0.15,
          "weighted": 15
        },
        "accessibility": {
          "score": 100,
          "weight": 0.1,
          "weighted": 10
        },
        "water": {
          "score": 75,
          "weight": 0.1,
          "weighted": 7.5
        },
        "distance": {
          "score": 0,
          "weight": 0.05,
          "weighted": 0
        }
      }
    }
  ]
}
```

---

### Response 4: `updateWeights`

```json
{
  "message": "Weights updated and priority recomputed for 8 villages.",
  "new_weights": {
    "priority": {
      "hazard": 0.35,
      "exposure": 0.25,
      "vulnerability": 0.2,
      "history": 0.2
    },
    "site_ranking": {
      "safety": 0.4,
      "capacity": 0.2,
      "infrastructure": 0.15,
      "accessibility": 0.1,
      "water": 0.1,
      "distance": 0.05
    }
  },
  "villages_recomputed": 8
}
```

---

## 4. UI Design Color Mapping Guide

For the GIS / Map and Dashboard UI developer:

| Priority Category | Threshold Score | Recommended Color Code | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Immediate** | $\ge 71$ | `#EF4444` (Red) | `bg-red-500 text-white` |
| **Short-term** | $\ge 51$ | `#F97316` (Orange) | `bg-orange-500 text-white` |
| **Medium-term** | $\ge 31$ | `#EAB308` (Yellow) | `bg-yellow-500 text-black` |
| **Monitor** | $< 31$ | `#10B981` (Green) | `bg-emerald-500 text-white` |
