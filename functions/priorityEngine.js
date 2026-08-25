/**
 * Priority Engine — Pure, unit-testable scoring functions.
 * No Firestore imports. Takes plain objects in, returns plain objects out.
 */

/**
 * Priority category thresholds.
 */
const CATEGORY_THRESHOLDS = [
  { min: 71, label: "Immediate" },
  { min: 51, label: "Short-term" },
  { min: 31, label: "Medium-term" },
  { min: 0,  label: "Monitor" },
];

/**
 * Computes a weighted priority score and assigns a priority category for a village.
 *
 * Formula:
 *   score = hazard_score * w.hazard
 *         + exposure_score * w.exposure
 *         + vulnerability_score * w.vulnerability
 *         + history_score * w.history
 *
 * Category thresholds:
 *   >= 71  → Immediate
 *   >= 51  → Short-term
 *   >= 31  → Medium-term
 *   else   → Monitor
 *
 * @param {Object} village - Village plain object containing:
 *   { hazard_score, exposure_score, vulnerability_score, history_score }
 * @param {Object} weights - Weight plain object:
 *   { hazard, exposure, vulnerability, history } — must sum to ~1.0
 * @returns {{ priority_score: number, priority_category: string }}
 */
function computePriorityScore(village, weights) {
  const { hazard_score = 0, exposure_score = 0, vulnerability_score = 0, history_score = 0 } = village;
  const { hazard = 0, exposure = 0, vulnerability = 0, history: hist = 0 } = weights;

  const raw =
    hazard_score    * hazard +
    exposure_score  * exposure +
    vulnerability_score * vulnerability +
    history_score   * hist;

  const priority_score = Math.round(raw * 100) / 100;

  const match = CATEGORY_THRESHOLDS.find(({ min }) => priority_score >= min);
  const priority_category = match ? match.label : "Monitor";

  return { priority_score, priority_category };
}

/**
 * Computes the top 3 contributing hazard sub-factors for the explainability panel.
 *
 * @param {Object} hazard_factors - Plain object with sub-scores 0–100:
 *   { slope, rainfall, landslide_history, elevation }
 * @returns {Array<{ factor: string, contribution: number }>}
 *   Sorted descending by contribution, top 3 only.
 */
function computeTopFactors(hazard_factors = {}) {
  const entries = Object.entries(hazard_factors)
    .map(([factor, contribution]) => ({
      factor,
      contribution: Number(contribution) || 0,
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);

  return entries;
}

module.exports = {
  computePriorityScore,
  computeTopFactors,
  CATEGORY_THRESHOLDS,
};
