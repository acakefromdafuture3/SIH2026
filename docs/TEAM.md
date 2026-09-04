<!-- Generated for SIH 2026 ResQ prototype — verify against live codebase before final submission -->

# ResQ — Team Structure, Roles & Execution Manual

This document details the team roles, component ownership, development workflows, and hackathon demonstration checklists for the SIH 2026 ResQ project.

---

## 1. Team Overview & Component Ownership

| Role | Core Ownership | Primary Tech Stack & Tools | Key Demo Deliverable |
| :--- | :--- | :--- | :--- |
| **Team Lead / Backend Developer** | Cloud Functions, scoring logic & Firestore triggers | Firebase v2, Node 20, Express | Live batch re-computation & callables |
| **Data Lead** | Seed dataset, offline fallback & data pipeline | JSON, CSV, Census 2011, ISRO Bhuvan | 10 Majuli villages & 4 safe sites dataset |
| **ML Engineer** | Hazard scoring model interface & explainability | Python, Scikit-learn, XGBoost, SHAP | `hazard_score` & SHAP factor schema boundary |
| **GIS Dashboard Developer** | Interactive map visualizer & spatial overlays | Leaflet 1.9, React-Leaflet, Tailwind | Vector match lines & risk-graded pins |
| **UI Developer (Explainability)**| Diagnostic panels, sliders & slide-over dossiers | React 18, Tailwind CSS, Lucide Icons | Live weight tuning modal & factor bars |
| **App Tester & QA** | Test scripts, edge-case validation & smoke tests | Node test runner, Curl, Firebase CLI | Passed test suite & zero-crash guarantee |

---

## 2. Role Deep-Dives & File Ownership

### Team Lead / Backend Developer
* **Primary Repo Files:** `functions/index.js`, `functions/priorityEngine.js`, `functions/siteRanking.js`.
* Implemented pure computational scoring engines (`computePriorityScore`, `computeSuitability`) decoupled from database drivers.
* Configured Firebase Cloud Functions v2 callables (`getVillages`, `getVillageDetail`, `getSiteMatches`, `updateWeights`) in region `asia-south1`.
* Designed `recomputePriority` Firestore document trigger with infinite-loop prevention guards.
* Implemented Haversine distance matrix logic and batch update routines for live weight adjustment.

### Data Lead
* **Primary Repo Files:** `functions/seed/seedData.js`, `src/data/mockChamoliData.js`.
* Synthesized demographic and geospatial metrics from Census 2011, ISRO Bhuvan, IMD rainfall telemetry, and OpenStreetMap.
* Built the primary **Majuli District, Assam** seed dataset featuring 10 villages across 4 priority categories and 4 highland safe havens.
* Created `src/data/mockChamoliData.js` offline dataset to guarantee seamless client resilience if network connectivity drops.
* Provided standardized CSV schema templates on Day 1 to unblock frontend and backend parallel development.

### ML Engineer
* **Primary Repo Files:** `functions/priorityEngine.js` (`computeTopFactors`), `functions/seed/seedData.js`.
* Defined the stable ML integration boundary via `hazard_score` and `hazard_factors` (`{ slope, rainfall, landslide_history, elevation }`).
* Trained prototype XGBoost risk regressors and extracted SHAP feature attributions driving top-factor rankings.
* Mapped top SHAP attributions into `computeTopFactors()` output array (`[{ factor, contribution }]`).
* Ensured future spatial ML models can update hazard values without requiring changes to database schemas or UI components.

### GIS Dashboard Developer
* **Primary Repo Files:** `src/components/MapView.jsx`, `src/components/MapPins.jsx`.
* Implemented Leaflet GIS map bounded strictly to India (`INDIA_BOUNDS`) with Esri ArcGIS basemaps (Topo, Satellite, Dark Canvas).
* Created custom SVG map pin markers color-coded by priority category (`Immediate`: Red, `Short-term`: Orange, `Medium-term`: Yellow, `Monitor`: Green).
* Built interactive layer toggles for monsoon rainfall contours, erosion risk buffers, and resettlement site shield icons.
* Rendered dynamic dashed cyan vector connection lines linking target villages to top-matched relocation campuses.

### UI Developer (Explainability Panel)
* **Primary Repo Files:** `src/components/VillageDetail.jsx`, `src/components/VillageDrawer.jsx`, `src/components/SiteMatchList.jsx`, `src/components/VillageList.jsx`, `src/components/WeightsModal.jsx`.
* Designed glassmorphic dark-mode interface layout (`bg-slate-950`) optimized for command center operations.
* Built slide-over explainability dossier (`VillageDrawer.jsx`) displaying top 3 primary risk drivers for selected settlements.
* Developed `SiteMatchList.jsx` featuring per-criterion suitability progress bars (`safety`, `capacity`, `infrastructure`, `accessibility`, `water`, `distance`).
* Implemented `WeightsModal.jsx` live weight calibration modal with real-time $100\%$ sum validation.

