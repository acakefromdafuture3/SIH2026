# ResQ — System Architecture & Design Specification

## Overview

ResQ is a geospatial command and algorithmic resettlement decision-support engine built for State and District Disaster Management Authorities (SDMAs and DDMAs). It addresses climate disaster relocation challenges by evaluating multi-hazard environmental risk alongside socio-economic exposure to dynamically rank high-risk settlements. Furthermore, ResQ evaluates candidate highland resettlement sites using multi-criteria decision analysis (MCDA), delivering transparent, explainable recommendations for emergency evacuation and long-term relocation planning.

## System Decision Chain

The following diagram illustrates the end-to-end decision workflow from raw geospatial data ingestion to frontline policymaker action:

```
+--------------------------+
|  Public Geodata          |
|  (Census, IMD, Bhuvan)   |
+------------+-------------+
             |
             v
+--------------------------+
|  Feature Extraction      |
|  (Hazard, Exposure, etc) |
+------------+-------------+
             |
             v
+--------------------------+
|  Scoring Engines         |
|  (priorityEngine.js,     |
|   siteRanking.js)        |
+------------+-------------+
             |
             v
+--------------------------+
|  Cloud Firestore         |
|  (villages, sites, rules)|
+------------+-------------+
             |
             v
+--------------------------+
|  Cloud Functions v2      |
|  (Callables & Triggers)  |
+------------+-------------+
             |
             v
+--------------------------+
|  ResQ GIS Dashboard      |
|  (React 18, Leaflet)     |
+------------+-------------+
             |
             v
+--------------------------+
|  DM Analyst /            |
|  Policymaker Action      |
+--------------------------+
```

## Prototype vs Target Architecture

The table below outlines the current state of implementation in the hackathon codebase versus the long-term production vision:

| Architecture Block | Implemented in Hackathon Prototype | Planned Target Production Architecture |
| :--- | :--- | :--- |
| **Data Ingestion** | Curated static seed datasets (`functions/seed/seedData.js`) & bundled offline fallback (`src/data/mockChamoliData.js`). | Automated pipeline consuming satellite rasters (ISRO Bhuvan, Sentinel-2), IMD live precipitation API, and Census APIs. |
| **ML Scoring Engine** | Deterministic weighted scoring engines (`priorityEngine.js`, `siteRanking.js`) with isolated mathematical interfaces. | XGBoost regression model trained on historical disaster impact with SHAP feature attribution feeding `hazard_score`. |
| **Cloud Orchestration** | Firebase Cloud Functions v2 (Node.js 20) in `asia-south1` with Firestore document triggers and onCall callables. | Serverless Cloud Functions microservices backed by Cloud Pub/Sub queue for asynchronous multi-district batch processing. |
| **GIS Dashboard** | React 18, Vite 6, Tailwind CSS glassmorphic UI, and Leaflet map rendering risk-graded SVG pins & match vectors. | WebGL-accelerated Deck.gl 3D terrain visualization with real-time flood simulation overlays and spatial analysis tools. |
| **Decision Makers** | SDMA/DDMA decision-support dashboard featuring live weight tuning modals and explainability dossiers. | Multi-agency role-based access control (RBAC), PDF report export engine, and field survey tablet sync integration. |

## Module Breakdown

ResQ is structured into six functional modules across the backend and frontend codebases:

### Module A: Multi-Hazard Red-Zone Mapping
* **Description:** Identifies geographic zones vulnerable to compound disasters (landslides, flash floods, riverbank erosion).
* **Inputs:** Topographical slope, historical precipitation, river proximity, and elevation.
* **Outputs:** `hazard_score` (0–100) and granular sub-factors (`hazard_factors`).
* **Implementation Files:** `functions/seed/seedData.js`, `src/components/MapView.jsx`.

### Module B: Priority Engine
* **Description:** Computes an overall priority score and category for every village based on weighted hazard, exposure, vulnerability, and history scores.
* **Inputs:** Village document metrics and global priority weights from `config/weights`.
* **Outputs:** `priority_score` (0–100), `priority_category` ("Immediate", "Short-term", "Medium-term", "Monitor"), and top 3 driving factors.
* **Implementation Files:** `functions/priorityEngine.js`, `functions/index.js` (`recomputePriority`, `updateWeights`).

