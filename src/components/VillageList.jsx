import React, { useState, useMemo } from "react";
import { Search, ArrowUpDown, Filter, ChevronRight, AlertTriangle, Users } from "lucide-react";

export const PRIORITY_STYLES = {
  Immediate: {
    bg: "bg-red-500",
    text: "text-white",
    border: "border-red-500/30",
    glow: "ring-red-500/40",
    lightBg: "bg-red-500/10 text-red-400 border-red-500/30",
    badgeBg: "bg-red-500 text-white",
    color: "#EF4444"
  },
  "Short-term": {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-500/30",
    glow: "ring-orange-500/40",
    lightBg: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    badgeBg: "bg-orange-500 text-white",
    color: "#F97316"
  },
  "Medium-term": {
    bg: "bg-yellow-500",
    text: "text-black font-semibold",
    border: "border-yellow-500/30",
    glow: "ring-yellow-500/40",
    lightBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    badgeBg: "bg-yellow-500 text-black font-bold",
    color: "#EAB308"
  },
  Monitor: {
    bg: "bg-emerald-500",
    text: "text-white",
    border: "border-emerald-500/30",
    glow: "ring-emerald-500/40",
    lightBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    badgeBg: "bg-emerald-500 text-white",
    color: "#10B981"
  }
};

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
    { key: "Medium-term", label: "Medium-term", count: counts["Medium-term"], dotColor: "bg-yellow-500" },
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden shadow-lg">
      
      {/* List Header & Search */}
      <div className="p-3.5 border-b border-slate-800 space-y-3 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Priority Ranking
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredAndSortedVillages.length} / {villages.length} Villages
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search village by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/60 transition-colors"
          />
        </div>

        {/* Category Filter Chips with Dynamic Counts */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.key
                  ? "bg-slate-800 text-white border-rose-500/60 shadow-sm ring-1 ring-rose-500/30"
                  : "bg-slate-950/70 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.dotColor}`}></span>
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                selectedCategory === cat.key ? "bg-rose-500/20 text-rose-300 font-bold" : "bg-slate-900 text-slate-400"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-1 text-[11px]">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <span>Sort By:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort Villages"
            className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300 outline-none cursor-pointer"
          >
            <option value="priority_desc">Priority (High to Low)</option>
            <option value="priority_asc">Priority (Low to High)</option>
            <option value="hazard_desc">Hazard Score</option>
            <option value="population_desc">Population</option>
            <option value="elderly_desc">Elderly %</option>
          </select>
        </div>
      </div>

      {/* Village List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1.5">
        {filteredAndSortedVillages.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            No villages match your current filters.
          </div>
        ) : (
          filteredAndSortedVillages.map((village, idx) => {
            const isSelected = village.id === selectedVillageId;
            const style = PRIORITY_STYLES[village.priority_category] || PRIORITY_STYLES.Monitor;

            return (
              <div
                key={village.id}
                onClick={() => onSelectVillage(village.id)}
                className={`group p-3 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-slate-800/90 border-slate-600 shadow-md ring-1 ring-rose-500/50"
                    : "bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  
                  {/* Village Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 font-bold">
                        #{idx + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-100 group-hover:text-rose-400 transition-colors truncate">
                        {village.name}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-0.5">
                        <Users className="w-3 h-3 text-slate-500" />
                        {village.population?.toLocaleString()} hab.
                      </span>
                      <span>•</span>
                      <span>Elderly: {village.elderly_pct}%</span>
                      <span>•</span>
                      <span className="capitalize">
                        Road: <strong className={village.road_access === "poor" ? "text-red-400 font-medium" : "text-slate-300 font-medium"}>{village.road_access}</strong>
                      </span>
                    </div>

                    {/* Top factors badges */}
                    {village.top_factors && village.top_factors.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {village.top_factors.slice(0, 2).map((tf, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            {tf.factor.replace('_', ' ')} ({tf.contribution}%)
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority Badge & Score Column */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">Score</span>
                      <span className="text-sm font-black font-mono text-slate-100">
                        {village.priority_score}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm ${style.badgeBg}`}
                    >
                      {village.priority_category}
                    </span>
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
