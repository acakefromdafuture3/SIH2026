import React from "react";
import { AlertOctagon, Users, Flame, Home, CheckCircle2 } from "lucide-react";

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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Stat 1: Immediate Action Required */}
      <div className="bg-slate-900/80 border border-red-500/20 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Immediate Action</span>
          <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertOctagon className="w-4 h-4 text-red-500" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-500 tracking-tight font-mono">
              {immediateVillages.length}
            </span>
            <span className="text-xs text-slate-400">villages (≥71 score)</span>
          </div>
          <p className="text-[11px] text-red-400/80 mt-1 font-medium">
            Requires urgent resettlement planning
          </p>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 w-16 h-16 rounded-full bg-red-500/5 blur-xl pointer-events-none" />
      </div>

      {/* Stat 2: High Risk Population */}
      <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Population at Immediate Risk</span>
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-amber-500" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400 tracking-tight font-mono">
              {totalPopulationAtImmediateRisk.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">people</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Across top {immediateVillages.length} critical zones
          </p>
        </div>
      </div>

      {/* Stat 3: Highest Hazard Epicenter */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Highest Hazard Zone</span>
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-100 truncate max-w-[150px]">
              {highestPriorityVillage?.name || "N/A"}
            </span>
            <span className="text-xs font-bold text-red-400 font-mono">
              {highestPriorityVillage?.priority_score} pts
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {highestPriorityVillage?.top_factors?.[0]?.factor?.replace('_', ' ') || "Landslide & Slope"} risk
          </p>
        </div>
      </div>

      {/* Stat 4: Relocation Sites Available */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Available Safe Capacity</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Home className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400 tracking-tight font-mono">
              {totalSafeCapacity.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">resettlement slots</span>
          </div>
          <p className="text-[11px] text-emerald-400/80 mt-1 font-medium">
            {sites.length} validated safe destination zones
          </p>
        </div>
      </div>
    </div>
  );
}
