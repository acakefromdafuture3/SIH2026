// Mock & Seeded data for Chamoli District, Uttarakhand (SIH2026)

export const DEFAULT_WEIGHTS = {
  priority: {
    hazard: 0.35,
    exposure: 0.25,
    vulnerability: 0.20,
    history: 0.20
  },
  site_ranking: {
    safety: 0.40,
    capacity: 0.20,
    infrastructure: 0.15,
    accessibility: 0.10,
    water: 0.10,
    distance: 0.05
  }
};

export const MOCK_RELOCATION_SITES = [
  {
    id: "mock-site-chamoli-01",
    name: "Gopeshwar Safe Plateau Resettlement Zone",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4215,
    lng: 79.3398,
    capacity: 3500,
    current_occupancy: 450,
    safety_score: 82,
    water_source: "Perennial Spring & Municipal Line",
    road_connectivity: "NH-58 Direct Link (All-weather)",
    hospital_distance_km: 3.2,
    school_distance_km: 1.5,
    hazard_risk_level: "Low",
    terrain_type: "Gentle Terrace (< 10° slope)",
    elevation_m: 1450
  },
  {
    id: "mock-site-chamoli-02",
    name: "Karnaprayag Southern Terrace Site",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.2450,
    lng: 79.2310,
    capacity: 2200,
    current_occupancy: 600,
    safety_score: 78,
    water_source: "Alaknanda River Filtration Plant",
    road_connectivity: "Paved State Highway",
    hospital_distance_km: 5.8,
    school_distance_km: 2.1,
    hazard_risk_level: "Low-Moderate",
    terrain_type: "Alluvial Flat Ridge",
    elevation_m: 860
  },
  {
    id: "mock-site-chamoli-03",
    name: "Gauchar Low-Hazard Valley Extension",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.2872,
    lng: 79.1543,
    capacity: 4800,
    current_occupancy: 950,
    safety_score: 86,
    water_source: "Gravity Water Supply & Tube Wells",
    road_connectivity: "Direct Airstrip & NH Connectivity",
    hospital_distance_km: 2.0,
    school_distance_km: 1.0,
    hazard_risk_level: "Very Low",
    terrain_type: "Wide Valley Plain",
    elevation_m: 800
  },
  {
    id: "mock-site-chamoli-04",
    name: "Pipalkoti Safe Flank Buffer Area",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4410,
    lng: 79.3550,
    capacity: 1900,
    current_occupancy: 300,
    safety_score: 74,
    water_source: "Stream intake + Storage reservoirs",
    road_connectivity: "Single-lane Macadam Road",
    hospital_distance_km: 8.5,
    school_distance_km: 3.4,
    hazard_risk_level: "Moderate",
    terrain_type: "Stable Bedrock Spur",
    elevation_m: 1320
  }
];

