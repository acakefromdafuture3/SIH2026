import React, { useState } from "react";
import { Shield, Navigation, Droplet, Building2, Truck, Activity, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from "lucide-react";

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
      <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="font-medium tracking-wide">Evaluating multi-criteria relocation algorithm & terrain safety...</span>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center text-xs text-slate-500 space-y-2">
        <Shield className="w-8 h-8 text-slate-700 mx-auto" />
        <p>No candidate relocation sites found for this sector.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Highland Safe Havens & Resettlement Match
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic priority suitability ranked for <strong className="text-slate-200">{villageName}</strong>
          </p>
        </div>
        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full self-start">
          {matches.length} Certified Safe Zones
        </span>
      </div>

      <div className="space-y-3">
        {matches.map((match, idx) => {
          const isTopRanked = idx === 0;
          const isExpanded = expandedSiteId === match.site_id;
          const breakdown = match.criteria_breakdown || {};
          const scoreClass = getScoreColor(match.suitability_score);

          return (
            <div
              key={match.site_id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isTopRanked
                  ? "bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/30"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Site Header Row */}
              <div
                onClick={() => toggleExpand(match.site_id)}
                className="p-3.5 sm:p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center flex-shrink-0 shadow-md ${
                      isTopRanked
                        ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950"
                        : "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-white truncate">
                        {match.site_name}
                      </h5>
                      {isTopRanked && (
                        <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Top Match
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                      <span>Vector: <strong className="text-cyan-300 font-mono font-bold">{match.distance_km} km</strong></span>
                      {match.site_details?.capacity && (
                        <span>Capacity: <strong className="text-slate-200 font-mono">{match.site_details.capacity.toLocaleString()} persons</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-black ${scoreClass}`}>
                    {match.suitability_score}% Match
                  </div>
                  <div className="p-1 rounded-lg text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Criteria Breakdown (Expanded) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/70 space-y-3 animate-fadeIn text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Suitability Matrix Factors
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1"><Navigation className="w-3 h-3 text-cyan-400" /> Proximity</span>
                        <strong className="text-white font-mono">{breakdown.distance?.score || 0}%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${breakdown.distance?.score || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-blue-400" /> Water</span>
                        <strong className="text-white font-mono">{breakdown.water?.score || 0}%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.water?.score || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-emerald-400" /> Capacity</span>
                        <strong className="text-white font-mono">{breakdown.capacity?.score || 0}%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.capacity?.score || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-amber-400" /> Road Link</span>
                        <strong className="text-white font-mono">{breakdown.accessibility?.score || 0}%</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${breakdown.accessibility?.score || 0}%` }} />
                      </div>
                    </div>
                  </div>

                  {match.site_details && (
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Coordinates: <strong className="text-slate-300 font-mono">{match.site_details.lat}°N, {match.site_details.lng}°E</strong></span>
                      <span>•</span>
                      <span>Elevation: <strong className="text-emerald-400 font-mono">{match.site_details.elevation || 86}m</strong></span>
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