### Module C: Safe Site Assessment
* **Description:** Evaluates candidate resettlement site safety and infrastructure readiness.
* **Inputs:** Site hazard risk score, estimated capacity, water availability, road access, and healthcare/school presence.
* **Outputs:** Normalized site criteria metrics.
* **Implementation Files:** `functions/siteRanking.js`, `functions/seed/seedData.js`.

### Module D: Multi-Criteria Decision Analysis (MCDA) Site Ranking
* **Description:** Ranks candidate relocation sites for a target village by applying MCDA criteria including proximity distance.
* **Inputs:** Target village coordinates/population, candidate site documents, and `site_ranking` weights.
* **Outputs:** Array of `SiteMatch` objects containing `suitability_score` and per-criterion `criteria_breakdown`.
* **Implementation Files:** `functions/siteRanking.js`, `functions/index.js` (`getSiteMatches`).

### Module E: GIS Dashboard
* **Description:** Interactive map-centric user interface displaying settlements, risk pin markers, evacuation vectors, and diagnostic tabs.
* **Inputs:** `ApiService` responses (`getVillages`, `getSiteMatches`).
* **Outputs:** Interactive map view, filtered village priority matrix, and site matching overlays.
* **Implementation Files:** `src/App.jsx`, `src/components/MapView.jsx`, `src/components/MapPins.jsx`, `src/components/VillageList.jsx`.

### Module F: Explainability Panel & Weight Calibration
* **Description:** Transparent decision-support dossier surfacing top risk drivers and permitting real-time weight adjustment.
* **Inputs:** `top_factors`, `criteria_breakdown`, and live slider state.
* **Outputs:** Detailed factor cards, suitability breakdown bars, and updated global weight configuration.
* **Implementation Files:** `src/components/VillageDetail.jsx`, `src/components/VillageDrawer.jsx`, `src/components/SiteMatchList.jsx`, `src/components/WeightsModal.jsx`.

## Data Flow Diagram

```
+-------------------------------------------------------------------------+
|                        functions/seed/seedData.js                       |
+------------------------------------+------------------------------------+
                                     |
                                     v (seedDatabase)
+-------------------------------------------------------------------------+
|                              Cloud Firestore                            |
|    - villages/{villageId}                                               |
|    - relocation_sites/{siteId}                                          |
|    - village_site_matches/{matchId}                                     |
|    - config/weights                                                     |
+------------------------------------+------------------------------------+
                                     |
                                     v (onCall / triggers)
+-------------------------------------------------------------------------+
|                        Firebase Cloud Functions v2                      |
|      (getVillages, getVillageDetail, getSiteMatches, updateWeights)     |
+------------------------------------+------------------------------------+
                                     |
                                     v (httpsCallable)
+-------------------------------------------------------------------------+
|                          src/services/api.js                            |
|             (Live-First SDK call with automatic fallback to             |
|                    src/data/mockChamoliData.js)                         |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                             React Components                            |
|     (App.jsx -> MapView.jsx, VillageList.jsx, VillageDrawer.jsx)        |
+-------------------------------------------------------------------------+
```

## Firestore Schema

### Collection: `villages/{villageId}`
```json
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
  "recommended_site_id": "jengraimukh_highland",
  "updated_at": "2026-08-31T00:00:00.000Z"
}
```
* **Field Descriptions:**
  * `id` *(string)*: Unique document identifier.
  * `name`, `district`, `state` *(string)*: Geographical naming.
  * `lat`, `lng` *(number)*: Centroid latitude and longitude.
  * `population` *(number)*: Total settlement population count.
  * `elderly_pct` *(number)*: Percentage of vulnerable elderly residents.
  * `road_access` *(string)*: Connectivity rating (`"good"`, `"moderate"`, `"poor"`).
  * `hazard_score` *(number)*: Aggregated multi-hazard score (0–100).
  * `hazard_factors` *(object)*: Sub-hazard parameters.
  * `exposure_score`, `vulnerability_score`, `history_score` *(number)*: Core scoring dimensions (0–100).
  * `priority_score` *(number, computed)*: Overall calculated urgency score (0–100).
  * `priority_category` *(string, computed)*: Categorical tier ("Immediate", "Short-term", "Medium-term", "Monitor").
  * `top_factors` *(array, computed)*: Top 3 primary drivers driving the risk score.
  * `recommended_site_id` *(string)*: Foreign key reference to `relocation_sites`.
  * `updated_at` *(timestamp, computed)*: ISO timestamp of last score recalculation.

