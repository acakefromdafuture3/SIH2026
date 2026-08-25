// Mock & Seeded data for Majuli District, Assam (SIH2026)

export const DEFAULT_WEIGHTS = {
  priority: {
    hazard: 0.35,
    exposure: 0.25,
    vulnerability: 0.20,
    history: 0.20
  },
  site_ranking: {
    safety: 0.35,
    capacity: 0.20,
    infrastructure: 0.15,
    accessibility: 0.10,
    water: 0.10,
    distance: 0.10
  }
};

export const MOCK_RELOCATION_SITES = [
  {
    id: "mock-site-majuli-01",
    name: "Jengraimukh Safe Highland Resettlement Campus",
    district: "Majuli",
    state: "Assam",
    lat: 27.1200,
    lng: 94.4100,
    capacity: 3800,
    current_occupancy: 420,
    safety_score: 88,
    water_source: "Deep Tube Wells & Central Treatment Plant",
    road_connectivity: "Paved District Arterial Highway",
    hospital_distance_km: 1.8,
    school_distance_km: 0.8,
    hazard_risk_level: "Very Low",
    terrain_type: "Elevated High-Plinth Embankment (>3m above flood datum)",
    elevation_m: 94
  },
  {
    id: "mock-site-majuli-02",
    name: "Rawanapar Elevated Relief Campus",
    district: "Majuli",
    state: "Assam",
    lat: 26.9680,
    lng: 94.2250,
    capacity: 4000,
    current_occupancy: 380,
    safety_score: 86,
    water_source: "Protected Groundwater Reservoir",
    road_connectivity: "All-weather Concrete Connector",
    hospital_distance_km: 2.5,
    school_distance_km: 1.0,
    hazard_risk_level: "Very Low",
    terrain_type: "Natural Stable Island Ridge",
    elevation_m: 91
  },
  {
    id: "mock-site-majuli-03",
    name: "Kamalabari Safe Corridor Terminal",
    district: "Majuli",
    state: "Assam",
    lat: 26.8850,
    lng: 94.1350,
    capacity: 3600,
    current_occupancy: 480,
    safety_score: 86,
    water_source: "Sub-surface Aquifer & Purifier Tanks",
    road_connectivity: "Major Ghat Approach Corridor",
    hospital_distance_km: 3.2,
    school_distance_km: 1.2,
    hazard_risk_level: "Very Low",
    terrain_type: "Reinforced Spur Terrace",
    elevation_m: 90
  },
  {
    id: "mock-site-majuli-04",
    name: "Dakhinpat Highland Resettlement Center",
    district: "Majuli",
    state: "Assam",
    lat: 26.8750,
    lng: 94.2550,
    capacity: 3800,
    current_occupancy: 350,
    safety_score: 88,
    water_source: "Multi-stage Filtration Storage Tanks",
    road_connectivity: "Satra Paved Bypass Link",
    hospital_distance_km: 2.1,
    school_distance_km: 0.9,
    hazard_risk_level: "Very Low",
    terrain_type: "High-Plinth Satra Plateau",
    elevation_m: 92
  }
];