export const MOCK_VILLAGES = [
  {
    id: "mock-village-chamoli-01",
    name: "Mock Joshigarh Upper",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.5562,
    lng: 79.5638,
    population: 2450,
    elderly_pct: 24.5,
    road_access: "poor",
    hazard_score: 92,
    hazard_factors: {
      slope: 88,
      rainfall: 94,
      landslide_history: 95,
      elevation: 85
    },
    exposure_score: 89,
    vulnerability_score: 91,
    history_score: 95,
    priority_score: 91.65,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 95 },
      { factor: "rainfall", contribution: 94 },
      { factor: "slope", contribution: 88 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-02",
    name: "Mock Helang Valley",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.5284,
    lng: 79.5126,
    population: 1820,
    elderly_pct: 21.0,
    road_access: "poor",
    hazard_score: 87,
    hazard_factors: {
      slope: 85,
      rainfall: 89,
      landslide_history: 90,
      elevation: 82
    },
    exposure_score: 84,
    vulnerability_score: 86,
    history_score: 88,
    priority_score: 86.25,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 90 },
      { factor: "rainfall", contribution: 89 },
      { factor: "slope", contribution: 85 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-03",
    name: "Mock Birahi Ridge",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4321,
    lng: 79.4182,
    population: 1400,
    elderly_pct: 18.2,
    road_access: "moderate",
    hazard_score: 72,
    hazard_factors: {
      slope: 74,
      rainfall: 70,
      landslide_history: 75,
      elevation: 68
    },
    exposure_score: 68,
    vulnerability_score: 74,
    history_score: 70,
    priority_score: 71.0,
    priority_category: "Immediate",
    top_factors: [
      { factor: "landslide_history", contribution: 75 },
      { factor: "slope", contribution: 74 },
      { factor: "rainfall", contribution: 70 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-04",
    name: "Mock Pipalkoti Slope",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4290,
    lng: 79.3325,
    population: 2100,
    elderly_pct: 16.5,
    road_access: "moderate",
    hazard_score: 68,
    hazard_factors: {
      slope: 70,
      rainfall: 66,
      landslide_history: 72,
      elevation: 65
    },
    exposure_score: 71,
    vulnerability_score: 67,
    history_score: 65,
    priority_score: 67.95,
    priority_category: "Short-term",
    top_factors: [
      { factor: "landslide_history", contribution: 72 },
      { factor: "slope", contribution: 70 },
      { factor: "rainfall", contribution: 66 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-05",
    name: "Mock Nandaprayag East",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.3312,
    lng: 79.3245,
    population: 980,
    elderly_pct: 12.0,
    road_access: "moderate",
    hazard_score: 48,
    hazard_factors: {
      slope: 50,
      elevation: 49,
      landslide_history: 48,
      rainfall: 45
    },
    exposure_score: 52,
    vulnerability_score: 46,
    history_score: 44,
    priority_score: 47.8,
    priority_category: "Medium-term",
    top_factors: [
      { factor: "slope", contribution: 50 },
      { factor: "elevation", contribution: 49 },
      { factor: "landslide_history", contribution: 48 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-06",
    name: "Mock Gopeshwar Heights",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.4124,
    lng: 79.3512,
    population: 1650,
    elderly_pct: 11.5,
    road_access: "good",
    hazard_score: 43,
    hazard_factors: {
      slope: 44,
      elevation: 43,
      landslide_history: 41,
      rainfall: 40
    },
    exposure_score: 45,
    vulnerability_score: 40,
    history_score: 42,
    priority_score: 42.35,
    priority_category: "Medium-term",
    top_factors: [
      { factor: "slope", contribution: 44 },
      { factor: "elevation", contribution: 43 },
      { factor: "landslide_history", contribution: 41 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-07",
    name: "Mock Karnaprayag West",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.2598,
    lng: 79.2184,
    population: 820,
    elderly_pct: 8.5,
    road_access: "good",
    hazard_score: 25,
    hazard_factors: {
      elevation: 30,
      rainfall: 28,
      slope: 22,
      landslide_history: 20
    },
    exposure_score: 26,
    vulnerability_score: 24,
    history_score: 22,
    priority_score: 24.45,
    priority_category: "Monitor",
    top_factors: [
      { factor: "elevation", contribution: 30 },
      { factor: "rainfall", contribution: 28 },
      { factor: "slope", contribution: 22 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  },
  {
    id: "mock-village-chamoli-08",
    name: "Mock Tharali Basin",
    district: "Chamoli",
    state: "Uttarakhand",
    lat: 30.0654,
    lng: 79.5021,
    population: 540,
    elderly_pct: 7.0,
    road_access: "good",
    hazard_score: 18,
    hazard_factors: {
      rainfall: 20,
      elevation: 19,
      landslide_history: 18,
      slope: 15
    },
    exposure_score: 20,
    vulnerability_score: 17,
    history_score: 15,
    priority_score: 17.7,
    priority_category: "Monitor",
    top_factors: [
      { factor: "rainfall", contribution: 20 },
      { factor: "elevation", contribution: 19 },
      { factor: "landslide_history", contribution: 18 }
    ],
    updated_at: {
      _seconds: 1787671705,
      _nanoseconds: 898000000
    }
  }
];

// Haversine distance calculator in KM
export function calculateHaversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

// Compute mock site matches for a village based on scoring algorithm
export function getMockMatchesForVillage(villageId, siteWeights = DEFAULT_WEIGHTS.site_ranking) {
  const village = MOCK_VILLAGES.find((v) => v.id === villageId) || MOCK_VILLAGES[0];
  
  return {
    village_id: village.id,
    matches: MOCK_RELOCATION_SITES.map((site) => {
      const distance_km = calculateHaversineKm(village.lat, village.lng, site.lat, site.lng);
      
      // Compute criteria
      const safetyScore = site.safety_score;
      const capacityScore = Math.min(100, Math.round((site.capacity / Math.max(village.population, 1000)) * 50));
      const infrastructureScore = 100;
      const accessibilityScore = site.road_connectivity.includes("NH") ? 100 : 85;
      const waterScore = site.water_source.includes("Filtration") ? 75 : 100;
      const distanceScore = Math.max(0, Math.round(100 - (distance_km * 2)));

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
