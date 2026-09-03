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
  PanelRightOpen,
  Flame,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { PRIORITY_STYLES } from "../constants/theme";
import { formatScore } from "../utils/priority";
import SiteMatchList from "./SiteMatchList";

export default function VillageDetail({
  village,
  siteMatches,
  loadingMatches,
  onOpenDrawer
}) {
  if (!village) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center text-slate-500 h-full flex flex-col items-center justify-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center">
          <Compass className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <p className="text-sm font-bold text-slate-300">
          Select a sector from the Priority Matrix
        </p>
        <p className="text-xs text-slate-500 max-w-sm">
          Examine multi-factor flood/erosion diagnostics, demographic vulnerability metrics, and algorithmic resettlement matches.
        </p>
      </div>
    );
  }

  const priorityCategory = village.priority_category || "Monitor";
  const priorityStyle = PRIORITY_STYLES[priorityCategory] || PRIORITY_STYLES.Monitor;
  const factors = village.hazard_factors || {};

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-5 overflow-y-auto h-full shadow-2xl">
      
      {/* Top Sector Overview Card */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${priorityStyle.badgeBg}`}>
                {priorityCategory} Priority
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Sector ID: {village.id}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {village.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{village.district}, {village.state}</span>
              <span>•</span>
              <span className="font-mono text-cyan-300">
                {village.lat?.toFixed(4)}° N, {village.lng?.toFixed(4)}° E
              </span>
            </div>
          </div>

          {/* Radial Priority Badge */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 px-4 flex-shrink-0 self-start">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Priority Index</span>
              <span className="text-2xl font-black font-mono" style={{ color: priorityStyle.color }}>
                {formatScore(village.priority_score)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${priorityStyle.color}15`, border: `1px solid ${priorityStyle.color}40` }}>
              <Flame className="w-5 h-5" style={{ color: priorityStyle.color }} />
            </div>
          </div>
        </div>

        {/* Quick Demographic Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-xs">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Population</span>
            <span className="font-bold text-white font-mono text-sm">
              {village.population?.toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Elderly Ratio</span>
            <span className="font-bold text-amber-400 font-mono text-sm">
              {village.elderly_pct}%
            </span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Evacuation Road</span>
            <span className={`font-bold capitalize text-sm ${village.road_access === "poor" ? "text-red-400" : "text-emerald-400"}`}>
              {village.road_access || "moderate"}
            </span>
          </div>
        </div>

        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="w-full mt-3.5 py-2 px-3 bg-gradient-to-r from-slate-850 to-slate-800 hover:from-slate-800 hover:to-slate-750 text-cyan-300 hover:text-white rounded-xl border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <PanelRightOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Comprehensive Explainability Drawer</span>
          </button>
        )}
      </div>

      {/* 4-Pillar Composite Risk Breakdown */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-rose-400" />
          Multi-Pillar Composite Risk Distribution
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
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

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
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

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
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

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
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
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          Geospatial & Hydro-Geological Hazard Diagnostics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Riverbank Erosion & Slope</span>
              <span className="font-mono text-slate-200 font-bold">{factors.slope || 0} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${factors.slope || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Monsoon Rainfall & Flood Surge</span>
              <span className="font-mono text-slate-200 font-bold">{factors.rainfall || 0} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${factors.rainfall || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Historical Embankment Breach Frequency</span>
              <span className="font-mono text-slate-200 font-bold">{factors.landslide_history || 0} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${factors.landslide_history || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Lowland Inundation Vulnerability</span>
              <span className="font-mono text-slate-200 font-bold">{factors.elevation || 0} / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${factors.elevation || 0}%` }} />
            </div>
          </div>
        </div>

        {/* Top Hazard Contribution Factors tags */}
        {village.top_factors && village.top_factors.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Top Risk Drivers:</span>
            {village.top_factors.map((tf, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium"
              >
                {tf.factor.replace('_', ' ')}: <strong className="font-mono">{tf.contribution}%</strong>
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
