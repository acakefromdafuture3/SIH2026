import React from "react";
import { AlertOctagon, Users, Flame, ShieldCheck, Activity, TrendingUp } from "lucide-react";
import { formatScore } from "../utils/priority";

export default function StatsOverview({ villages, sites }) {
  const immediateVillages = villages.filter((v) => v.priority_category === "Immediate");
  const shortTermVillages = villages.filter((v) => v.priority_category === "Short-term");
  
  const totalPopulationAtImmediateRisk = immediateVillages.reduce(
    (acc, v) => acc + (v.population || 0),
    0
  );

  const highestPriorityVillage = [...villages].sort(
    (a, b) => (b.priority_score || 0) - (a.priority_score || 0)
  )[0];

  const totalSafeCapacity = sites.reduce(
    (acc, s) => acc + ((s.capacity || 0) - (s.current_occupancy || 0)),
    0
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Stat 1: Immediate Action Required */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-rose-500/30">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
            Critical Red Zones
          </span>
          <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
            <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              {immediateVillages.length}
            </span>
            <span className="text-xs text-rose-400 font-semibold">Priority ≥ 71</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-600 to-red-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(immediateVillages.length / Math.max(villages.length, 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stat 2: High Risk Population */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-amber-500/30">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
            Pop. Exposed
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Users className="w-4 h-4 text-amber-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-300 font-mono tracking-tight">
              {totalPopulationAtImmediateRisk.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">citizens</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 truncate">
            Across top {immediateVillages.length} high-vulnerability sectors
          </p>
        </div>
      </div>

      {/* Stat 3: Highest Hazard Epicenter */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-orange-500/30">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
            Peak Threat Epicenter
          </span>
          <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base font-bold text-white truncate max-w-[140px]">
              {highestPriorityVillage?.name || "N/A"}
            </span>
            <span className="text-xs font-black text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              {formatScore(highestPriorityVillage?.priority_score)} pts
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 truncate">
            Primary driver: <span className="text-slate-200 font-medium capitalize">{highestPriorityVillage?.top_factors?.[0]?.factor?.replace('_', ' ') || "Inundation & Erosion"}</span>
          </p>
        </div>
      </div>

      {/* Stat 4: Relocation Sites Available */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-emerald-500/30">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            Safe Haven Capacity
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-300 font-mono tracking-tight">
              {totalSafeCapacity.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">ready slots</span>
          </div>
          <p className="text-[11px] text-emerald-400/80 mt-2 font-medium">
            {sites.length} vetted highland havens available
          </p>
        </div>
      </div>
    </div>
  );
}