export const MOCK_VILLAGES = [
  {
    id: "mock-village-majuli-01",
    name: "Mock Salmora Riverfront",
    district: "Majuli",
    state: "Assam",
    lat: 26.8720,
    lng: 94.3120,
    population: 2350,
    elderly_pct: 22.0,
    road_access: "poor",
    hazard_score: 93,
    hazard_factors: {
      slope: 82,
      rainfall: 95,
      landslide_history: 96,
      elevation: 90
    },
    exposure_score: 90,
    vulnerability_score: 92,
    history_score: 95,
    priority_score: 92.45,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 96 },
      { factor: "rainfall", contribution: 95 },
      { factor: "elevation", contribution: 90 }
    ],
    recommended_site_id: "mock-site-majuli-01"
  },
  {
    id: "mock-village-majuli-02",
    name: "Mock Kamalabari Lowland",
    district: "Majuli",
    state: "Assam",
    lat: 26.9150,
    lng: 94.1680,
    population: 1950,
    elderly_pct: 19.5,
    road_access: "poor",
    hazard_score: 88,
    hazard_factors: {
      slope: 80,
      rainfall: 91,
      landslide_history: 92,
      elevation: 86
    },
    exposure_score: 85,
    vulnerability_score: 87,
    history_score: 89,
    priority_score: 87.25,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 92 },
      { factor: "rainfall", contribution: 91 },
      { factor: "elevation", contribution: 86 }
    ],
    recommended_site_id: "mock-site-majuli-03"
  },
  {
    id: "mock-village-majuli-03",
    name: "Mock Garmur Wetland Border",
    district: "Majuli",
    state: "Assam",
    lat: 27.0120,
    lng: 94.2380,
    population: 1600,
    elderly_pct: 16.0,
    road_access: "moderate",
    hazard_score: 72,
    hazard_factors: {
      slope: 72,
      rainfall: 74,
      landslide_history: 76,
      elevation: 70
    },
    exposure_score: 69,
    vulnerability_score: 73,
    history_score: 71,
    priority_score: 71.25,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 76 },
      { factor: "rainfall", contribution: 74 },
      { factor: "vulnerability", contribution: 73 }
    ],
    recommended_site_id: "mock-site-majuli-01"
  },
  {
    id: "mock-village-majuli-04",
    name: "Mock Bongaon Embankment Flank",
    district: "Majuli",
    state: "Assam",
    lat: 26.9850,
    lng: 94.3450,
    population: 2150,
    elderly_pct: 15.0,
    road_access: "moderate",
    hazard_score: 67,
    hazard_factors: {
      slope: 68,
      rainfall: 67,
      landslide_history: 70,
      elevation: 64
    },
    exposure_score: 72,
    vulnerability_score: 66,
    history_score: 64,
    priority_score: 67.45,
    priority_category: "Short-term",
    top_factors: [
      { factor: "exposure", contribution: 72 },
      { factor: "landslide_history", contribution: 70 },
      { factor: "slope", contribution: 68 }
    ],
    recommended_site_id: "mock-site-majuli-02"
  },
  {
    id: "mock-village-majuli-05",
    name: "Mock Jengraimukh Basin",
    district: "Majuli",
    state: "Assam",
    lat: 27.0850,
    lng: 94.3720,
    population: 1100,
    elderly_pct: 11.5,
    road_access: "moderate",
    hazard_score: 49,
    hazard_factors: {
      slope: 50,
      rainfall: 48,
      landslide_history: 47,
      elevation: 49
    },
    exposure_score: 51,
    vulnerability_score: 47,
    history_score: 45,
    priority_score: 48.3,
    priority_category: "Medium-term",
    top_factors: [
      { factor: "exposure", contribution: 51 },
      { factor: "slope", contribution: 50 },
      { factor: "elevation", contribution: 49 }
    ],
    recommended_site_id: "mock-site-majuli-01"
  },
  {
    id: "mock-village-majuli-06",
    name: "Mock Rawanapar Terrace",
    district: "Majuli",
    state: "Assam",
    lat: 26.9640,
    lng: 94.2210,
    population: 1500,
    elderly_pct: 10.5,
    road_access: "good",
    hazard_score: 41,
    hazard_factors: {
      slope: 42,
      rainfall: 41,
      landslide_history: 40,
      elevation: 43
    },
    exposure_score: 44,
    vulnerability_score: 39,
    history_score: 41,
    priority_score: 41.35,
    priority_category: "Medium-term",
    top_factors: [
      { factor: "exposure", contribution: 44 },
      { factor: "elevation", contribution: 43 },
      { factor: "slope", contribution: 42 }
    ],
    recommended_site_id: "mock-site-majuli-02"
  },
  {
    id: "mock-village-majuli-07",
    name: "Mock Ahotguri Inland Plain",
    district: "Majuli",
    state: "Assam",
    lat: 26.9320,
    lng: 94.0750,
    population: 890,
    elderly_pct: 8.0,
    road_access: "good",
    hazard_score: 24,
    hazard_factors: {
      slope: 25,
      rainfall: 27,
      landslide_history: 22,
      elevation: 28
    },
    exposure_score: 25,
    vulnerability_score: 23,
    history_score: 21,
    priority_score: 23.45,
    priority_category: "Monitor",
    top_factors: [
      { factor: "elevation", contribution: 28 },
      { factor: "rainfall", contribution: 27 },
      { factor: "slope", contribution: 25 }
    ],
    recommended_site_id: "mock-site-majuli-03"
  },
  {
    id: "mock-village-majuli-08",
    name: "Mock Dakhinpat Ridge",
    district: "Majuli",
    state: "Assam",
    lat: 26.8910,
    lng: 94.2620,
    population: 620,
    elderly_pct: 6.5,
    road_access: "good",
    hazard_score: 17,
    hazard_factors: {
      slope: 16,
      rainfall: 19,
      landslide_history: 17,
      elevation: 18
    },
    exposure_score: 19,
    vulnerability_score: 16,
    history_score: 14,
    priority_score: 16.7,
    priority_category: "Monitor",
    top_factors: [
      { factor: "rainfall", contribution: 19 },
      { factor: "exposure", contribution: 19 },
      { factor: "elevation", contribution: 18 }
    ],
    recommended_site_id: "mock-site-majuli-02"
  }
];

