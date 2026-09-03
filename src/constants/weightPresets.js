// Preset scoring-weight profiles for fast "what does the policy value?" demos.
// Each set of weights sums to exactly 1.0 so no normalization drift on apply.

/**
 * Village prioritization presets — these drive the Priority Ranking Matrix,
 * so switching between them produces visible swings in the village list.
 */
export const PRIORITY_WEIGHT_PRESETS = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Default multi-factor blend",
    weights: { hazard: 0.35, exposure: 0.25, vulnerability: 0.20, history: 0.20 },
  },
  {
    id: "hazard",
    label: "Hazard-first",
    description: "Present-day flood / erosion risk dominates",
    weights: { hazard: 0.70, exposure: 0.10, vulnerability: 0.10, history: 0.10 },
  },
  {
    id: "history",
    label: "History-driven",
    description: "Past breach & disaster record dominates",
    weights: { hazard: 0.10, exposure: 0.10, vulnerability: 0.10, history: 0.70 },
  },
  {
    id: "people",
    label: "People-first",
    description: "Population exposure & social vulnerability",
    weights: { hazard: 0.10, exposure: 0.45, vulnerability: 0.35, history: 0.10 },
  },
];

/**
 * Resettlement-site ranking presets — these re-order the Safe Havens list for
 * the selected village.
 */
export const SITE_WEIGHT_PRESETS = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Default site-ranking blend",
    weights: {
      safety: 0.35, capacity: 0.20, infrastructure: 0.15,
      accessibility: 0.10, water: 0.10, distance: 0.10,
    },
  },
  {
    id: "safety",
    label: "Safety-first",
    description: "Lowest-hazard havens win",
    weights: {
      safety: 0.55, capacity: 0.15, infrastructure: 0.10,
      accessibility: 0.08, water: 0.07, distance: 0.05,
    },
  },
  {
    id: "proximity",
    label: "Proximity-first",
    description: "Keep people close to home",
    weights: {
      safety: 0.20, capacity: 0.15, infrastructure: 0.10,
      accessibility: 0.15, water: 0.10, distance: 0.30,
    },
  },
  {
    id: "capacity",
    label: "Capacity-first",
    description: "Room to absorb the whole village",
    weights: {
      safety: 0.20, capacity: 0.45, infrastructure: 0.15,
      accessibility: 0.08, water: 0.07, distance: 0.05,
    },
  },
];

/**
 * Return the id of the preset whose weights match `weights` (within a small
 * tolerance), or null when the current mix is custom.
 * @param {Array} presets
 * @param {Object} weights
 * @returns {string|null}
 */
export function matchPresetId(presets, weights) {
  if (!weights) return null;
  const match = presets.find((preset) =>
    Object.entries(preset.weights).every(
      ([key, value]) => Math.abs((Number(weights[key]) || 0) - value) < 0.005
    )
  );
  return match ? match.id : null;
}
