# ResQ — Data Architecture & Schema Specification

This document details the data sources, database schemas, seed configurations, and Machine Learning integration boundaries for the ResQ decision-support prototype.

---

## 1. Primary Data Sources

| Data Type | Primary Source | Access Method | Description & Technical Notes |
| :--- | :--- | :--- | :--- |
| **Demographics & Population** | Census of India (2011) | Static tabular extraction | Settlement population, house counts, and elderly percentage (`elderly_pct`). *Caveat: 2011 Census vintage used for prototype; target build integrates WorldPop raster estimates.* |
| **Terrain & Elevation** | ISRO Bhuvan / CartoDEM | DEM Raster spatial query | Topographical slope (`slope`) and ground elevation (`elevation`) values for hazard sub-factor evaluation. |
| **Precipitation Telemetry** | India Meteorological Dept (IMD) | Grid dataset aggregation | Seasonal and extreme rainfall metrics (`rainfall`) driving flood risk. |
| **Historical Disasters** | State Disaster Management Logs | Documented event records | Historical riverbank erosion and landslide frequency scores (`landslide_history`, `history_score`). |
| **Infrastructure & Connectivity** | OpenStreetMap (OSM) / PWD | Spatial vector query | Road connectivity classifications (`road_access`) and proximity to healthcare/schools. |

---

## 2. Firestore Database Schemas

### Collection: `villages`

| Field | Data Type | Primary Source | Computed? | Field Description & Range |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Seed / System | No | Document key (e.g., `"salmora_riverfront"`). |
| `name` | `string` | Census / Survey | No | Official village or settlement name. |
| `district` | `string` | Administrative | No | District designation (e.g., `"Majuli"`). |
| `state` | `string` | Administrative | No | State designation (e.g., `"Assam"`). |
| `lat` | `number` | Geospatial | No | Centroid latitude coordinate. |
| `lng` | `number` | Geospatial | No | Centroid longitude coordinate. |
| `population` | `number` | Census 2011 | No | Total resident population count. |
| `elderly_pct` | `number` | Census 2011 | No | Percentage of population aged ≥ 60. |
| `road_access` | `string` | OSM / PWD | No | Access rating: `"good"`, `"moderate"`, or `"poor"`. |
| `hazard_score` | `number` | ML / Seed | No | Aggregated hazard risk score (0.0–100.0). |
| `hazard_factors` | `object` | ML / Seed | No | Map of sub-factors (`{ slope, rainfall, landslide_history, elevation }`). |
| `exposure_score` | `number` | Demographics | No | Asset and population exposure score (0.0–100.0). |
| `vulnerability_score` | `number` | Demographics | No | Socio-economic vulnerability score (0.0–100.0). |
| `history_score` | `number` | Historical logs | No | Frequency score of prior disaster occurrences (0.0–100.0). |
| `priority_score` | `number` | **Engine** | **Yes** | Computed urgency score (0.0–100.0). Set by `recomputePriority`. |
| `priority_category` | `string` | **Engine** | **Yes** | Tier: `"Immediate"`, `"Short-term"`, `"Medium-term"`, or `"Monitor"`. |
| `top_factors` | `array` | **Engine** | **Yes** | Array of top 3 drivers: `[{ factor, contribution }]`. |
| `recommended_site_id` | `string` | MCDA Engine | No | Foreign key reference to `relocation_sites`. |
| `updated_at` | `timestamp` | **Engine** | **Yes** | ISO timestamp set on every score recalculation. |

---

### Collection: `relocation_sites`

| Field | Data Type | Primary Source | Computed? | Field Description & Range |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Seed / System | No | Document key (e.g., `"jengraimukh_highland"`). |
| `name` | `string` | Field Survey | No | Safe campus or highland site name. |
| `lat` | `number` | Geospatial | No | Campus latitude coordinate. |
| `lng` | `number` | Geospatial | No | Campus longitude coordinate. |
| `hazard_risk_score` | `number` | Environmental | No | Natural hazard risk score (0.0–100.0; lower is safer). |
| `estimated_capacity` | `number` | Civil Survey | No | Maximum population capacity for long-term shelter. |
| `water_availability` | `string` | Survey | No | Water supply tier: `"high"`, `"good"`, `"moderate"`, `"low"`. |
| `road_access` | `string` | OSM / PWD | No | Connectivity tier: `"good"`, `"moderate"`, `"poor"`. |
| `healthcare_available`| `boolean` | Medical Registry| No | `true` if primary health center is present. |
| `schools_available` | `boolean` | Education Dept | No | `true` if educational facilities are present. |

---

### Collection: `village_site_matches`

> **Note:** Documents in this collection are dynamically generated and batch-written by the `getSiteMatches` callable function as a computational side effect.

