import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
  Circle,
  CircleMarker,
  ZoomControl,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { Layers, ShieldCheck, AlertCircle, Compass, Maximize2, Minimize2, Flame, CloudRain } from "lucide-react";
import { PRIORITY_STYLES } from "../constants/theme";
import MapPins from "./MapPins";


// Helper component to resize Leaflet map tiles when expanded/collapsed
function MapResizer({ isExpanded }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [isExpanded, map]);
  return null;
}

// Helper component to center and animate map to selected coordinates
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length >= 2) {
      const lat = parseFloat(center[0]);
      const lng = parseFloat(center[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        const size = map.getSize();
        if (size.x > 0 && size.y > 0) {
          map.flyTo([lat, lng], zoom, {
            duration: 1.2,
            easeLinearity: 0.25
          });
        } else {
          map.setView([lat, lng], zoom);
        }
      }
    }
  }, [center, zoom, map]);
  return null;
}

// Generate custom SVG icon for villages
function createVillageIcon(priorityCategory, isSelected, score) {
  const colorMap = {
    Immediate: "#EF4444",
    "Short-term": "#F97316",
    "Medium-term": "#EAB308",
    Monitor: "#10B981"
  };
  const color = colorMap[priorityCategory] || "#10B981";
  const size = isSelected ? 42 : 32;

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110">
      ${
        isSelected || priorityCategory === "Immediate"
          ? `<div class="absolute w-12 h-12 rounded-full pulse-immediate opacity-75" style="background-color: ${color}40;"></div>`
          : ""
      }
      <div 
        class="flex items-center justify-center rounded-full border-2 shadow-2xl font-mono text-[11px] font-black tracking-tight"
        style="
          width: ${size}px; 
          height: ${size}px; 
          background-color: ${isSelected ? '#ffffff' : color}; 
          color: ${isSelected ? color : '#ffffff'};
          border-color: ${isSelected ? color : '#ffffff'};
          box-shadow: 0 0 15px ${color}80;
        "
      >
        ${Math.round(score)}
      </div>
      <div 
        class="absolute -bottom-1 w-2 h-2 rotate-45"
        style="background-color: ${isSelected ? '#ffffff' : color};"
      ></div>
    </div>
  `;

  return L.divIcon({
    className: "custom-village-marker",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

// Generate custom Blue Shield Icon for Resettlement Candidate Sites
function createBlueShieldIcon(isTopMatch) {
  const size = isTopMatch ? 40 : 32;
  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110">
      ${
        isTopMatch
          ? `<div class="absolute w-12 h-12 rounded-full pulse-immediate opacity-80" style="background-color: #2563eb50;"></div>`
          : ""
      }
      <div 
        class="flex items-center justify-center rounded-xl bg-blue-600 border-2 ${isTopMatch ? 'border-cyan-300 ring-2 ring-cyan-400/60 shadow-cyan-500/50' : 'border-blue-200 shadow-blue-500/40'} text-white shadow-xl"
        style="width: ${size}px; height: ${size}px;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="${isTopMatch ? 20 : 16}" height="${isTopMatch ? 20 : 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: "custom-blue-shield-marker",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

export default function MapView({
  villages,
  sites,
  selectedVillage,
  onSelectVillage,
  siteMatches = []
}) {
  const [mapStyle, setMapStyle] = useState("voyager"); // "voyager" | "positron" | "dark" | "satellite" | "osm"
  const [showSites, setShowSites] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [showLandslideHeatmap, setShowLandslideHeatmap] = useState(true);
  const [showRainfallContours, setShowRainfallContours] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Default center initialized at [26.95, 94.20] (Majuli Island, Assam)
  const defaultCenter = [26.95, 94.20];
  const mapCenter = selectedVillage
    ? [selectedVillage.lat, selectedVillage.lng]
    : defaultCenter;

  // Strict India geographical bounding box
  const INDIA_BOUNDS = [
    [6.0, 68.0],   // Southwest coordinates (Kanyakumari / Arabian Sea)
    [37.5, 97.5]   // Northeast coordinates (Kashmir / Arunachal Pradesh)
  ];

  const tileLayers = {
    voyager: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    positron: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    dark: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  };

  // Pre-computed Rainfall & Brahmaputra River Surge Contours across Majuli Island
  const rainfallContours = [
    {
      id: "contour-300mm",
      label: "Brahmaputra Southern Inundation Front (Severe Flood)",
      color: "#1D4ED8",
      weight: 2.5,
      dashArray: "4, 6",
      positions: [
        [26.86, 94.15],
        [26.88, 94.25],
        [26.89, 94.32],
        [26.91, 94.40]
      ]
    },
    {
      id: "contour-200mm",
      label: "Subansiri Northern Overflow Channel (Moderate Risk)",
      color: "#0284C7",
      weight: 2,
      dashArray: "3, 5",
      positions: [
        [27.08, 94.18],
        [27.05, 94.26],
        [27.03, 94.34],
        [27.00, 94.42]
      ]
    },
    {
      id: "contour-120mm",
      label: "Central Majuli Inland Waterlogging Boundary",
      color: "#38BDF8",
      weight: 1.5,
      dashArray: "2, 4",
      positions: [
        [26.98, 94.12],
        [26.96, 94.22],
        [26.95, 94.30],
        [26.93, 94.38]
      ]
    }
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        isExpanded
          ? "fixed inset-2 sm:inset-4 z-[500] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 flex flex-col"
          : "relative w-full h-full rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950"
      }`}
    >
      {/* Map Controls Header Overlay with Layer Switcher */}
      <div className="absolute top-3 left-3 right-3 z-[30] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left-side Layer Switchers */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 shadow-md">
          {/* Layer style selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-500">Basemap:</span>
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              aria-label="Map Basemap Style"
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="voyager">Esri World Topo Map</option>
              <option value="dark">Esri Dark Gray Canvas</option>
              <option value="positron">Esri Light Gray Canvas</option>
              <option value="satellite">Esri World Imagery (Satellite)</option>
              <option value="osm">OpenStreetMap Standard</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>

          {/* Toggle Landslide Risk Heatmap */}
          <label className="flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showLandslideHeatmap}
              onChange={(e) => setShowLandslideHeatmap(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-rose-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1 text-rose-400 font-medium">
              <Flame className="w-3.5 h-3.5" /> Hazard Heatmap
            </span>
          </label>

          {/* Toggle Rainfall Contours */}
          <label className="flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRainfallContours}
              onChange={(e) => setShowRainfallContours(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1 text-sky-400 font-medium">
              <CloudRain className="w-3.5 h-3.5" /> Rain Contours
            </span>
          </label>

          {/* Toggle Resettlement Sites */}
          <label className="flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSites}
              onChange={(e) => setShowSites(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1 text-blue-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Sites ({sites.length})
            </span>
          </label>

          {/* Toggle Distance Vectors */}
          {selectedVillage && (
            <label className="flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showConnections}
                onChange={(e) => setShowConnections(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span className="text-cyan-300 font-medium">Vector</span>
            </label>
          )}
        </div>

        {/* Right-side Expand / Minimize Fullscreen Map Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 active:bg-slate-700 backdrop-blur-md border border-slate-700 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-lg cursor-pointer"
            title={isExpanded ? "Minimize Map (Esc)" : "Expand Map View"}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-4 h-4 text-cyan-400" />
                <span>Minimize Map</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-cyan-400" />
                <span>Expand Map</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-3 z-[30] bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs shadow-lg space-y-1.5 pointer-events-auto">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          India GIS & Priority
        </span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
            <span className="text-slate-200">Immediate (≥71)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></span>
            <span className="text-slate-200">Short-term (≥51)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></span>
            <span className="text-slate-200">Medium (≥31)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <span className="text-slate-200">Monitor (&lt;31)</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2.5 h-2.5 rounded-md bg-blue-600 border border-blue-300"></span>
            <span>Safe Resettlement Zone</span>
          </div>
          {showRainfallContours && (
            <div className="flex items-center gap-1.5 text-sky-400">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-sky-400"></span>
              <span>Monsoon Isohyet Contours</span>
            </div>
          )}
          {showLandslideHeatmap && (
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40 border border-rose-500"></span>
              <span>Hazard Heat Buffer</span>
            </div>
          )}
        </div>
      </div>

      {/* Leaflet Map strictly restricted to India */}
      <MapContainer
        center={defaultCenter}
        zoom={10}
        minZoom={5}
        maxZoom={18}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        <ZoomControl position="bottomright" />
        <MapResizer isExpanded={isExpanded} />

        <TileLayer
          url={tileLayers[mapStyle].url}
          attribution={tileLayers[mapStyle].attribution}
          bounds={INDIA_BOUNDS}
        />

        <MapController
          center={selectedVillage ? [selectedVillage.lat, selectedVillage.lng] : defaultCenter}
          zoom={selectedVillage ? 11 : 10}
        />

        {/* 1. Monsoon Rainfall Isohyet Contours Overlay */}
        {showRainfallContours &&
          rainfallContours.map((contour) => (
            <Polyline
              key={contour.id}
              positions={contour.positions}
              pathOptions={{
                color: contour.color,
                weight: contour.weight,
                dashArray: contour.dashArray,
                opacity: 0.85
              }}
            >
              <Tooltip direction="top" className="custom-distance-tooltip">
                <span className="font-semibold text-[11px] text-sky-200">
                  🌧️ {contour.label}
                </span>
              </Tooltip>
            </Polyline>
          ))}

        {/* 2. Flood & Riverbank Erosion Risk Heatmap Buffers Overlay */}
        {showLandslideHeatmap &&
          villages.map((village) => {
            const lat = parseFloat(village.lat);
            const lng = parseFloat(village.lng);
            if (isNaN(lat) || isNaN(lng)) return null;
            const hazardScore = village.hazard_score || 50;

            let color = "#10B981";
            let radius = 400;
            let fillOpacity = 0.12;

            if (hazardScore >= 80 || village.priority_category === "Immediate") {
              color = "#EF4444";
              radius = 1200;
              fillOpacity = 0.22;
            } else if (hazardScore >= 60 || village.priority_category === "Short-term") {
              color = "#F97316";
              radius = 900;
              fillOpacity = 0.18;
            } else if (hazardScore >= 40 || village.priority_category === "Medium-term") {
              color = "#EAB308";
              radius = 650;
              fillOpacity = 0.14;
            }

            return (
              <Circle
                key={`heat-${village.id}`}
                center={[village.lat, village.lng]}
                radius={radius}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: fillOpacity,
                  weight: 1,
                  dashArray: "3, 6",
                  opacity: 0.45
                }}
              />
            );
          })}

        {/* Render Village Circular SVG Markers with Priority Color Coding & Pulse */}
        <MapPins
          villages={villages}
          selectedVillageId={selectedVillage?.id}
          onSelectVillage={onSelectVillage}
        />

        {/* Render Candidate Relocation Sites with Blue Shield Markers */}
        {showSites &&
          sites.map((site) => {
            const isTopMatched = siteMatches.length > 0 && siteMatches[0]?.site_id === site.id;
            const lat = parseFloat(site.lat);
            const lng = parseFloat(site.lng);
            if (isNaN(lat) || isNaN(lng)) return null;
            const matchInfo = siteMatches.find((m) => m.site_id === site.id);

            return (
              <Marker
                key={`site-${site.id}`}
                position={[lat, lng]}
                icon={createBlueShieldIcon(isTopMatched)}
              >
                <Popup>
                  <div className="p-3.5 space-y-2 min-w-[220px]">
                    <div className="flex items-center justify-between gap-1.5 border-b border-slate-700 pb-1.5 pr-6">
                      <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase">
                        <ShieldCheck className="w-4 h-4 text-blue-400" /> Resettlement Zone
                      </div>
                      {matchInfo && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold flex-shrink-0">
                          {matchInfo.suitability_score}% Match
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-white">{site.name}</h4>

                    <div className="space-y-1 text-xs text-slate-300">
                      {matchInfo && (
                        <div className="flex justify-between text-cyan-300 font-medium">
                          <span>Distance:</span>
                          <span className="font-mono font-bold">{matchInfo.distance_km} km</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Capacity:</span>
                        <span className="font-semibold text-emerald-400">
                          {site.capacity.toLocaleString()} persons
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Safety Score:</span>
                        <span className="font-semibold text-white">{site.safety_score} / 100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Water Supply:</span>
                        <span className="text-slate-200 text-right truncate max-w-[120px]">
                          {site.water_source}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Road Connectivity:</span>
                        <span className="text-slate-200 text-right truncate max-w-[120px]">
                          {site.road_connectivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* Draw Dashed Cyan Polyline from Selected Village to Top-Ranked Candidate Site with Distance Tooltip */}
        {selectedVillage &&
          showConnections &&
          siteMatches.length > 0 &&
          (() => {
            const topMatch = siteMatches[0];
            const topSite = sites.find((s) => s.id === topMatch?.site_id);
            if (!topSite) return null;
            const vLat = parseFloat(selectedVillage.lat);
            const vLng = parseFloat(selectedVillage.lng);
            const sLat = parseFloat(topSite.lat);
            const sLng = parseFloat(topSite.lng);
            if (isNaN(vLat) || isNaN(vLng) || isNaN(sLat) || isNaN(sLng)) return null;

            return (
              <Polyline
                key={`top-vector-${selectedVillage.id}-${topSite.id}`}
                positions={[
                  [vLat, vLng],
                  [sLat, sLng]
                ]}
                pathOptions={{
                  color: "#06B6D4",
                  weight: 3.5,
                  dashArray: "8, 10",
                  opacity: 0.95
                }}
              >
                <Tooltip
                  permanent
                  direction="center"
                  className="custom-distance-tooltip"
                >
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300 whitespace-nowrap drop-shadow">
                    <span>📍 {typeof topMatch.distance_km === 'number' ? topMatch.distance_km.toFixed(1) : topMatch.distance_km} km</span>
                    <span className="text-emerald-400 font-semibold">({typeof topMatch.suitability_score === 'number' ? topMatch.suitability_score.toFixed(1) : topMatch.suitability_score}% Match)</span>
                  </div>
                </Tooltip>
              </Polyline>
            );
          })()}
      </MapContainer>
    </div>
  );
}