export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export function getMockMatchesForVillage(villageId, siteWeights = DEFAULT_WEIGHTS.site_ranking) {
  const village = MOCK_VILLAGES.find((v) => v.id === villageId) || MOCK_VILLAGES[0];

  return {
    village_id: village.id,
    matches: MOCK_RELOCATION_SITES.map((site) => {
      const distance_km = calculateDistanceKm(village.lat, village.lng, site.lat, site.lng);
      const safetyScore = site.safety_score;
      const capacityScore = Math.min(100, Math.round((site.capacity / Math.max(village.population, 1000)) * 50));
      const infrastructureScore = 100;
      const accessibilityScore = 100;
      const waterScore = 100;
      const distanceScore = Math.max(0, Math.round(100 - (distance_km * 2.5)));

      const criteriaBreakdown = {
        safety: {
          score: safetyScore,
          weight: siteWeights.safety,
          weighted: parseFloat((safetyScore * siteWeights.safety).toFixed(1))
        },
        capacity: {
          score: capacityScore,
          weight: siteWeights.capacity,
          weighted: parseFloat((capacityScore * siteWeights.capacity).toFixed(1))
        },
        infrastructure: {
          score: infrastructureScore,
          weight: siteWeights.infrastructure,
          weighted: parseFloat((infrastructureScore * siteWeights.infrastructure).toFixed(1))
        },
        accessibility: {
          score: accessibilityScore,
          weight: siteWeights.accessibility,
          weighted: parseFloat((accessibilityScore * siteWeights.accessibility).toFixed(1))
        },
        water: {
          score: waterScore,
          weight: siteWeights.water,
          weighted: parseFloat((waterScore * siteWeights.water).toFixed(1))
        },
        distance: {
          score: distanceScore,
          weight: siteWeights.distance,
          weighted: parseFloat((distanceScore * siteWeights.distance).toFixed(1))
        }
      };

      const suitability_score = parseFloat(
        Object.values(criteriaBreakdown)
          .reduce((acc, curr) => acc + curr.weighted, 0)
          .toFixed(1)
      );

      return {
        site_id: site.id,
        site_name: site.name,
        site_details: site,
        distance_km,
        suitability_score,
        criteria_breakdown: criteriaBreakdown
      };
    }).sort((a, b) => b.suitability_score - a.suitability_score)
  };
}
