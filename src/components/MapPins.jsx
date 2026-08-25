import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { ApiService } from "../services/api";

// Priority Color Configuration
export const PIN_COLORS = {
  Immediate: "#EF4444",   // Red with pulse animation
  "Short-term": "#F97316", // Orange
  "Medium-term": "#EAB308",// Yellow
  Monitor: "#10B981"       // Green
};

/**
 * Creates a circular SVG Leaflet DivIcon with exact color coding and pulse animation for Immediate category
 */
export function createCircularPinIcon(priorityCategory, score, isSelected) {
  const color = PIN_COLORS[priorityCategory] || "#10B981";
  const isImmediate = priorityCategory === "Immediate";
  const size = isSelected ? 44 : 34;
  const radius = size / 2;
  const displayScore = score !== undefined && score !== null ? Math.round(score) : "";

  // SVG Circular marker with optional animated pulse halo for Immediate priority
  const svgHtml = `
    <div class="relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 select-none cursor-pointer group">
      ${
        isImmediate || isSelected
          ? `
          <span class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style="background-color: ${color}; width: ${size + 14}px; height: ${size + 14}px; animation-duration: 1.8s;"></span>
          <span class="absolute inline-flex rounded-full opacity-30" style="background-color: ${color}; width: ${size + 8}px; height: ${size + 8}px;"></span>
          `
          : ""
      }
      
      <!-- Custom Circular SVG Pin -->
      <svg 
        width="${size}" 
        height="${size}" 
        viewBox="0 0 100 100" 
        class="transition-transform duration-200 group-hover:scale-110 drop-shadow-lg"
      >
        <!-- Outer Stroke / Border Ring -->
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="${color}" 
          stroke="${isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.85)'}" 
          stroke-width="${isSelected ? '6' : '4'}" 
        />
        
        <!-- Inner Contrast Ring -->
        <circle 
          cx="50" 
          cy="50" 
          r="34" 
          fill="${isSelected ? '#0f172a' : '#1e293b'}" 
          stroke="${color}" 
          stroke-width="3" 
        />

        <!-- Priority Score in Center -->
        <text 
          x="50" 
          y="56" 
          text-anchor="middle" 
          dominant-baseline="central" 
          fill="#ffffff" 
          font-family="monospace, sans-serif" 
          font-size="30" 
          font-weight="900"
        >
          ${displayScore}
        </text>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: "custom-circular-svg-pin",
    html: svgHtml,
    iconSize: [size, size],
    iconAnchor: [radius, radius]
  });
}

/**
 * MapPins Component
 * Calls getVillages from Firebase (asia-south1) and renders custom circular SVG markers
 */
export default function MapPins({
  villages: propVillages,
  selectedVillageId,
  onSelectVillage,
  district,
  priorityCategory
}) {
  const [villages, setVillages] = useState(propVillages || []);
  const [loading, setLoading] = useState(!propVillages);

  // Fetch villages from Firebase Callable function if not provided via props
  useEffect(() => {
    if (propVillages && propVillages.length > 0) {
      setVillages(propVillages);
      return;
    }

    let isMounted = true;
    async function loadFirebaseVillages() {
      setLoading(true);
      try {
        // Direct Firebase Callable invocation
        const getVillagesFn = httpsCallable(functions, "getVillages");
        const result = await getVillagesFn({
          district: district || undefined,
          priority_category: priorityCategory || undefined
        });

        if (isMounted && result?.data?.villages) {
          setVillages(result.data.villages);
        }
      } catch (err) {
        console.warn("Firebase getVillages onCall fallback:", err.message);
        // Resilient fallback to API service layer
        const fallback = await ApiService.getVillages(district, priorityCategory);
        if (isMounted && fallback?.villages) {
          setVillages(fallback.villages);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFirebaseVillages();

    return () => {
      isMounted = false;
    };
  }, [propVillages, district, priorityCategory]);

  return (
    <>
      {villages.map((village) => {
        if (!village.lat || !village.lng) return null;

        const isSelected = selectedVillageId === village.id;
        const icon = createCircularPinIcon(
          village.priority_category,
          village.priority_score,
          isSelected
        );

        const categoryColor = PIN_COLORS[village.priority_category] || "#10B981";

        return (
          <Marker
            key={`pin-${village.id}`}
            position={[village.lat, village.lng]}
            icon={icon}
            eventHandlers={{
              click: () => {
                if (onSelectVillage) {
                  onSelectVillage(village.id);
                }
              }
            }}
          >
            <Popup className="custom-popup">
              <div className="p-3.5 space-y-2 min-w-[220px]">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 pr-6">
                  <h4 className="font-bold text-sm text-white truncate max-w-[125px]">
                    {village.name}
                  </h4>
                  <span
                    className="text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {village.priority_category}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Priority Score</span>
                    <strong className="text-rose-400 font-mono text-sm">
                      {village.priority_score}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Hazard Score</span>
                    <strong className="text-amber-400 font-mono text-sm">
                      {village.hazard_score ?? "N/A"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Population</span>
                    <span>{village.population?.toLocaleString() ?? "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Elderly</span>
                    <span>{village.elderly_pct ? `${village.elderly_pct}%` : "N/A"}</span>
                  </div>
                </div>

                {/* Action button */}
                {onSelectVillage && (
                  <button
                    onClick={() => onSelectVillage(village.id)}
                    className="w-full mt-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold transition-colors shadow"
                  >
                    Select & Match Sites
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
