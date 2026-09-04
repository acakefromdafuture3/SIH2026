<!-- Generated for SIH 2026 ResQ prototype — verify against live codebase before final submission -->

# ResQ — API Reference Specification

This document provides complete documentation for the 7 backend endpoints implemented in `functions/index.js`, including Cloud Functions v2 callables, HTTP endpoints, and Firestore event triggers.

---

## Endpoint Specifications

### 1. `getVillages`

* **Type:** Firebase Callable (`onCall`)
* **When It Runs / Caller:** Incurred on initial GIS Dashboard load or when changing district/category filters in `VillageList.jsx`.
* **Request Shape:**
```json
{
  "district": "Majuli",
  "priority_category": "Immediate"
}
```
*(Both parameters are optional. Omit or pass `undefined` to fetch all settlements).*

* **Response Shape:**
```json
{
  "villages": [
    {
      "id": "salmora_riverfront",
      "name": "Salmora Riverfront",
      "district": "Majuli",
      "state": "Assam",
      "lat": 26.92,
      "lng": 94.18,
      "population": 2350,
      "elderly_pct": 18.5,
      "road_access": "poor",
      "hazard_score": 93.0,
      "hazard_factors": {
        "slope": 45,
        "rainfall": 88,
        "landslide_history": 95,
        "elevation": 20
      },
      "exposure_score": 90.0,
      "vulnerability_score": 95.0,
      "history_score": 90.0,
      "priority_score": 92.45,
      "priority_category": "Immediate",
      "top_factors": [
        { "factor": "landslide_history", "contribution": 95 },
        { "factor": "vulnerability", "contribution": 95 },
        { "factor": "hazard_score", "contribution": 93 }
      ],
      "recommended_site_id": "jengraimukh_highland"
    }
  ],
  "count": 1
}
```
*(Array is strictly sorted by `priority_score` descending).*

* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| Firestore connection failure | `failed-precondition: Unable to query villages collection.` |
| Internal execution error | `internal: Internal server error while querying villages.` |

* **Frontend Usage:**
```javascript
const result = await httpsCallable(functions, 'getVillages')({ district: 'Majuli' });
```

---

### 2. `getVillageDetail`

* **Type:** Firebase Callable (`onCall`)
* **When It Runs / Caller:** Triggered when an analyst clicks a specific village card or map pin to open `VillageDetail.jsx` or `VillageDrawer.jsx`.
* **Request Shape:**
```json
{
  "villageId": "salmora_riverfront"
}
```

* **Response Shape:**
```json
{
  "village": {
    "id": "salmora_riverfront",
    "name": "Salmora Riverfront",
    "district": "Majuli",
    "state": "Assam",
    "lat": 26.92,
    "lng": 94.18,
    "population": 2350,
    "elderly_pct": 18.5,
    "road_access": "poor",
    "hazard_score": 93.0,
    "hazard_factors": {
      "slope": 45,
      "rainfall": 88,
      "landslide_history": 95,
      "elevation": 20
    },
    "exposure_score": 90.0,
    "vulnerability_score": 95.0,
    "history_score": 90.0,
    "priority_score": 92.45,
    "priority_category": "Immediate",
    "top_factors": [
      { "factor": "landslide_history", "contribution": 95 },
      { "factor": "vulnerability", "contribution": 95 },
      { "factor": "hazard_score", "contribution": 93 }
    ],
    "recommended_site_id": "jengraimukh_highland",
    "recommended_site": {
      "id": "jengraimukh_highland",
      "name": "Jengraimukh Safe Highland Campus",
      "lat": 26.98,
      "lng": 94.12,
      "hazard_risk_score": 15.0,
      "estimated_capacity": 5000,
      "water_availability": "high",
      "road_access": "good",
      "healthcare_available": true,
      "schools_available": true
    }
  }
}
```
*(If `recommended_site_id` is present, the backend joins and merges the corresponding `relocation_sites` document into `recommended_site`).*

* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| Missing `villageId` input | `invalid-argument: Village ID is required.` |
| Village document not found | `not-found: Village with ID salmora_riverfront does not exist.` |

