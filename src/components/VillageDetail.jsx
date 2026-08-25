import React from "react";
import {
  AlertTriangle,
  Users,
  MapPin,
  TrendingUp,
  Shield,
  Activity,
  Layers,
  ArrowUpRight,
  Droplets,
  Mountain,
  Compass,
  FileText,
  PanelRightOpen
} from "lucide-react";
import { PRIORITY_STYLES } from "./VillageList";
import SiteMatchList from "./SiteMatchList";

export default function VillageDetail({
  village,
  siteMatches,
  loadingMatches,
  onOpenDrawer
}) {
  if (!village) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
        <Compass className="w-12 h-12 text-slate-700 mb-3 animate-pulse" />
        <p className="text-sm font-medium text-slate-400">
          Select a village from the list or map
        </p>
        <p className="text-xs text-slate-600 mt-1 max-w-xs">
          View multi-factor hazard diagnostics, vulnerability parameters, and resettlement recommendations.
        </p>
      </div>
    );
  }

  const priorityStyle = PRIORITY_STYLES[village.priority_category] || PRIORITY_STYLES.Monitor;
  const factors = village.hazard_factors || {};

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4 overflow-y-auto h-full shadow-lg">
      
      {/* Header Info */}
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm ${priorityStyle.badgeBg}`}>
                {village.priority_category} Priority
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {village.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {village.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{village.district}, {village.state}</span>
              <span>•</span>
              <span className="font-mono text-slate-300">
                {village.lat?.toFixed(4)}° N, {village.lng?.toFixed(4)}° E
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-slate-400 font-medium">Priority Score</span>
            <span className="text-2xl font-black font-mono text-rose-400">
              {village.priority_score}
            </span>
          </div>
        </div>

        {/* Quick stat cards row */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2">
            <span className="text-slate-500 block text-[10px]">Population</span>
            <span className="font-bold text-slate-200 font-mono text-sm">
              {village.population?.toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2">
            <span className="text-slate-500 block text-[10px]">Elderly Ratio</span>
            <span className="font-bold text-amber-400 font-mono text-sm">
              {village.elderly_pct}%
            </span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2">
            <span className="text-slate-500 block text-[10px]">Road Evacuation</span>
            <span className={`font-bold capitalize text-sm ${village.road_access === "poor" ? "text-red-400" : "text-emerald-400"}`}>
              {village.road_access || "moderate"}
            </span>
          </div>
        </div>

        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="w-full mt-2.5 py-1.5 px-3 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-lg border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <PanelRightOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Explainability & Score Gauge Drawer</span>
          </button>
        )}
      </div>

      {/* Primary 4-Factor Weights Matrix Breakdown */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-rose-400" />
          Multi-Pillar Composite Risk Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Hazard (35%)</span>
              <strong className="text-rose-400 font-mono">{village.hazard_score || 0}</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${Math.min(100, village.hazard_score || 0)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Exposure (25%)</span>
              <strong className="text-orange-400 font-mono">{village.exposure_score || 0}</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full"
                style={{ width: `${Math.min(100, village.exposure_score || 0)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Vulnerability (20%)</span>
              <strong className="text-yellow-400 font-mono">{village.vulnerability_score || 0}</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-yellow-500 h-full rounded-full"
                style={{ width: `${Math.min(100, village.vulnerability_score || 0)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>History (20%)</span>
              <strong className="text-indigo-400 font-mono">{village.history_score || 0}</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${Math.min(100, village.history_score || 0)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hazard Factor Micro-Diagnostics */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          Terrain & Climate Hazard Diagnostic (ML Output)
        </h3>

        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Slope Gradient</span>
              <span className="font-mono text-slate-200 font-bold">{factors.slope || "N/A"} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${factors.slope || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Monsoon Rainfall Risk</span>
              <span className="font-mono text-slate-200 font-bold">{factors.rainfall || "N/A"} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${factors.rainfall || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Historical Landslide Frequency</span>
              <span className="font-mono text-slate-200 font-bold">{factors.landslide_history || "N/A"} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${factors.landslide_history || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">High Altitude / Elevation Risk</span>
              <span className="font-mono text-slate-200 font-bold">{factors.elevation || "N/A"} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${factors.elevation || 0}%` }} />
            </div>
          </div>
        </div>

        {/* Top Hazard Contribution Factors tags */}
        {village.top_factors && village.top_factors.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium">Top Drivers:</span>
            {village.top_factors.map((tf, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium"
              >
                {tf.factor.replace('_', ' ')}: <strong>{tf.contribution}%</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Relocation Site Recommendations */}
      <div className="pt-2 border-t border-slate-800">
        <SiteMatchList
          matches={siteMatches}
          villageName={village.name}
          loading={loadingMatches}
        />
      </div>

    </div>
  );
}