| Field | Data Type | Primary Source | Computed? | Field Description & Range |
| :--- | :--- | :--- | :--- | :--- |
| `village_id` | `string` | System | **Yes** | Foreign key referencing target `villages` document. |
| `site_id` | `string` | System | **Yes** | Foreign key referencing candidate `relocation_sites` document. |
| `distance_km` | `number` | Haversine Formula| **Yes** | Straight-line distance in kilometers between centroids. |
| `suitability_score` | `number` | MCDA Engine | **Yes** | Composite relocation suitability score (0.0–100.0). |
| `criteria_breakdown` | `object` | MCDA Engine | **Yes** | Map of per-criterion breakdown objects (`{ score, weight, weighted }`). |
| `computed_at` | `timestamp` | System | **Yes** | Execution timestamp. |

---

## 3. Singleton Configuration Schema (`config/weights`)

The singleton document `config/weights` stores global weight distributions for decision algorithms.

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

* **`priority` Group:** Dictates settlement urgency ranking. Sum of components must equal 1.0 ± 0.01.
* **`site_ranking` Group:** Dictates MCDA candidate site suitability evaluation. Sum of components must equal 1.0 ± 0.01.

---

## 4. Demo Seed Dataset Overview

The project includes a curated seed dataset for **Majuli Island, Assam** (`functions/seed/seedData.js`), featuring 10 villages distributed across all 4 priority tiers and 4 highland safe havens.

### Key Demo Settlements

1. **Hero Walkthrough Village — Salmora Riverfront (`salmora_riverfront`):**
   * **Priority Category:** `Immediate` (Priority Score: ≈ 92.45)
   * **Primary Risk Drivers:** Severe riverbank erosion history (`landslide_history`: 95) and critical inundation exposure (`exposure_score`: 90).
   * **Recommended Relocation Campus:** Jengraimukh Safe Highland Campus (`jengraimukh_highland`).
2. **Contrast Monitoring Village — Jengraimukh Basin (`jengraimukh_basin`):**
   * **Priority Category:** `Monitor` (Priority Score: ≈ 28.50)
   * **Characteristics:** Stable highland terrain, low historical erosion risk, low vulnerability.

> **Offline Dataset Note:** `src/data/mockChamoliData.js` contains a bundled client-side replica of this dataset, ensuring full dashboard functionality even when offline or disconnected from Firebase.

---

## 5. Standardized CSV Ingestion Schema

Below is the standard CSV format used for batch importing village records:

```csv
id,name,district,state,lat,lng,population,elderly_pct,road_access,hazard_score,slope,rainfall,landslide_history,elevation,exposure_score,vulnerability_score,history_score
salmora_riverfront,Salmora Riverfront,Majuli,Assam,26.92,94.18,2350,18.5,poor,93.0,45,88,95,20,90.0,95.0,90.0
phulani_highland,Phulani Safe Zone,Majuli,Assam,27.02,94.22,850,8.2,good,20.0,10,25,10,85,25.0,20.0,15.0
```

### Verified Scoring Sample Calculation

For **Salmora Riverfront**:
* `hazard = 93.0 × 0.35 = 32.55`
* `exposure = 90.0 × 0.25 = 22.50`
* `vulnerability = 95.0 × 0.20 = 19.00`
* `history = 90.0 × 0.20 = 18.00`
* **Total Calculated Priority Score:** `32.55 + 22.50 + 19.00 + 18.00 = 92.05` (≥ 71.0 → **Immediate** Category).

For **Phulani Safe Zone**:
* `hazard = 20.0 × 0.35 = 7.00`
* `exposure = 25.0 × 0.25 = 6.25`
* `vulnerability = 20.0 × 0.20 = 4.00`
* `history = 15.0 × 0.20 = 3.00`
* **Total Calculated Priority Score:** `7.00 + 6.25 + 4.00 + 3.00 = 20.25` (&lt; 31.0 → **Monitor** Category).

---

## 6. Machine Learning Schema Boundary

The fields `hazard_score` and `hazard_factors` serve as the explicit, stable interface boundary between spatial ML pipelines and the ResQ platform:

```
+--------------------------+
|  Spatial ML Pipeline     |
|  (XGBoost + SHAP Model)  |
+------------+-------------+
             |
             | Writes prediction outputs into:
             v
+-------------------------------------------------------------+
|  Firestore Document Fields:                                 |
|  - hazard_score (float, 0-100)                              |
|  - hazard_factors: { slope, rainfall, erosion, elevation }  |
+----------------------------+--------------------------------+
                             |
                             | Triggers: recomputePriority
                             v
+-------------------------------------------------------------+
|  ResQ Cloud Functions & Dashboard UI                        |
|  (No code changes required when ML model updates)           |
+-------------------------------------------------------------+
```

This clean abstraction allows ML engineers to retrain and update hazard models independently without modifying frontend components or API schemas.

---

## 7. Prototype Data Limitations & Production Roadmap

1. **Demographic Vintage:** Prototype uses Census 2011 data. Production roadmap replaces this with dynamic WorldPop high-resolution raster grids.
2. **Static Environmental Metrics:** Ground data is currently pre-computed. Target architecture integrates live ISRO Bhuvan satellite rasters and IMD telemetry.
3. **Geographic Coverage:** Hackathon scope is optimized for Majuli District, Assam. Target build expands to multi-state riverine and mountainous floodplains.
