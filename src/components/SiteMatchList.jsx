import React, { useState } from "react";
import { Shield, Navigation, Droplet, Building2, Truck, Activity, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

export default function SiteMatchList({ matches = [], villageName, loading }) {
  const [expandedSiteId, setExpandedSiteId] = useState(matches[0]?.site_id || null);

  const toggleExpand = (siteId) => {
    setExpandedSiteId(expandedSiteId === siteId ? null : siteId);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (score >= 65) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
    if (score >= 50) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
    return "text-slate-400 bg-slate-500/10 border-slate-500/30";
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Calculating multi-criteria site suitability ranking...</span>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-500">
        No candidate relocation sites found.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between pb-1">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          Recommended Relocation Sites
        </h4>
        <span className="text-[11px] text-slate-400">
          Ranked for {villageName}
        </span>
      </div>

      <div className="space-y-2">
        {matches.map((match, idx) => {
          const isTopRanked = idx === 0;
          const isExpanded = expandedSiteId === match.site_id;
          const breakdown = match.criteria_breakdown || {};
          const scoreClass = getScoreColor(match.suitability_score);

          return (
            <div
              key={match.site_id}
              className={`rounded-xl border transition-all ${
                isTopRanked
                  ? "bg-slate-900/90 border-cyan-500/40 shadow-md shadow-cyan-950/20"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Site Header Row */}
              <div
                onClick={() => toggleExpand(match.site_id)}
                className="p-3 cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                      isTopRanked
                        ? "bg-cyan-500 text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-slate-100 truncate">
                        {match.site_name}
                      </h5>
                      {isTopRanked && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                          Best Fit
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span>Distance: <strong className="text-slate-200 font-mono">{match.distance_km} km</strong></span>
                      {match.site_details?.capacity && (
                        <span>Capacity: <strong className="text-slate-200 font-mono">{match.site_details.capacity.toLocaleString()}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${scoreClass}`}>
                    {match.suitability_score}%
                  </div>
                  <button className="text-slate-400 hover:text-slate-200 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Criteria Breakdown & Site Specs (Expandable) */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 space-y-3 text-xs bg-slate-950/40 rounded-b-xl">
                  
                  {/* Criteria Multi-bar grid */}
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                      <span>Criteria Score Breakdown (Weighted):</span>
                      <span className="text-[10px] text-slate-500">Weight & Score</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(breakdown).map(([key, crit]) => {
                        const labelMap = {
                          safety: "Safety & Hazard Buffer (40%)",
                          capacity: "Capacity / Space (20%)",
                          infrastructure: "Infrastructure (15%)",
                          accessibility: "Road & Transport (10%)",
                          water: "Water Supply (10%)",
                          distance: "Proximity / Distance (5%)"
                        };

                        return (
                          <div key={key} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-300 font-medium capitalize">
                                {labelMap[key] || key}
                              </span>
                              <span className="font-mono text-cyan-400 font-bold">
                                {crit.score}/100 <span className="text-slate-500 font-normal">({crit.weighted}pts)</span>
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, Math.max(0, crit.score))}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Site Environmental & Connectivity Specs */}
                  {match.site_details && (
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-300 border-t border-slate-800/60">
                      <div>
                        <span className="text-slate-500 block">Water Source</span>
                        <span className="font-medium text-slate-200">{match.site_details.water_source}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Connectivity</span>
                        <span className="font-medium text-slate-200">{match.site_details.road_connectivity}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Terrain & Elevation</span>
                        <span className="font-medium text-slate-200">{match.site_details.terrain_type} ({match.site_details.elevation_m}m)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Hospital Proximity</span>
                        <span className="font-medium text-slate-200">{match.site_details.hospital_distance_km} km to nearest facility</span>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