### App Tester & QA
* **Primary Repo Files:** `functions/seed/testScoring.js`, `functions/seed/testFunctions.js`, `functions/seed/smokeTest.js`.
* Wrote unit tests in `testScoring.js` validating priority calculations and MCDA suitability score boundaries.
* Built integration tests in `testFunctions.js` verifying input validation error strings and callable response shapes.
* Executed end-to-end smoke testing (`smokeTest.js`) against live Firebase endpoints in `asia-south1`.
* Tested edge cases including malformed coordinates, missing village IDs, and network disconnection fallbacks.

---

## 3. Collaborative AI-Assisted Workflow ("Vibe Coding")

The team leveraged an AI-assisted development workflow using Antigravity and complementary models:

```
+-------------------------------------------------------------------------+
|                  Antigravity Agentic Coding Assistant                   |
|         (Sequenced multi-file prompts & workflow orchestration)         |
+------------------------------------+------------------------------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+--------------------------+                   +--------------------------+
|  Gemini 3 Flash          |                   |  Claude Sonnet 4.6       |
|  - System Documentation  |                   |  - Scoring Algorithms    |
|  - JSON Seed Datasets    |                   |  - Cloud Functions Logic |
|  - UI Component Layouts  |                   |  - Bug Trace Diagnostics |
+--------------------------+                   +--------------------------+
```

* **Antigravity CLI:** Handled prompt sequencing, local command execution, git operations, and multi-file code editing.
* **Gemini 3 Flash:** Selected for high-speed scaffolding, schema definitions, seed data creation, and comprehensive documentation generation.
* **Claude Sonnet 4.6 Thinking:** Selected for complex algorithmic reasoning, scoring formula derivation, Cloud Functions logic, and deep log traceback debugging.

---

## 4. Live Hackathon Demo Preparation Checklist

Use the following verification checklist prior to presenting the live demonstration to SIH 2026 judges:

- [ ] Majuli seed dataset fully populated (10 villages, 4 relocation sites) — `npm run seed` succeeds.
- [ ] `seedDatabase` endpoint verified to be guarded by `ENVIRONMENT` variable (`ENVIRONMENT=demo`).
- [ ] Security rules in `firestore.rules` reviewed and deployed (public read, server-only write).
- [ ] `healthCheck` endpoint returns `{"status": "ok"}` on live GCP project.
- [ ] Dashboard opens cleanly at `http://localhost:3000` rendering all 10 village map markers.
- [ ] **Salmora Riverfront** appears as the #1 Immediate priority settlement (Priority Score $\approx 92.45$).
- [ ] Clicking Salmora opens `VillageDrawer.jsx` displaying top 3 hazard drivers (Erosion History, Exposure, Vulnerability).
- [ ] `getSiteMatches` successfully recommends **Jengraimukh Safe Highland Campus** as the #1 relocation match.
- [ ] Dynamic dashed cyan vector line connects Salmora Riverfront to Jengraimukh Campus on `MapView.jsx`.
- [ ] Contrast settlement (**Jengraimukh Basin**) displays clearly as Green (`Monitor` category, score $\approx 28.50$).
- [ ] Opening `WeightsModal.jsx`, adjusting priority weights, and saving causes instant dashboard re-ranking.
- [ ] Offline resilience verified: disconnecting network gracefully triggers `local_dataset` fallback mode.
- [ ] Backup video recording captured and stored locally.
- [ ] Presentation slides finalized (Problem $\rightarrow$ Architecture $\rightarrow$ Live Demo $\rightarrow$ Technical Impact).

---

## 5. Repository Contribution & Branching Strategy

* **Branch Naming Conventions:**
  * `feature/<feature-name>` (e.g., `feature/mcda-ranking`)
  * `fix/<bug-description>` (e.g., `fix/leaflet-nan-coordinates`)
  * `data/<dataset-update>` (e.g., `data/majuli-seed-v2`)
  * `docs/<doc-update>` (e.g., `docs/architecture-spec`)
* **Pull Request (PR) Workflow:**
  1. Create topic branch off `main`.
  2. Implement changes and execute local test suite (`npm --prefix functions test`).
  3. Submit PR targeting `main`.
  4. Require at least one peer code review and passing smoke test before merging.
  5. Keep PRs small, focused, and atomic.