### Collection: `relocation_sites/{siteId}`
```json
{
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
```
* **Field Descriptions:**
  * `id` *(string)*: Unique site document identifier.
  * `name` *(string)*: Campus or site designation.
  * `lat`, `lng` *(number)*: Site centroid coordinates.
  * `hazard_risk_score` *(number)*: Environmental risk score (0–100; lower is safer).
  * `estimated_capacity` *(number)*: Maximum shelter population capacity.
  * `water_availability` *(string)*: Water supply tier (`"high"`, `"good"`, `"moderate"`, `"low"`).
  * `road_access` *(string)*: Road quality tier (`"good"`, `"moderate"`, `"poor"`).
  * `healthcare_available`, `schools_available` *(boolean)*: Essential infrastructure flags.

### Collection: `village_site_matches/{villageId_siteId}`
```json
{
  "village_id": "salmora_riverfront",
  "site_id": "jengraimukh_highland",
  "distance_km": 8.5,
  "suitability_score": 85.4,
  "criteria_breakdown": {
    "safety": { "score": 85.0, "weight": 0.40, "weighted": 34.0 },
    "capacity": { "score": 100.0, "weight": 0.20, "weighted": 20.0 },
    "infrastructure": { "score": 100.0, "weight": 0.15, "weighted": 15.0 },
    "accessibility": { "score": 100.0, "weight": 0.10, "weighted": 10.0 },
    "water": { "score": 100.0, "weight": 0.10, "weighted": 10.0 },
    "distance": { "score": 57.5, "weight": 0.05, "weighted": 2.88 }
  },
  "computed_at": "2026-08-31T00:00:00.000Z"
}
```
* **Field Descriptions:**
  * `village_id`, `site_id` *(string)*: Foreign keys linking settlement to site.
  * `distance_km` *(number)*: Straight-line Haversine distance in kilometers.
  * `suitability_score` *(number)*: Composite MCDA match score (0–100).
  * `criteria_breakdown` *(object)*: Per-criterion score, weight, and weighted contribution.
  * `computed_at` *(timestamp)*: Computation timestamp.

### Collection: `config/weights` (Singleton Document)
```json
{
  "priority": {
    "hazard": 0.35,
    "exposure": 0.25,
    "vulnerability": 0.20,
    "history": 0.20
  },
  "site_ranking": {
    "safety": 0.40,
    "capacity": 0.20,
    "infrastructure": 0.15,
    "accessibility": 0.10,
    "water": 0.10,
    "distance": 0.05
  }
}
```
* **Field Descriptions:**
  * `priority` *(object)*: Weight distribution for village urgency ranking (must sum to `1.0 ± 0.01`).
  * `site_ranking` *(object)*: Weight distribution for site suitability evaluation (must sum to `1.0 ± 0.01`).

## Scoring Engines Deep-Dive

### 1. Village Priority Engine (`functions/priorityEngine.js`)

**Formula:**

```text
priority_score = (hazard × w_h) + (exposure × w_e) + (vulnerability × w_v) + (history × w_hist)
```

Where default weights are `w_h = 0.35`, `w_e = 0.25`, `w_v = 0.20`, `w_hist = 0.20`.

**Category Thresholds (`CATEGORY_THRESHOLDS`):**

| Score Range | Category | Hex Map Marker Color | Urgency Level |
| :--- | :--- | :--- | :--- |
| ≥ 71.0 | **Immediate** | `#EF4444` (Red) | High risk of imminent displacement; immediate evacuation planning. |
| ≥ 51.0 | **Short-term** | `#F97316` (Orange) | Severe seasonal vulnerability; scheduled relocation within 1–2 years. |
| ≥ 31.0 | **Medium-term** | `#EAB308` (Yellow) | Moderate structural exposure; structural mitigation & monitoring. |
| &lt; 31.0 | **Monitor** | `#10B981` (Green) | Stable highland or resilient zone; routine telemetry monitoring. |

**Top Factors Calculation (`computeTopFactors`):**
Extracted dynamically by sorting all input factor key-value pairs (sub-hazard parameters like `landslide_history`, `rainfall`, `slope`, `elevation` alongside `exposure_score` and `vulnerability_score`) in descending order. Returns the top 3 items to populate `top_factors`.

### 2. Multi-Criteria Site Ranking Engine (`functions/siteRanking.js`)

