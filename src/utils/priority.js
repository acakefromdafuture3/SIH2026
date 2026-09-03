/**
 * Shared, framework-free priority scoring helpers for the frontend.
 *
 * This MIRRORS the backend engine in functions/priorityEngine.js. It exists so
 * the dashboard can always display a meaningful priority_score / priority_category
 * even when the data it receives (live Firestore, a stale deploy, a half-finished
 * seed) has those fields missing or null.
 *
 * Keep the formula and thresholds here in sync with functions/priorityEngine.js.
 */

export const PRIORITY_CATEGORIES = ["Immediate", "Short-term", "Medium-term", "Monitor"];

const CATEGORY_THRESHOLDS = [
  { min: 71, label: "Immediate" },
  { min: 51, label: "Short-term" },
  { min: 31, label: "Medium-term" },
  { min: 0, label: "Monitor" },
];

/**
 * Map a numeric priority score to its category label.
 * @param {number} score
 * @returns {string}
 */
export function categorizePriority(score) {
  const value = Number(score);
  const safe = Number.isFinite(value) ? value : 0;
  const match = CATEGORY_THRESHOLDS.find(({ min }) => safe >= min);
  return match ? match.label : "Monitor";
}

/**
 * Weighted priority score + category for a village.
 * @param {Object} village - { hazard_score, exposure_score, vulnerability_score, history_score }
 * @param {Object} weights - { hazard, exposure, vulnerability, history } (fractions summing ~1)
 * @returns {{ priority_score: number, priority_category: string }}
 */
export function computePriorityScore(village = {}, weights = {}) {
  const {
    hazard_score = 0,
    exposure_score = 0,
    vulnerability_score = 0,
    history_score = 0,
  } = village || {};
  const {
    hazard = 0,
    exposure = 0,
    vulnerability = 0,
    history = 0,
  } = weights || {};

  const raw =
    (Number(hazard_score) || 0) * (Number(hazard) || 0) +
    (Number(exposure_score) || 0) * (Number(exposure) || 0) +
    (Number(vulnerability_score) || 0) * (Number(vulnerability) || 0) +
    (Number(history_score) || 0) * (Number(history) || 0);

  const priority_score = Math.round(raw * 100) / 100;
  return { priority_score, priority_category: categorizePriority(priority_score) };
}

/**
 * Top 3 contributing hazard sub-factors, sorted desc.
 * @param {Object} hazardFactors
 * @returns {Array<{ factor: string, contribution: number }>}
 */
export function computeTopFactors(hazardFactors = {}) {
  return Object.entries(hazardFactors || {})
    .map(([factor, contribution]) => ({ factor, contribution: Number(contribution) || 0 }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);
}

/**
 * True when a village already carries a usable priority_score AND priority_category.
 * @param {Object} village
 * @returns {boolean}
 */
export function hasValidPriority(village) {
  if (!village || typeof village !== "object") return false;
  return (
    Number.isFinite(village.priority_score) &&
    typeof village.priority_category === "string" &&
    PRIORITY_CATEGORIES.includes(village.priority_category)
  );
}

/**
 * Return a village guaranteed to have priority_score, priority_category and
 * top_factors. If the incoming record already has valid values they are kept
 * untouched; otherwise the missing pieces are computed from `priorityWeights`.
 *
 * @param {Object} village
 * @param {Object} priorityWeights - the `priority` sub-object of the weights config
 * @returns {Object}
 */
export function ensureVillagePriority(village, priorityWeights) {
  if (!village || typeof village !== "object") return village;

  const scoreOk = Number.isFinite(village.priority_score);
  const categoryOk =
    typeof village.priority_category === "string" &&
    PRIORITY_CATEGORIES.includes(village.priority_category);
  const factorsOk = Array.isArray(village.top_factors) && village.top_factors.length > 0;

  if (scoreOk && categoryOk && factorsOk) return village;

  const computed = computePriorityScore(village, priorityWeights);

  return {
    ...village,
    priority_score: scoreOk ? village.priority_score : computed.priority_score,
    priority_category: categoryOk ? village.priority_category : computed.priority_category,
    top_factors: factorsOk ? village.top_factors : computeTopFactors(village.hazard_factors),
    // Marker so callers/telemetry can tell a value was reconstructed client-side.
    priority_healed: !(scoreOk && categoryOk),
  };
}

/**
 * Map ensureVillagePriority over a list, dropping non-objects.
 * @param {Array} villages
 * @param {Object} priorityWeights
 * @returns {Array}
 */
export function ensureVillagesPriority(villages, priorityWeights) {
  if (!Array.isArray(villages)) return [];
  return villages
    .filter((v) => v && typeof v === "object")
    .map((v) => ensureVillagePriority(v, priorityWeights));
}

/**
 * Proportionally normalize a weights object so its values sum to 1.0.
 * Returns a shallow copy unchanged when the values sum to 0.
 * @param {Object} weights
 * @returns {Object}
 */
export function normalizeWeights(weights) {
  const entries = Object.entries(weights || {});
  const total = entries.reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
  if (!total) return { ...(weights || {}) };
  return Object.fromEntries(entries.map(([k, v]) => [k, (Number(v) || 0) / total]));
}

/**
 * Format a score for compact display: rounded integer, or an em dash when the
 * value is genuinely unknown (should be rare once healing is in place).
 * @param {*} score
 * @returns {string|number}
 */
export function formatScore(score) {
  if (score === null || score === undefined || score === "") return "—";
  const value = Number(score);
  return Number.isFinite(value) ? Math.round(value) : "—";
}
