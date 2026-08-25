/**
 * Site Ranking — Pure, unit-testable suitability scoring functions.
 * No Firestore imports. Takes plain objects in, returns plain objects out.
 */

/**
 * Tiered lookup helpers for ordinal string fields.
 */
const ROAD_ACCESS_SCORE = { good: 100, moderate: 60, poor: 25 };
const WATER_AVAILABILITY_SCORE = { high: 100, good: 75, moderate: 50, low: 25 };

function roadAccessScore(value) {
  return ROAD_ACCESS_SCORE[value] ?? 40;
}

function waterAvailabilityScore(value) {
  return WATER_AVAILABILITY_SCORE[value] ?? 40;
}

/**
 * Computes the capacity score of a relocation site relative to a village's population.
 * Returns 100 when the site can comfortably hold the village (≥2× population),
 * scales linearly down to 0 when capacity equals population, and 0 below that.
 *
 * @param {number} estimated_capacity
 * @param {number} village_population
 * @returns {number} 0–100
 */
function computeCapacityScore(estimated_capacity, village_population) {
  if (!village_population || village_population <= 0) return 100;
  const ratio = estimated_capacity / village_population;
  // Score 100 when ratio >= 2, linear from 0 (ratio=1) to 100 (ratio=2), 0 below ratio=1
  if (ratio >= 2) return 100;
  if (ratio <= 1) return 0;
  return Math.round((ratio - 1) * 100);
}

/**
 * Computes the infrastructure score from water, healthcare, and schools availability.
 * Each boolean contributes 1/3 of the total.
 *
 * @param {boolean} water_availability  - treated as boolean presence flag
 * @param {boolean} healthcare_available
 * @param {boolean} schools_available
 * @returns {number} 0–100
 */
function computeInfraScore(water_availability, healthcare_available, schools_available) {
  const water = water_availability && water_availability !== "none" ? 1 : 0;
  const health = healthcare_available ? 1 : 0;
  const school = schools_available ? 1 : 0;
  return Math.round(((water + health + school) / 3) * 100);
}

/**
 * Computes a suitability score for a relocation site relative to a source village.
 *
 * Criteria and weights (from config/weights.site_ranking):
 *   safety         = 100 - hazard_risk_score              (weight: w.safety)
 *   capacity       = scaled 0–100 vs village.population   (weight: w.capacity)
 *   infrastructure = avg of water/healthcare/schools bools (weight: w.infrastructure)
 *   accessibility  = road_access tier score               (weight: w.accessibility)
 *   water          = water_availability tier score        (weight: w.water)
 *   distance       = max(0, 100 - distance_km * 5)        (weight: w.distance)
 *
 * @param {Object} site - Relocation site plain object:
 *   { hazard_risk_score, estimated_capacity, water_availability,
 *     road_access, healthcare_available, schools_available }
 * @param {Object} village - Source village plain object: { population }
 * @param {number} distance_km - Straight-line distance in km between village and site
 * @param {Object} weights - site_ranking weights:
 *   { safety, capacity, infrastructure, accessibility, water, distance }
 * @returns {{ suitability_score: number, criteria_breakdown: Object }}
 */
function computeSuitability(site, village, distance_km, weights) {
  const {
    hazard_risk_score = 0,
    estimated_capacity = 0,
    water_availability = "low",
    road_access = "poor",
    healthcare_available = false,
    schools_available = false,
  } = site;

  const { population = 0 } = village;

  const {
    safety:        w_safety        = 0.40,
    capacity:      w_capacity      = 0.20,
    infrastructure: w_infra        = 0.15,
    accessibility: w_accessibility = 0.10,
    water:         w_water         = 0.10,
    distance:      w_distance      = 0.05,
  } = weights;

  // Individual criteria scores (0–100) rounded to 1 decimal place
  const safety         = Math.round(Math.min(100, Math.max(0, 100 - hazard_risk_score)) * 10) / 10;
  const capacity       = Math.round(computeCapacityScore(estimated_capacity, population) * 10) / 10;
  const infrastructure = Math.round(computeInfraScore(water_availability, healthcare_available, schools_available) * 10) / 10;
  const accessibility  = Math.round(roadAccessScore(road_access) * 10) / 10;
  const water          = Math.round(waterAvailabilityScore(water_availability) * 10) / 10;
  const distance       = Math.round(Math.max(0, 100 - distance_km * 5) * 10) / 10;

  const criteria_breakdown = {
    safety:         { score: safety,         weight: w_safety,        weighted: Math.round(safety        * w_safety        * 100) / 100 },
    capacity:       { score: capacity,        weight: w_capacity,      weighted: Math.round(capacity       * w_capacity      * 100) / 100 },
    infrastructure: { score: infrastructure,  weight: w_infra,         weighted: Math.round(infrastructure * w_infra         * 100) / 100 },
    accessibility:  { score: accessibility,   weight: w_accessibility, weighted: Math.round(accessibility  * w_accessibility * 100) / 100 },
    water:          { score: water,           weight: w_water,         weighted: Math.round(water          * w_water         * 100) / 100 },
    distance:       { score: distance,        weight: w_distance,      weighted: Math.round(distance       * w_distance      * 100) / 100 },
  };

  const suitability_score = Math.round(
    Object.values(criteria_breakdown).reduce((sum, c) => sum + c.weighted, 0) * 100
  ) / 100;

  return { suitability_score, criteria_breakdown };
}

module.exports = {
  computeSuitability,
  computeCapacityScore,
  computeInfraScore,
  roadAccessScore,
  waterAvailabilityScore,
};