**Formula:**

```text
suitability_score = sum over c in C of ( score(c) × weight(c) )
```

Where criteria `C = { safety, capacity, infrastructure, accessibility, water, distance }`.

**Criteria Scoring Rules:**

| Criterion | Calculation / Scoring Logic | Default Weight |
| :--- | :--- | :--- |
| `safety` | `100 − site.hazard_risk_score` | 0.40 |
| `capacity` | Linear scaling: `100` when `capacity ≥ 2 × population`; `0` when `capacity ≤ 1 × population`; linear interpolation in between. | 0.20 |
| `infrastructure` | `mean(water_present, healthcare_available, schools_available) × 100` | 0.15 |
| `accessibility` | Tiered lookup: `"good"` → 100, `"moderate"` → 60, `"poor"` → 25. | 0.10 |
| `water` | Tiered lookup: `"high"` → 100, `"good"` → 75, `"moderate"` → 50, `"low"` → 25. | 0.10 |
| `distance` | `max(0, 100 − distance_km × 5)` | 0.05 |

**`criteria_breakdown` Structure:**
Each item in `criteria_breakdown` provides auditability for decision-makers:
```json
{
  "score": 100.0,
  "weight": 0.15,
  "weighted": 15.0
}
```

**Pure Functions Rationale:**
The scoring algorithms (`computePriorityScore`, `computeTopFactors`, `computeSuitability`) are deliberately designed as pure functions devoid of database read/write side-effects or async network calls. This isolation enables deterministic unit testing, rapid batch execution in memory, and seamless replacement with ML model inference (e.g. ONNX/XGBoost) without altering system I/O interfaces.

## Key Design Decisions

| Decision | Rationale | Status |
| :--- | :--- | :--- |
| **Serverless Cloud Functions + Firestore** | Zero infrastructure maintenance overhead, automatic scaling to zero when idle, and low latency for Indian administrative users via `asia-south1` (Mumbai). | **Implemented** |
| **Pure Scoring Engines Isolated from I/O** | `priorityEngine.js` and `siteRanking.js` accept pure data objects and return calculated scores, allowing trivial unit testing and clean ML pluggability. | **Implemented** |
| **Firestore Trigger for Recompute** | `onDocumentWritten` trigger on `villages/{villageId}` automatically keeps priority scores updated whenever base hazard or vulnerability data changes. | **Implemented** |
| **Client-Side Resilient Fallback** | `ApiService` attempts live backend callables first and gracefully fails over to `mockChamoliData.js` offline dataset if offline or misconfigured. | **Implemented** |
| **Public-Read / Server-Only-Write Rules** | Allows hackathon judges and SDMA analysts to view telemetry without authentication while restricting all data mutations to validated Cloud Functions. | **Implemented** |
| **`seedDatabase` Guarded by ENVIRONMENT** | Environment check prevents unauthorized database resets in production environments or during live demonstration sessions. | **Implemented** |
| **`hazard_score` / `hazard_factors` ML Boundary** | Stable database schema interface allowing future spatial ML pipelines (e.g., Random Forest / XGBoost) to update hazard outputs without breaking API or UI contracts. | **Implemented** |

## Architectural Trade-Offs

| Choice | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Compute Paradigm** | Serverless Cloud Functions v2 | Eliminates server management, scales automatically during disaster emergencies, and reduces operational costs. |
| **Business Logic Placement** | Isolated Pure Functions | Decouples mathematical scoring logic from database drivers, enabling multi-environment reusability and offline client execution. |
| **Data Synchronization** | Event-Driven Firestore Trigger | Guarantees eventual consistency across risk scores whenever ground data changes, with strict infinite-loop guards. |
| **Client Reliability** | Dual-Tier Fallback Service | Ensures 100% dashboard uptime for live hackathon judging even under poor network conditions or cloud outage. |
| **Security Architecture** | Server-Side Callable Validation | Enforces backend weight validation (Σ w = 1.0) and prevents direct client-side database tampering. |

## Deployment Strategy

* **Cloud Provider:** Firebase Platform (Google Cloud Platform).
* **Target Region:** `asia-south1` (Mumbai, India).
* **Deployment Command:** `npx firebase deploy --only functions,firestore:rules`
* **Local Development & Simulation:** Firebase Emulator Suite managing Cloud Functions (`:5001`), Firestore (`:8080`), and Emulator UI (`:4000`).
