import React, { useState, useMemo } from "react";
import { Search, ArrowUpDown, Filter, ChevronRight, AlertTriangle, Users, Flame, ShieldAlert } from "lucide-react";
import { PRIORITY_STYLES } from "../constants/theme";
import { formatScore } from "../utils/priority";

export default function VillageList({
  villages,
  selectedVillageId,
  onSelectVillage,
  selectedCategory,
  setSelectedCategory
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("priority_desc");

  // Calculate category counts dynamically
  const counts = useMemo(() => {
    return {
      All: villages.length,
      Immediate: villages.filter((v) => v.priority_category === "Immediate").length,
      "Short-term": villages.filter((v) => v.priority_category === "Short-term").length,
      "Medium-term": villages.filter((v) => v.priority_category === "Medium-term").length,
      Monitor: villages.filter((v) => v.priority_category === "Monitor").length
    };
  }, [villages]);

  const categories = [
    { key: "All", label: "All", count: counts.All, dotColor: "bg-slate-400" },
    { key: "Immediate", label: "Immediate", count: counts.Immediate, dotColor: "bg-red-500" },
    { key: "Short-term", label: "Short-term", count: counts["Short-term"], dotColor: "bg-orange-500" },
    { key: "Medium-term", label: "Medium", count: counts["Medium-term"], dotColor: "bg-yellow-500" },
    { key: "Monitor", label: "Monitor", count: counts.Monitor, dotColor: "bg-emerald-500" }
  ];

  const filteredAndSortedVillages = useMemo(() => {
    let result = villages.filter((v) => {
      const matchesCategory =
        selectedCategory === "All" ||
        v.priority_category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.district?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      if (sortBy === "priority_desc") return (b.priority_score || 0) - (a.priority_score || 0);
      if (sortBy === "priority_asc") return (a.priority_score || 0) - (b.priority_score || 0);
      if (sortBy === "hazard_desc") return (b.hazard_score || 0) - (a.hazard_score || 0);
      if (sortBy === "population_desc") return (b.population || 0) - (a.population || 0);
      if (sortBy === "elderly_desc") return (b.elderly_pct || 0) - (a.elderly_pct || 0);
      return 0;
    });

    return result;
  }, [villages, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
      
      {/* Header & Search */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800/80 space-y-3 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">
              Priority Ranking Matrix
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700">
            {filteredAndSortedVillages.length} Sectors
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search village by name or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700 ring-1 ring-cyan-400/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cat.dotColor}`}></span>
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/80 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Village List Cards */}
      <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2">
        {filteredAndSortedVillages.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-2">
            <AlertTriangle className="w-6 h-6 text-slate-600 mx-auto" />
            <p>No villages found matching your criteria</p>
          </div>
        ) : (
          filteredAndSortedVillages.map((village) => {
            const isSelected = selectedVillageId === village.id;
            const style = PRIORITY_STYLES[village.priority_category] || PRIORITY_STYLES.Monitor;

            return (
              <div
                key={village.id}
                onClick={() => onSelectVillage(village.id)}
                className={`group relative rounded-xl p-3 cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? "bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40"
                    : "bg-slate-900/50 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                {/* Left Priority Color Bar */}
                <div
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                  style={{ backgroundColor: style.color }}
                />

                <div className="pl-2.5 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                        isSelected ? "text-cyan-300" : "text-white group-hover:text-slate-100"
                      }`}>
                        {village.name}
                      </h4>
                      <span
                        className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${style.lightBg}`}
                      >
                        {village.priority_category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        {village.population?.toLocaleString()} pop.
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        Hazard: <strong className="text-slate-300">{village.hazard_score}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Priority Score Gauge Badge */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-black font-mono" style={{ color: style.color }}>
                        {formatScore(village.priority_score)}
                      </span>
                      <span className="text-[9px] text-slate-500">/100</span>
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase tracking-tight">Score</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