* **Frontend Usage:**
```javascript
const result = await httpsCallable(functions, 'getVillageDetail')({ villageId: 'salmora_riverfront' });
```

---

### 3. `getSiteMatches`

* **Type:** Firebase Callable (`onCall`)
* **When It Runs / Caller:** Triggered when inspecting relocation safe havens for a selected village (`SiteMatchList.jsx`).
* **Request Shape:**
```json
{
  "villageId": "salmora_riverfront"
}
```

* **Response Shape:**
```json
{
  "village_id": "salmora_riverfront",
  "matches": [
    {
      "site_id": "jengraimukh_highland",
      "site_name": "Jengraimukh Safe Highland Campus",
      "distance_km": 8.5,
      "suitability_score": 85.4,
      "criteria_breakdown": {
        "safety": { "score": 85.0, "weight": 0.40, "weighted": 34.0 },
        "capacity": { "score": 100.0, "weight": 0.20, "weighted": 20.0 },
        "infrastructure": { "score": 100.0, "weight": 0.15, "weighted": 15.0 },
        "accessibility": { "score": 100.0, "weight": 0.10, "weighted": 10.0 },
        "water": { "score": 100.0, "weight": 0.10, "weighted": 10.0 },
        "distance": { "score": 57.5, "weight": 0.05, "weighted": 2.88 }
      }
    }
  ]
}
```
*(Side Effect: Asynchronously batch-writes computed match objects to `village_site_matches` collection).*

* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| Missing `villageId` input | `invalid-argument: Village ID is required.` |
| Target village doc missing | `not-found: Target village not found for site matching.` |

* **Frontend Usage:**
```javascript
const result = await httpsCallable(functions, 'getSiteMatches')({ villageId: 'salmora_riverfront' });
```

---

### 4. `updateWeights`

* **Type:** Firebase Callable (`onCall`)
* **When It Runs / Caller:** Triggered when an analyst adjusts risk weight sliders and clicks "Save & Recalculate" inside `WeightsModal.jsx`.
* **Request Shape:**
```json
{
  "priority": {
    "hazard": 0.40,
    "exposure": 0.20,
    "vulnerability": 0.20,
    "history": 0.20
  },
  "site_ranking": {
    "safety": 0.35,
    "capacity": 0.25,
    "infrastructure": 0.15,
    "accessibility": 0.10,
    "water": 0.10,
    "distance": 0.05
  }
}
```

* **Response Shape:**
```json
{
  "message": "Weights updated and villages recomputed successfully.",
  "new_weights": {
    "priority": { "hazard": 0.40, "exposure": 0.20, "vulnerability": 0.20, "history": 0.20 },
    "site_ranking": { "safety": 0.35, "capacity": 0.25, "infrastructure": 0.15, "accessibility": 0.10, "water": 0.10, "distance": 0.05 }
  },
  "villages_recomputed": 10
}
```
*(Side Effect: Updates `config/weights` and triggers batch re-computation of `priority_score`, `priority_category`, and `top_factors` for all villages in Firestore).*

* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| Priority weights do not sum to 1.0 ($\pm 0.01$) | `invalid-argument: Priority weights must sum to 1.0 (current sum: 1.15).` |
| Site weights do not sum to 1.0 ($\pm 0.01$) | `invalid-argument: Site ranking weights must sum to 1.0 (current sum: 0.90).` |

* **Frontend Usage:**
```javascript
const result = await httpsCallable(functions, 'updateWeights')({ priority: newPriorityWeights, site_ranking: newSiteWeights });
```

---

### 5. `recomputePriority`

* **Type:** Firestore Event Trigger (`onDocumentWritten`)
* **When It Runs / Caller:** Automatically executed by Cloud Functions infrastructure whenever any document in `villages/{villageId}` is created or modified.
* **Request / Event Payload:** `DocumentSnapshot` change object provided by Firebase Admin SDK.
* **Execution Logic & Guard:**
  * Checks if modifications are restricted to computed fields (`priority_score`, `priority_category`, `top_factors`, `updated_at`).
  * If only computed fields changed, execution **terminates immediately** to prevent infinite event loops.
  * Otherwise, fetches `config/weights`, runs `computePriorityScore()` and `computeTopFactors()`, and writes back computed values.
* **Output:** Internal Firestore document update.
* **Error Cases:** Logged directly to Firebase Console / Cloud Logging if `config/weights` is missing.
* **Frontend Usage:** N/A (Event-driven background trigger).

---

### 6. `healthCheck`

* **Type:** HTTP Request (`onRequest` — `GET`)
* **When It Runs / Caller:** Incurred by automated monitoring, uptime checks, or diagnostic CLI scripts.
* **Request Shape:** `GET /healthCheck`
* **Response Shape:**
```json
{
  "status": "ok",
  "region": "asia-south1",
  "timestamp": "2026-08-31T00:00:00.000Z"
}
```
* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| Non-GET HTTP method used | `405 Method Not Allowed` |

* **Frontend Usage:**
```javascript
fetch('http://127.0.0.1:5001/sih2026-4b480/asia-south1/healthCheck');
```

---

### 7. `seedDatabase`

* **Type:** HTTP Request (`onRequest` — `POST`)
* **When It Runs / Caller:** Executed during local setup or staging preparation via `npm run seed`.
* **Request Shape:** `POST /seedDatabase` (Headers: `Authorization: Bearer <OPTIONAL_TOKEN>`)

> **⚠️ Warning:** The `seedDatabase` endpoint wipes existing Firestore collections and repopulates them with demo data. It is strictly guarded by the `ENVIRONMENT` environment variable (`"demo"` or `"dev"`). **Do NOT call this endpoint during live judging or in production.**

* **Response Shape:**
```json
{
  "message": "Database seeded successfully.",
  "villages_created": 10,
  "sites_created": 4,
  "environment": "demo"
}
```
* **Error Cases:**

| Condition | Error String |
| :--- | :--- |
| `ENVIRONMENT` is set to `"production"` | `403 Forbidden: Database seeding is disabled in production environment.` |
| Invalid Bearer token (when token configured) | `401 Unauthorized: Invalid seed token.` |

* **Frontend Usage:** Invoked via setup scripts (`npm run seed`), not called from React UI.

---

## Common SDK & Integration Patterns

### SDK Initialization (`src/firebase.js`)
`src/firebase.js` initializes the Firebase Web SDK v11 using environment variables and exports convenience wrappers for `httpsCallable`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, 'asia-south1');
export const getVillagesCallable = httpsCallable(functions, 'getVillages');
```

### Live-First Service Wrapper (`src/services/api.js`)
To guarantee 100% dashboard availability during hackathon demonstrations, `ApiService` wraps all backend calls in a live-first try-catch pattern. If the live Firebase endpoint fails or is offline, it falls back seamlessly to `src/data/mockChamoliData.js` and tags the response object with `source`:

```javascript
export const ApiService = {
  async getVillages(district, priorityCategory) {
    try {
      const response = await getVillagesCallable({ district, priority_category: priorityCategory });
      return { source: 'live_firebase', ...response.data };
    } catch (err) {
      console.warn('Live Firebase unavailable. Falling back to local dataset.', err);
      return { source: 'local_dataset', villages: MOCK_VILLAGES, count: MOCK_VILLAGES.length };
    }
  }
};
```

---

## Local Firebase Emulator Base URLs

| Service | Protocol / Port | Local Endpoint / URL |
| :--- | :--- | :--- |
| **Emulator Suite UI** | HTTP `:4000` | `http://127.0.0.1:4000` |
| **Cloud Functions v2** | HTTP `:5001` | `http://127.0.0.1:5001/sih2026-4b480/asia-south1` |
| **Cloud Firestore** | gRPC / HTTP `:8080` | `127.0.0.1:8080` |
| **Vite Dev Frontend** | HTTP `:3000` | `http://localhost:3000` |
