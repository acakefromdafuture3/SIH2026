(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/main.jsx
  var import_react11 = __toESM(__require("react"), 1);
  var import_client = __toESM(__require("react-dom/client"), 1);

  // src/App.jsx
  var import_react10 = __toESM(__require("react"), 1);

  // src/components/Navbar.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_lucide_react = __require("lucide-react");
  function Navbar({
    selectedDistrict,
    setSelectedDistrict,
    onOpenWeights,
    onRefresh,
    dataSource,
    loading,
    immediateCount
  }) {
    return /* @__PURE__ */ import_react.default.createElement("header", { className: "glass-panel border-b border-slate-800/80 sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-red-600 to-amber-600 p-[1.5px] shadow-lg shadow-rose-500/25 flex items-center justify-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ShieldAlert, { className: "w-5 h-5 text-rose-500" }))), /* @__PURE__ */ import_react.default.createElement("span", { className: "absolute -top-1 -right-1 flex h-3 w-3" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-rose-500" }))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-base lg:text-lg font-black text-white tracking-wider flex items-center gap-2 font-mono" }, "RESQ", /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30" }, "Geo-Command")), immediateCount > 0 && /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 font-semibold animate-pulse" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500" }), immediateCount, " Critical Red Zones")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-400 flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement("span", null, "Himalayan & Brahmaputra Disaster Relocation Support"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-600 hidden sm:inline" }, "\u2022"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-emerald-400/90 font-mono text-[11px] hidden sm:inline flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Radio, { className: "w-3 h-3 animate-pulse inline" }), " LIVE TELEMETRY")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 shadow-inner" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MapPin, { className: "w-3.5 h-3.5 text-rose-400 mr-1.5" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-500 mr-1" }, "Sector:"), /* @__PURE__ */ import_react.default.createElement(
      "select",
      {
        value: selectedDistrict,
        onChange: (e) => setSelectedDistrict(e.target.value),
        "aria-label": "Filter by District",
        className: "bg-transparent border-none outline-none text-slate-200 font-semibold cursor-pointer pr-1"
      },
      /* @__PURE__ */ import_react.default.createElement("option", { value: "All", className: "bg-slate-900 text-white" }, "All India Sectors"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "Majuli", className: "bg-slate-900 text-white" }, "Majuli, Assam"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "Chamoli", className: "bg-slate-900 text-white" }, "Chamoli, Uttarakhand")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Database, { className: `w-3.5 h-3.5 ${dataSource === "live_firebase" ? "text-emerald-400" : "text-cyan-400"}` }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-500" }, "Engine:"), /* @__PURE__ */ import_react.default.createElement("span", { className: `font-mono font-semibold ${dataSource === "live_firebase" ? "text-emerald-400" : "text-cyan-400"}` }, dataSource === "live_firebase" ? "Firebase asia-south1" : "Geospatial ML Node")), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onOpenWeights,
        className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-700 hover:to-slate-800 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 hover:text-cyan-300 font-semibold transition-all shadow-md cursor-pointer"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Sliders, { className: "w-3.5 h-3.5 text-cyan-400" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "Policy Weights")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onRefresh,
        disabled: loading,
        className: "p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50 cursor-pointer shadow-md",
        title: "Refresh Telemetry Data"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}` })
    ))));
  }

  // src/components/StatsOverview.jsx
  var import_react2 = __toESM(__require("react"), 1);
  var import_lucide_react2 = __require("lucide-react");
  function StatsOverview({ villages, sites }) {
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
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-rose-500/30" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-rose-300" }, "Critical Red Zones"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center" }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.AlertOctagon, { className: "w-4 h-4 text-rose-400 animate-pulse" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-3xl font-black text-white font-mono tracking-tight" }, immediateVillages.length), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-xs text-rose-400 font-semibold" }, "Priority \u2265 71")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden" }, /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        className: "bg-gradient-to-r from-rose-600 to-red-500 h-full rounded-full transition-all duration-500",
        style: { width: `${immediateVillages.length / Math.max(villages.length, 1) * 100}%` }
      }
    )))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-amber-500/30" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-amber-300" }, "Pop. Exposed"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center" }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.Users, { className: "w-4 h-4 text-amber-400" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-3xl font-black text-amber-300 font-mono tracking-tight" }, totalPopulationAtImmediateRisk.toLocaleString()), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-xs text-slate-400" }, "citizens")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[11px] text-slate-400 mt-2 truncate" }, "Across top ", immediateVillages.length, " high-vulnerability sectors"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-orange-500/30" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-orange-300" }, "Peak Threat Epicenter"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center" }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.Flame, { className: "w-4 h-4 text-orange-400" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-baseline justify-between gap-1" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-base font-bold text-white truncate max-w-[140px]" }, highestPriorityVillage?.name || "N/A"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-xs font-black text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20" }, highestPriorityVillage?.priority_score, " pts")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[11px] text-slate-400 mt-2 truncate" }, "Primary driver: ", /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-medium capitalize" }, highestPriorityVillage?.top_factors?.[0]?.factor?.replace("_", " ") || "Inundation & Erosion")))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between border-emerald-500/30" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-emerald-300" }, "Safe Haven Capacity"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center" }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.ShieldCheck, { className: "w-4 h-4 text-emerald-400" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-3xl font-black text-emerald-300 font-mono tracking-tight" }, totalSafeCapacity.toLocaleString()), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-xs text-slate-400" }, "ready slots")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[11px] text-emerald-400/80 mt-2 font-medium" }, sites.length, " vetted highland havens available"))));
  }

  // src/components/VillageList.jsx
  var import_react3 = __toESM(__require("react"), 1);
  var import_lucide_react3 = __require("lucide-react");

  // src/constants/theme.js
  var PIN_COLORS = {
    Immediate: "#EF4444",
    // Red
    "Short-term": "#F97316",
    // Orange
    "Medium-term": "#EAB308",
    // Yellow
    Monitor: "#10B981"
    // Green
  };
  var PRIORITY_STYLES = {
    Immediate: {
      bg: "bg-red-500",
      text: "text-white",
      border: "border-red-500/40",
      glow: "ring-red-500/40",
      lightBg: "bg-red-500/10 text-red-300 border-red-500/30",
      badgeBg: "bg-red-500 text-white",
      color: "#EF4444"
    },
    "Short-term": {
      bg: "bg-orange-500",
      text: "text-white",
      border: "border-orange-500/40",
      glow: "ring-orange-500/40",
      lightBg: "bg-orange-500/10 text-orange-300 border-orange-500/30",
      badgeBg: "bg-orange-500 text-white",
      color: "#F97316"
    },
    "Medium-term": {
      bg: "bg-yellow-500",
      text: "text-black font-semibold",
      border: "border-yellow-500/40",
      glow: "ring-yellow-500/40",
      lightBg: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
      badgeBg: "bg-yellow-500 text-black font-bold",
      color: "#EAB308"
    },
    Monitor: {
      bg: "bg-emerald-500",
      text: "text-white",
      border: "border-emerald-500/40",
      glow: "ring-emerald-500/40",
      lightBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      badgeBg: "bg-emerald-500 text-white",
      color: "#10B981"
    }
  };

  // src/components/VillageList.jsx
  function VillageList({
    villages,
    selectedVillageId,
    onSelectVillage,
    selectedCategory,
    setSelectedCategory
  }) {
    const [searchQuery, setSearchQuery] = (0, import_react3.useState)("");
    const [sortBy, setSortBy] = (0, import_react3.useState)("priority_desc");
    const counts = (0, import_react3.useMemo)(() => {
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
    const filteredAndSortedVillages = (0, import_react3.useMemo)(() => {
      let result = villages.filter((v) => {
        const matchesCategory = selectedCategory === "All" || v.priority_category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = v.name?.toLowerCase().includes(searchQuery.toLowerCase()) || v.district?.toLowerCase().includes(searchQuery.toLowerCase());
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
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "glass-panel rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-3.5 sm:p-4 border-b border-slate-800/80 space-y-3 bg-slate-950/40" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react3.ShieldAlert, { className: "w-4 h-4 text-rose-500" }), /* @__PURE__ */ import_react3.default.createElement("h2", { className: "text-sm font-bold text-white tracking-wide uppercase" }, "Priority Ranking Matrix")), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700" }, filteredAndSortedVillages.length, " Sectors")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react3.Search, { className: "w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search village by name or sector...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: "w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
      }
    ), searchQuery && /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setSearchQuery(""),
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
      },
      "\u2715"
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none" }, categories.map((cat) => {
      const isActive = selectedCategory === cat.key;
      return /* @__PURE__ */ import_react3.default.createElement(
        "button",
        {
          key: cat.key,
          onClick: () => setSelectedCategory(cat.key),
          className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive ? "bg-slate-800 text-white shadow-sm border border-slate-700 ring-1 ring-cyan-400/40" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`
        },
        /* @__PURE__ */ import_react3.default.createElement("span", { className: `w-2 h-2 rounded-full ${cat.dotColor}` }),
        /* @__PURE__ */ import_react3.default.createElement("span", null, cat.label),
        /* @__PURE__ */ import_react3.default.createElement("span", { className: `text-[10px] font-mono px-1 rounded ${isActive ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800/80 text-slate-400"}` }, cat.count)
      );
    }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2" }, filteredAndSortedVillages.length === 0 ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-8 text-center text-xs text-slate-500 space-y-2" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react3.AlertTriangle, { className: "w-6 h-6 text-slate-600 mx-auto" }), /* @__PURE__ */ import_react3.default.createElement("p", null, "No villages found matching your criteria")) : filteredAndSortedVillages.map((village) => {
      const isSelected = selectedVillageId === village.id;
      const style = PRIORITY_STYLES[village.priority_category] || PRIORITY_STYLES.Monitor;
      return /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          key: village.id,
          onClick: () => onSelectVillage(village.id),
          className: `group relative rounded-xl p-3 cursor-pointer transition-all duration-200 border ${isSelected ? "bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40" : "bg-slate-900/50 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700"}`
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            className: "absolute left-0 top-2 bottom-2 w-1 rounded-r-full",
            style: { backgroundColor: style.color }
          }
        ),
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "pl-2.5 flex items-start justify-between gap-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react3.default.createElement("h4", { className: `text-xs sm:text-sm font-bold truncate transition-colors ${isSelected ? "text-cyan-300" : "text-white group-hover:text-slate-100"}` }, village.name), /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            className: `text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${style.lightBg}`
          },
          village.priority_category
        )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-3 mt-1.5 text-[11px] text-slate-400" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react3.Users, { className: "w-3 h-3 text-slate-500" }), village.population?.toLocaleString(), " pop."), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react3.Flame, { className: "w-3 h-3 text-orange-400" }), "Hazard: ", /* @__PURE__ */ import_react3.default.createElement("strong", { className: "text-slate-300" }, village.hazard_score)))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-col items-end flex-shrink-0" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-baseline gap-0.5" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-sm font-black font-mono", style: { color: style.color } }, Math.round(village.priority_score)), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[9px] text-slate-500" }, "/100")), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[9px] text-slate-500 uppercase tracking-tight" }, "Score")))
      );
    })));
  }

  // src/components/MapView.jsx
  var import_react5 = __toESM(__require("react"), 1);
  var import_react_leaflet2 = __require("react-leaflet");
  var import_leaflet2 = __toESM(__require("leaflet"), 1);
  var import_lucide_react4 = __require("lucide-react");

  // src/components/MapPins.jsx
  var import_react4 = __toESM(__require("react"), 1);
  var import_react_leaflet = __require("react-leaflet");
  var import_leaflet = __toESM(__require("leaflet"), 1);
  var import_functions2 = __require("firebase/functions");

  // src/firebase.js
  var import_app = __require("firebase/app");
  var import_firestore = __require("firebase/firestore");
  var import_functions = __require("firebase/functions");
  var import_meta = {};
  var firebaseConfig = {
    apiKey: import_meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyDFjququvz4BVYq9PS6e5sWkpv5oY58Yhw",
    authDomain: import_meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "sih2026-4b480.firebaseapp.com",
    projectId: import_meta.env?.VITE_FIREBASE_PROJECT_ID || "sih2026-4b480",
    storageBucket: import_meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "sih2026-4b480.firebasestorage.app",
    messagingSenderId: import_meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "896652024753",
    appId: import_meta.env?.VITE_FIREBASE_APP_ID || "1:896652024753:web:61062c4540f1b918b2bb90"
  };
  var app = (0, import_app.getApps)().length === 0 ? (0, import_app.initializeApp)(firebaseConfig) : (0, import_app.getApp)();
  var db = (0, import_firestore.getFirestore)(app);
  var functions = (0, import_functions.getFunctions)(app, "asia-south1");
  async function fetchVillages(district, priorityCategory) {
    const getVillagesFn = (0, import_functions.httpsCallable)(functions, "getVillages");
    const result = await getVillagesFn({
      district: district || void 0,
      priority_category: priorityCategory || void 0
    });
    return result.data;
  }
  async function fetchVillageDetail(villageId) {
    const getVillageDetailFn = (0, import_functions.httpsCallable)(functions, "getVillageDetail");
    const result = await getVillageDetailFn({ villageId });
    return result.data.village;
  }
  async function fetchSiteMatches(villageId) {
    const getSiteMatchesFn = (0, import_functions.httpsCallable)(functions, "getSiteMatches");
    const result = await getSiteMatchesFn({ villageId });
    return result.data;
  }
  async function updateScoringWeights(newPriorityWeights, newSiteWeights) {
    const updateWeightsFn = (0, import_functions.httpsCallable)(functions, "updateWeights");
    const result = await updateWeightsFn({
      priority: newPriorityWeights,
      site_ranking: newSiteWeights
    });
    return result.data;
  }

  // src/data/mockChamoliData.js
  var DEFAULT_WEIGHTS = {
    priority: {
      hazard: 0.35,
      exposure: 0.25,
      vulnerability: 0.2,
      history: 0.2
    },
    site_ranking: {
      safety: 0.35,
      capacity: 0.2,
      infrastructure: 0.15,
      accessibility: 0.1,
      water: 0.1,
      distance: 0.1
    }
  };
  var MOCK_RELOCATION_SITES = [
    {
      id: "mock-site-majuli-01",
      name: "Jengraimukh Safe Highland Resettlement Campus",
      district: "Majuli",
      state: "Assam",
      lat: 27.12,
      lng: 94.41,
      capacity: 3800,
      current_occupancy: 420,
      safety_score: 88,
      water_source: "Deep Tube Wells & Central Treatment Plant",
      road_connectivity: "Paved District Arterial Highway",
      hospital_distance_km: 1.8,
      school_distance_km: 0.8,
      hazard_risk_level: "Very Low",
      terrain_type: "Elevated High-Plinth Embankment (>3m above flood datum)",
      elevation_m: 94
    },
    {
      id: "mock-site-majuli-02",
      name: "Rawanapar Elevated Relief Campus",
      district: "Majuli",
      state: "Assam",
      lat: 26.968,
      lng: 94.225,
      capacity: 4e3,
      current_occupancy: 380,
      safety_score: 86,
      water_source: "Protected Groundwater Reservoir",
      road_connectivity: "All-weather Concrete Connector",
      hospital_distance_km: 2.5,
      school_distance_km: 1,
      hazard_risk_level: "Very Low",
      terrain_type: "Natural Stable Island Ridge",
      elevation_m: 91
    },
    {
      id: "mock-site-majuli-03",
      name: "Kamalabari Safe Corridor Terminal",
      district: "Majuli",
      state: "Assam",
      lat: 26.885,
      lng: 94.135,
      capacity: 3600,
      current_occupancy: 480,
      safety_score: 86,
      water_source: "Sub-surface Aquifer & Purifier Tanks",
      road_connectivity: "Major Ghat Approach Corridor",
      hospital_distance_km: 3.2,
      school_distance_km: 1.2,
      hazard_risk_level: "Very Low",
      terrain_type: "Reinforced Spur Terrace",
      elevation_m: 90
    },
    {
      id: "mock-site-majuli-04",
      name: "Dakhinpat Highland Resettlement Center",
      district: "Majuli",
      state: "Assam",
      lat: 26.875,
      lng: 94.255,
      capacity: 3800,
      current_occupancy: 350,
      safety_score: 88,
      water_source: "Multi-stage Filtration Storage Tanks",
      road_connectivity: "Satra Paved Bypass Link",
      hospital_distance_km: 2.1,
      school_distance_km: 0.9,
      hazard_risk_level: "Very Low",
      terrain_type: "High-Plinth Satra Plateau",
      elevation_m: 92
    }
  ];
  var MOCK_VILLAGES = [
    {
      id: "mock-village-majuli-01",
      name: "Mock Salmora Riverfront",
      district: "Majuli",
      state: "Assam",
      lat: 26.872,
      lng: 94.312,
      population: 2350,
      elderly_pct: 22,
      road_access: "poor",
      hazard_score: 93,
      hazard_factors: {
        slope: 82,
        rainfall: 95,
        landslide_history: 96,
        elevation: 90
      },
      exposure_score: 90,
      vulnerability_score: 92,
      history_score: 95,
      priority_score: 92.45,
      priority_category: "Immediate",
      top_factors: [
        { factor: "landslide_history", contribution: 96 },
        { factor: "rainfall", contribution: 95 },
        { factor: "elevation", contribution: 90 }
      ],
      recommended_site_id: "mock-site-majuli-01"
    },
    {
      id: "mock-village-majuli-02",
      name: "Mock Kamalabari Lowland",
      district: "Majuli",
      state: "Assam",
      lat: 26.915,
      lng: 94.168,
      population: 1950,
      elderly_pct: 19.5,
      road_access: "poor",
      hazard_score: 88,
      hazard_factors: {
        slope: 80,
        rainfall: 91,
        landslide_history: 92,
        elevation: 86
      },
      exposure_score: 85,
      vulnerability_score: 87,
      history_score: 89,
      priority_score: 87.25,
      priority_category: "Immediate",
      top_factors: [
        { factor: "landslide_history", contribution: 92 },
        { factor: "rainfall", contribution: 91 },
        { factor: "elevation", contribution: 86 }
      ],
      recommended_site_id: "mock-site-majuli-03"
    },
    {
      id: "mock-village-majuli-03",
      name: "Mock Garmur Wetland Border",
      district: "Majuli",
      state: "Assam",
      lat: 27.012,
      lng: 94.238,
      population: 1600,
      elderly_pct: 16,
      road_access: "moderate",
      hazard_score: 72,
      hazard_factors: {
        slope: 72,
        rainfall: 74,
        landslide_history: 76,
        elevation: 70
      },
      exposure_score: 69,
      vulnerability_score: 73,
      history_score: 71,
      priority_score: 71.25,
      priority_category: "Immediate",
      top_factors: [
        { factor: "landslide_history", contribution: 76 },
        { factor: "rainfall", contribution: 74 },
        { factor: "vulnerability", contribution: 73 }
      ],
      recommended_site_id: "mock-site-majuli-01"
    },
    {
      id: "mock-village-majuli-04",
      name: "Mock Bongaon Embankment Flank",
      district: "Majuli",
      state: "Assam",
      lat: 26.985,
      lng: 94.345,
      population: 2150,
      elderly_pct: 15,
      road_access: "moderate",
      hazard_score: 67,
      hazard_factors: {
        slope: 68,
        rainfall: 67,
        landslide_history: 70,
        elevation: 64
      },
      exposure_score: 72,
      vulnerability_score: 66,
      history_score: 64,
      priority_score: 67.45,
      priority_category: "Short-term",
      top_factors: [
        { factor: "exposure", contribution: 72 },
        { factor: "landslide_history", contribution: 70 },
        { factor: "slope", contribution: 68 }
      ],
      recommended_site_id: "mock-site-majuli-02"
    },
    {
      id: "mock-village-majuli-05",
      name: "Mock Jengraimukh Basin",
      district: "Majuli",
      state: "Assam",
      lat: 27.085,
      lng: 94.372,
      population: 1100,
      elderly_pct: 11.5,
      road_access: "moderate",
      hazard_score: 49,
      hazard_factors: {
        slope: 50,
        rainfall: 48,
        landslide_history: 47,
        elevation: 49
      },
      exposure_score: 51,
      vulnerability_score: 47,
      history_score: 45,
      priority_score: 48.3,
      priority_category: "Medium-term",
      top_factors: [
        { factor: "exposure", contribution: 51 },
        { factor: "slope", contribution: 50 },
        { factor: "elevation", contribution: 49 }
      ],
      recommended_site_id: "mock-site-majuli-01"
    },
    {
      id: "mock-village-majuli-06",
      name: "Mock Rawanapar Terrace",
      district: "Majuli",
      state: "Assam",
      lat: 26.964,
      lng: 94.221,
      population: 1500,
      elderly_pct: 10.5,
      road_access: "good",
      hazard_score: 41,
      hazard_factors: {
        slope: 42,
        rainfall: 41,
        landslide_history: 40,
        elevation: 43
      },
      exposure_score: 44,
      vulnerability_score: 39,
      history_score: 41,
      priority_score: 41.35,
      priority_category: "Medium-term",
      top_factors: [
        { factor: "exposure", contribution: 44 },
        { factor: "elevation", contribution: 43 },
        { factor: "slope", contribution: 42 }
      ],
      recommended_site_id: "mock-site-majuli-02"
    },
    {
      id: "mock-village-majuli-07",
      name: "Mock Ahotguri Inland Plain",
      district: "Majuli",
      state: "Assam",
      lat: 26.932,
      lng: 94.075,
      population: 890,
      elderly_pct: 8,
      road_access: "good",
      hazard_score: 24,
      hazard_factors: {
        slope: 25,
        rainfall: 27,
        landslide_history: 22,
        elevation: 28
      },
      exposure_score: 25,
      vulnerability_score: 23,
      history_score: 21,
      priority_score: 23.45,
      priority_category: "Monitor",
      top_factors: [
        { factor: "elevation", contribution: 28 },
        { factor: "rainfall", contribution: 27 },
        { factor: "slope", contribution: 25 }
      ],
      recommended_site_id: "mock-site-majuli-03"
    },
    {
      id: "mock-village-majuli-08",
      name: "Mock Dakhinpat Ridge",
      district: "Majuli",
      state: "Assam",
      lat: 26.891,
      lng: 94.262,
      population: 620,
      elderly_pct: 6.5,
      road_access: "good",
      hazard_score: 17,
      hazard_factors: {
        slope: 16,
        rainfall: 19,
        landslide_history: 17,
        elevation: 18
      },
      exposure_score: 19,
      vulnerability_score: 16,
      history_score: 14,
      priority_score: 16.7,
      priority_category: "Monitor",
      top_factors: [
        { factor: "rainfall", contribution: 19 },
        { factor: "exposure", contribution: 19 },
        { factor: "elevation", contribution: 18 }
      ],
      recommended_site_id: "mock-site-majuli-02"
    }
  ];
  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }
  function getMockMatchesForVillage(villageId, siteWeights = DEFAULT_WEIGHTS.site_ranking) {
    const village = MOCK_VILLAGES.find((v) => v.id === villageId) || MOCK_VILLAGES[0];
    return {
      village_id: village.id,
      matches: MOCK_RELOCATION_SITES.map((site) => {
        const distance_km = calculateDistanceKm(village.lat, village.lng, site.lat, site.lng);
        const safetyScore = site.safety_score;
        const capacityScore = Math.min(100, Math.round(site.capacity / Math.max(village.population, 1e3) * 50));
        const infrastructureScore = 100;
        const accessibilityScore = 100;
        const waterScore = 100;
        const distanceScore = Math.max(0, Math.round(100 - distance_km * 2.5));
        const criteriaBreakdown = {
          safety: {
            score: safetyScore,
            weight: siteWeights.safety,
            weighted: parseFloat((safetyScore * siteWeights.safety).toFixed(1))
          },
          capacity: {
            score: capacityScore,
            weight: siteWeights.capacity,
            weighted: parseFloat((capacityScore * siteWeights.capacity).toFixed(1))
          },
          infrastructure: {
            score: infrastructureScore,
            weight: siteWeights.infrastructure,
            weighted: parseFloat((infrastructureScore * siteWeights.infrastructure).toFixed(1))
          },
          accessibility: {
            score: accessibilityScore,
            weight: siteWeights.accessibility,
            weighted: parseFloat((accessibilityScore * siteWeights.accessibility).toFixed(1))
          },
          water: {
            score: waterScore,
            weight: siteWeights.water,
            weighted: parseFloat((waterScore * siteWeights.water).toFixed(1))
          },
          distance: {
            score: distanceScore,
            weight: siteWeights.distance,
            weighted: parseFloat((distanceScore * siteWeights.distance).toFixed(1))
          }
        };
        const suitability_score = parseFloat(
          Object.values(criteriaBreakdown).reduce((acc, curr) => acc + curr.weighted, 0).toFixed(1)
        );
        return {
          site_id: site.id,
          site_name: site.name,
          site_details: site,
          distance_km,
          suitability_score,
          criteria_breakdown: criteriaBreakdown
        };
      }).sort((a, b) => b.suitability_score - a.suitability_score)
    };
  }

  // src/services/api.js
  var currentVillages = [...MOCK_VILLAGES];
  var currentWeights = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS));
  var ApiService = {
    /**
     * Fetch list of villages with optional district and priority_category filtering
     */
    async getVillages(district, priorityCategory) {
      try {
        const response = await fetchVillages(district, priorityCategory);
        if (response && response.villages) {
          return {
            source: "live_firebase",
            count: response.count || response.villages.length,
            villages: response.villages
          };
        }
      } catch (err) {
        console.warn("Live Firebase getVillages unavailable, using local Chamoli data.", err.message);
      }
      let filtered = [...currentVillages];
      if (district && district !== "All") {
        filtered = filtered.filter(
          (v) => v.district.toLowerCase() === district.toLowerCase()
        );
      }
      if (priorityCategory && priorityCategory !== "All") {
        filtered = filtered.filter(
          (v) => v.priority_category.toLowerCase() === priorityCategory.toLowerCase()
        );
      }
      filtered.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
      return {
        source: "local_dataset",
        count: filtered.length,
        villages: filtered
      };
    },
    /**
     * Fetch full village detail
     */
    async getVillageDetail(villageId) {
      try {
        const village2 = await fetchVillageDetail(villageId);
        if (village2) {
          return {
            source: "live_firebase",
            village: village2
          };
        }
      } catch (err) {
        console.warn("Live Firebase getVillageDetail unavailable, using local Chamoli data.", err.message);
      }
      const village = currentVillages.find((v) => v.id === villageId) || currentVillages[0];
      return {
        source: "local_dataset",
        village
      };
    },
    /**
     * Fetch relocation site matches for a village
     */
    async getSiteMatches(villageId) {
      try {
        const response = await fetchSiteMatches(villageId);
        if (response && response.matches) {
          return {
            source: "live_firebase",
            ...response
          };
        }
      } catch (err) {
        console.warn("Live Firebase getSiteMatches unavailable, computing local matches.", err.message);
      }
      const matchData = getMockMatchesForVillage(villageId, currentWeights.site_ranking);
      return {
        source: "local_dataset",
        ...matchData
      };
    },
    /**
     * Update weights and recalculate priority scores
     */
    async updateWeights(newPriorityWeights, newSiteWeights) {
      try {
        const response = await updateScoringWeights(newPriorityWeights, newSiteWeights);
        if (response && response.new_weights) {
          return {
            source: "live_firebase",
            ...response
          };
        }
      } catch (err) {
        console.warn("Live Firebase updateWeights unavailable, recomputing locally.", err.message);
      }
      if (newPriorityWeights) {
        currentWeights.priority = { ...currentWeights.priority, ...newPriorityWeights };
      }
      if (newSiteWeights) {
        currentWeights.site_ranking = { ...currentWeights.site_ranking, ...newSiteWeights };
      }
      currentVillages = currentVillages.map((v) => {
        const pw = currentWeights.priority;
        const hazardPart = (v.hazard_score || 50) * pw.hazard;
        const exposurePart = (v.exposure_score || 50) * pw.exposure;
        const vulnPart = (v.vulnerability_score || 50) * pw.vulnerability;
        const histPart = (v.history_score || 50) * pw.history;
        const priority_score = parseFloat((hazardPart + exposurePart + vulnPart + histPart).toFixed(2));
        let priority_category = "Monitor";
        if (priority_score >= 71) priority_category = "Immediate";
        else if (priority_score >= 51) priority_category = "Short-term";
        else if (priority_score >= 31) priority_category = "Medium-term";
        return {
          ...v,
          priority_score,
          priority_category
        };
      });
      return {
        source: "local_dataset",
        message: `Weights updated and priority recomputed for ${currentVillages.length} villages.`,
        new_weights: currentWeights,
        villages_recomputed: currentVillages.length
      };
    },
    /**
     * Get all relocation sites
     */
    getRelocationSites() {
      return MOCK_RELOCATION_SITES;
    },
    /**
     * Get current weights configuration
     */
    getWeights() {
      return currentWeights;
    }
  };

  // src/components/MapPins.jsx
  function createCircularPinIcon(priorityCategory, score, isSelected) {
    const color = PIN_COLORS[priorityCategory] || "#10B981";
    const isImmediate = priorityCategory === "Immediate";
    const size = isSelected ? 44 : 34;
    const radius = size / 2;
    const displayScore = score !== void 0 && score !== null ? Math.round(score) : "";
    const svgHtml = `
    <div class="relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 select-none cursor-pointer group">
      ${isImmediate || isSelected ? `
          <span class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style="background-color: ${color}; width: ${size + 14}px; height: ${size + 14}px; animation-duration: 1.8s;"></span>
          <span class="absolute inline-flex rounded-full opacity-30" style="background-color: ${color}; width: ${size + 8}px; height: ${size + 8}px;"></span>
          ` : ""}
      
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
          stroke="${isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.85)"}" 
          stroke-width="${isSelected ? "6" : "4"}" 
        />
        
        <!-- Inner Contrast Ring -->
        <circle 
          cx="50" 
          cy="50" 
          r="34" 
          fill="${isSelected ? "#0f172a" : "#1e293b"}" 
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
    return import_leaflet.default.divIcon({
      className: "custom-circular-svg-pin",
      html: svgHtml,
      iconSize: [size, size],
      iconAnchor: [radius, radius]
    });
  }
  function MapPins({
    villages: propVillages,
    selectedVillageId,
    onSelectVillage,
    district,
    priorityCategory
  }) {
    const [villages, setVillages] = (0, import_react4.useState)(propVillages || []);
    const [loading, setLoading] = (0, import_react4.useState)(!propVillages);
    (0, import_react4.useEffect)(() => {
      if (propVillages && propVillages.length > 0) {
        setVillages(propVillages);
        return;
      }
      let isMounted = true;
      async function loadFirebaseVillages() {
        setLoading(true);
        try {
          const getVillagesFn = (0, import_functions2.httpsCallable)(functions, "getVillages");
          const result = await getVillagesFn({
            district: district || void 0,
            priority_category: priorityCategory || void 0
          });
          if (isMounted && result?.data?.villages) {
            setVillages(result.data.villages);
          }
        } catch (err) {
          console.warn("Firebase getVillages onCall fallback:", err.message);
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
    return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, villages.map((village) => {
      if (!village.lat || !village.lng) return null;
      const isSelected = selectedVillageId === village.id;
      const icon = createCircularPinIcon(
        village.priority_category,
        village.priority_score,
        isSelected
      );
      const categoryColor = PIN_COLORS[village.priority_category] || "#10B981";
      return /* @__PURE__ */ import_react4.default.createElement(
        import_react_leaflet.Marker,
        {
          key: `pin-${village.id}`,
          position: [village.lat, village.lng],
          icon,
          eventHandlers: {
            click: () => {
              if (onSelectVillage) {
                onSelectVillage(village.id);
              }
            }
          }
        },
        /* @__PURE__ */ import_react4.default.createElement(import_react_leaflet.Popup, { className: "custom-popup" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "p-3.5 space-y-2 min-w-[220px]" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 pr-6" }, /* @__PURE__ */ import_react4.default.createElement("h4", { className: "font-bold text-sm text-white truncate max-w-[125px]" }, village.name), /* @__PURE__ */ import_react4.default.createElement(
          "span",
          {
            className: "text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white shadow-sm flex-shrink-0",
            style: { backgroundColor: categoryColor }
          },
          village.priority_category
        )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs text-slate-300" }, /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-slate-400 block text-[10px]" }, "Priority Score"), /* @__PURE__ */ import_react4.default.createElement("strong", { className: "text-rose-400 font-mono text-sm" }, village.priority_score)), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-slate-400 block text-[10px]" }, "Hazard Score"), /* @__PURE__ */ import_react4.default.createElement("strong", { className: "text-amber-400 font-mono text-sm" }, village.hazard_score ?? "N/A")), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-slate-400 block text-[10px]" }, "Population"), /* @__PURE__ */ import_react4.default.createElement("span", null, village.population?.toLocaleString() ?? "N/A")), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-slate-400 block text-[10px]" }, "Elderly"), /* @__PURE__ */ import_react4.default.createElement("span", null, village.elderly_pct ? `${village.elderly_pct}%` : "N/A"))), onSelectVillage && /* @__PURE__ */ import_react4.default.createElement(
          "button",
          {
            onClick: () => onSelectVillage(village.id),
            className: "w-full mt-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold transition-colors shadow"
          },
          "Select & Match Sites"
        )))
      );
    }));
  }

  // src/components/MapView.jsx
  function MapResizer({ isExpanded }) {
    const map = (0, import_react_leaflet2.useMap)();
    (0, import_react5.useEffect)(() => {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 200);
      return () => clearTimeout(timer);
    }, [isExpanded, map]);
    return null;
  }
  function MapController({ center, zoom }) {
    const map = (0, import_react_leaflet2.useMap)();
    (0, import_react5.useEffect)(() => {
      if (center && center[0] && center[1]) {
        map.flyTo(center, zoom, {
          duration: 1.2,
          easeLinearity: 0.25
        });
      }
    }, [center, zoom, map]);
    return null;
  }
  function createBlueShieldIcon(isTopMatch) {
    const size = isTopMatch ? 40 : 32;
    const html = `
    <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110">
      ${isTopMatch ? `<div class="absolute w-12 h-12 rounded-full pulse-immediate opacity-80" style="background-color: #2563eb50;"></div>` : ""}
      <div 
        class="flex items-center justify-center rounded-xl bg-blue-600 border-2 ${isTopMatch ? "border-cyan-300 ring-2 ring-cyan-400/60 shadow-cyan-500/50" : "border-blue-200 shadow-blue-500/40"} text-white shadow-xl"
        style="width: ${size}px; height: ${size}px;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="${isTopMatch ? 20 : 16}" height="${isTopMatch ? 20 : 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>
      </div>
    </div>
  `;
    return import_leaflet2.default.divIcon({
      className: "custom-blue-shield-marker",
      html,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }
  function MapView({
    villages,
    sites,
    selectedVillage,
    onSelectVillage,
    siteMatches = []
  }) {
    const [mapStyle, setMapStyle] = (0, import_react5.useState)("voyager");
    const [showSites, setShowSites] = (0, import_react5.useState)(true);
    const [showConnections, setShowConnections] = (0, import_react5.useState)(true);
    const [showLandslideHeatmap, setShowLandslideHeatmap] = (0, import_react5.useState)(true);
    const [showRainfallContours, setShowRainfallContours] = (0, import_react5.useState)(true);
    const [isExpanded, setIsExpanded] = (0, import_react5.useState)(false);
    (0, import_react5.useEffect)(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape" && isExpanded) {
          setIsExpanded(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isExpanded]);
    const defaultCenter = [26.95, 94.2];
    const mapCenter = selectedVillage ? [selectedVillage.lat, selectedVillage.lng] : defaultCenter;
    const INDIA_BOUNDS = [
      [6, 68],
      // Southwest coordinates (Kanyakumari / Arabian Sea)
      [37.5, 97.5]
      // Northeast coordinates (Kashmir / Arunachal Pradesh)
    ];
    const tileLayers = {
      voyager: {
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      },
      positron: {
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      },
      dark: {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      },
      satellite: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "&copy; Esri &mdash; Earthstar Geographics"
      },
      osm: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    };
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
          [26.91, 94.4]
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
          [27, 94.42]
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
          [26.95, 94.3],
          [26.93, 94.38]
        ]
      }
    ];
    return /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        className: `transition-all duration-300 ${isExpanded ? "fixed inset-2 sm:inset-4 z-[500] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 flex flex-col" : "relative w-full h-full rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950"}`
      },
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute top-3 left-3 right-3 z-[30] flex flex-wrap items-center justify-between gap-2 pointer-events-none" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex flex-wrap items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 shadow-md" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-slate-300" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.Layers, { className: "w-3.5 h-3.5 text-rose-400" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-500" }, "Basemap:"), /* @__PURE__ */ import_react5.default.createElement(
        "select",
        {
          value: mapStyle,
          onChange: (e) => setMapStyle(e.target.value),
          "aria-label": "Map Basemap Style",
          className: "bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 outline-none cursor-pointer"
        },
        /* @__PURE__ */ import_react5.default.createElement("option", { value: "voyager" }, "CartoDB Voyager (Topography)"),
        /* @__PURE__ */ import_react5.default.createElement("option", { value: "positron" }, "CartoDB Positron (Light)"),
        /* @__PURE__ */ import_react5.default.createElement("option", { value: "dark" }, "CartoDB Dark Matter"),
        /* @__PURE__ */ import_react5.default.createElement("option", { value: "satellite" }, "Satellite Imagery"),
        /* @__PURE__ */ import_react5.default.createElement("option", { value: "osm" }, "Street Map (OSM)")
      )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-4 w-px bg-slate-700 mx-1 hidden sm:block" }), /* @__PURE__ */ import_react5.default.createElement("label", { className: "flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none" }, /* @__PURE__ */ import_react5.default.createElement(
        "input",
        {
          type: "checkbox",
          checked: showLandslideHeatmap,
          onChange: (e) => setShowLandslideHeatmap(e.target.checked),
          className: "rounded bg-slate-950 border-slate-700 text-rose-500 focus:ring-0 w-3.5 h-3.5"
        }
      ), /* @__PURE__ */ import_react5.default.createElement("span", { className: "flex items-center gap-1 text-rose-400 font-medium" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.Flame, { className: "w-3.5 h-3.5" }), " Hazard Heatmap")), /* @__PURE__ */ import_react5.default.createElement("label", { className: "flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none" }, /* @__PURE__ */ import_react5.default.createElement(
        "input",
        {
          type: "checkbox",
          checked: showRainfallContours,
          onChange: (e) => setShowRainfallContours(e.target.checked),
          className: "rounded bg-slate-950 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5"
        }
      ), /* @__PURE__ */ import_react5.default.createElement("span", { className: "flex items-center gap-1 text-sky-400 font-medium" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.CloudRain, { className: "w-3.5 h-3.5" }), " Rain Contours")), /* @__PURE__ */ import_react5.default.createElement("label", { className: "flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none" }, /* @__PURE__ */ import_react5.default.createElement(
        "input",
        {
          type: "checkbox",
          checked: showSites,
          onChange: (e) => setShowSites(e.target.checked),
          className: "rounded bg-slate-950 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5"
        }
      ), /* @__PURE__ */ import_react5.default.createElement("span", { className: "flex items-center gap-1 text-blue-400 font-medium" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.ShieldCheck, { className: "w-3.5 h-3.5" }), " Sites (", sites.length, ")")), selectedVillage && /* @__PURE__ */ import_react5.default.createElement("label", { className: "flex items-center gap-1 text-xs text-slate-300 cursor-pointer select-none" }, /* @__PURE__ */ import_react5.default.createElement(
        "input",
        {
          type: "checkbox",
          checked: showConnections,
          onChange: (e) => setShowConnections(e.target.checked),
          className: "rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
        }
      ), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-cyan-300 font-medium" }, "Vector"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "pointer-events-auto flex items-center gap-2" }, /* @__PURE__ */ import_react5.default.createElement(
        "button",
        {
          onClick: () => setIsExpanded(!isExpanded),
          className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 active:bg-slate-700 backdrop-blur-md border border-slate-700 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-lg cursor-pointer",
          title: isExpanded ? "Minimize Map (Esc)" : "Expand Map View"
        },
        isExpanded ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.Minimize2, { className: "w-4 h-4 text-cyan-400" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Minimize Map")) : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.Maximize2, { className: "w-4 h-4 text-cyan-400" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Expand Map"))
      ))),
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute bottom-4 left-3 z-[30] bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs shadow-lg space-y-1.5 pointer-events-auto" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1" }, "India GIS & Priority"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200" }, "Immediate (\u226571)")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200" }, "Short-term (\u226551)")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200" }, "Medium (\u226531)")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200" }, "Monitor (<31)"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "pt-1.5 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 text-blue-400" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-md bg-blue-600 border border-blue-300" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Safe Resettlement Zone")), showRainfallContours && /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 text-sky-400" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-3 h-0.5 border-t-2 border-dashed border-sky-400" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Monsoon Isohyet Contours")), showLandslideHeatmap && /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 text-rose-400" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500/40 border border-rose-500" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Hazard Heat Buffer")))),
      /* @__PURE__ */ import_react5.default.createElement(
        import_react_leaflet2.MapContainer,
        {
          center: defaultCenter,
          zoom: 10,
          minZoom: 5,
          maxZoom: 18,
          maxBounds: INDIA_BOUNDS,
          maxBoundsViscosity: 1,
          scrollWheelZoom: true,
          zoomControl: false,
          className: "w-full h-full"
        },
        /* @__PURE__ */ import_react5.default.createElement(import_react_leaflet2.ZoomControl, { position: "bottomright" }),
        /* @__PURE__ */ import_react5.default.createElement(MapResizer, { isExpanded }),
        /* @__PURE__ */ import_react5.default.createElement(
          import_react_leaflet2.TileLayer,
          {
            url: tileLayers[mapStyle].url,
            attribution: tileLayers[mapStyle].attribution,
            bounds: INDIA_BOUNDS
          }
        ),
        /* @__PURE__ */ import_react5.default.createElement(
          MapController,
          {
            center: selectedVillage ? [selectedVillage.lat, selectedVillage.lng] : defaultCenter,
            zoom: selectedVillage ? 11 : 10
          }
        ),
        showRainfallContours && rainfallContours.map((contour) => /* @__PURE__ */ import_react5.default.createElement(
          import_react_leaflet2.Polyline,
          {
            key: contour.id,
            positions: contour.positions,
            pathOptions: {
              color: contour.color,
              weight: contour.weight,
              dashArray: contour.dashArray,
              opacity: 0.85
            }
          },
          /* @__PURE__ */ import_react5.default.createElement(import_react_leaflet2.Tooltip, { direction: "top", className: "custom-distance-tooltip" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-semibold text-[11px] text-sky-200" }, "\u{1F327}\uFE0F ", contour.label))
        )),
        showLandslideHeatmap && villages.map((village) => {
          if (!village.lat || !village.lng) return null;
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
          return /* @__PURE__ */ import_react5.default.createElement(
            import_react_leaflet2.Circle,
            {
              key: `heat-${village.id}`,
              center: [village.lat, village.lng],
              radius,
              pathOptions: {
                color,
                fillColor: color,
                fillOpacity,
                weight: 1,
                dashArray: "3, 6",
                opacity: 0.45
              }
            }
          );
        }),
        /* @__PURE__ */ import_react5.default.createElement(
          MapPins,
          {
            villages,
            selectedVillageId: selectedVillage?.id,
            onSelectVillage
          }
        ),
        showSites && sites.map((site) => {
          const isTopMatched = siteMatches.length > 0 && siteMatches[0]?.site_id === site.id;
          const matchInfo = siteMatches.find((m) => m.site_id === site.id);
          return /* @__PURE__ */ import_react5.default.createElement(
            import_react_leaflet2.Marker,
            {
              key: site.id,
              position: [site.lat, site.lng],
              icon: createBlueShieldIcon(isTopMatched)
            },
            /* @__PURE__ */ import_react5.default.createElement(import_react_leaflet2.Popup, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "p-3.5 space-y-2 min-w-[220px]" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center justify-between gap-1.5 border-b border-slate-700 pb-1.5 pr-6" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.ShieldCheck, { className: "w-4 h-4 text-blue-400" }), " Resettlement Zone"), matchInfo && /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold flex-shrink-0" }, matchInfo.suitability_score, "% Match")), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "font-bold text-sm text-white" }, site.name), /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-1 text-xs text-slate-300" }, matchInfo && /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between text-cyan-300 font-medium" }, /* @__PURE__ */ import_react5.default.createElement("span", null, "Distance:"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-mono font-bold" }, matchInfo.distance_km, " km")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-400" }, "Total Capacity:"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-semibold text-emerald-400" }, site.capacity.toLocaleString(), " persons")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-400" }, "Safety Score:"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-semibold text-white" }, site.safety_score, " / 100")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-400" }, "Water Supply:"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200 text-right truncate max-w-[120px]" }, site.water_source)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-400" }, "Road Connectivity:"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-slate-200 text-right truncate max-w-[120px]" }, site.road_connectivity)))))
          );
        }),
        selectedVillage && showConnections && siteMatches.length > 0 && (() => {
          const topMatch = siteMatches[0];
          const topSite = sites.find((s) => s.id === topMatch?.site_id);
          if (!topSite) return null;
          return /* @__PURE__ */ import_react5.default.createElement(
            import_react_leaflet2.Polyline,
            {
              key: `top-vector-${selectedVillage.id}-${topSite.id}`,
              positions: [
                [selectedVillage.lat, selectedVillage.lng],
                [topSite.lat, topSite.lng]
              ],
              pathOptions: {
                color: "#06B6D4",
                weight: 3.5,
                dashArray: "8, 10",
                opacity: 0.95
              }
            },
            /* @__PURE__ */ import_react5.default.createElement(
              import_react_leaflet2.Tooltip,
              {
                permanent: true,
                direction: "center",
                className: "custom-distance-tooltip"
              },
              /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300 whitespace-nowrap drop-shadow" }, /* @__PURE__ */ import_react5.default.createElement("span", null, "\u{1F4CD} ", typeof topMatch.distance_km === "number" ? topMatch.distance_km.toFixed(1) : topMatch.distance_km, " km"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-emerald-400 font-semibold" }, "(", typeof topMatch.suitability_score === "number" ? topMatch.suitability_score.toFixed(1) : topMatch.suitability_score, "% Match)"))
            )
          );
        })()
      )
    );
  }

  // src/components/VillageDetail.jsx
  var import_react7 = __toESM(__require("react"), 1);
  var import_lucide_react6 = __require("lucide-react");

  // src/components/SiteMatchList.jsx
  var import_react6 = __toESM(__require("react"), 1);
  var import_lucide_react5 = __require("lucide-react");
  function SiteMatchList({ matches = [], villageName, loading }) {
    const [expandedSiteId, setExpandedSiteId] = (0, import_react6.useState)(matches[0]?.site_id || null);
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
      return /* @__PURE__ */ import_react6.default.createElement("div", { className: "py-12 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "font-medium tracking-wide" }, "Evaluating multi-criteria relocation algorithm & terrain safety..."));
    }
    if (!matches || matches.length === 0) {
      return /* @__PURE__ */ import_react6.default.createElement("div", { className: "glass-panel rounded-2xl p-12 text-center text-xs text-slate-500 space-y-2" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.Shield, { className: "w-8 h-8 text-slate-700 mx-auto" }), /* @__PURE__ */ import_react6.default.createElement("p", null, "No candidate relocation sites found for this sector."));
    }
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "glass-panel rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h4", { className: "text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.ShieldCheck, { className: "w-4 h-4 text-cyan-400" }), "Highland Safe Havens & Resettlement Match"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-xs text-slate-400 mt-0.5" }, "Algorithmic priority suitability ranked for ", /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-slate-200" }, villageName))), /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full self-start" }, matches.length, " Certified Safe Zones")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-3" }, matches.map((match, idx) => {
      const isTopRanked = idx === 0;
      const isExpanded = expandedSiteId === match.site_id;
      const breakdown = match.criteria_breakdown || {};
      const scoreClass = getScoreColor(match.suitability_score);
      return /* @__PURE__ */ import_react6.default.createElement(
        "div",
        {
          key: match.site_id,
          className: `rounded-2xl border transition-all duration-200 overflow-hidden ${isTopRanked ? "bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/30" : "bg-slate-950/60 border-slate-800 hover:border-slate-700"}`
        },
        /* @__PURE__ */ import_react6.default.createElement(
          "div",
          {
            onClick: () => toggleExpand(match.site_id),
            className: "p-3.5 sm:p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
          },
          /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-3 min-w-0" }, /* @__PURE__ */ import_react6.default.createElement(
            "div",
            {
              className: `w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center flex-shrink-0 shadow-md ${isTopRanked ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950" : "bg-slate-800 text-slate-300 border border-slate-700"}`
            },
            "#",
            idx + 1
          ), /* @__PURE__ */ import_react6.default.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react6.default.createElement("h5", { className: "text-sm font-bold text-white truncate" }, match.site_name), isTopRanked && /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" }, "Top Match")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-4 text-xs text-slate-400 mt-1" }, /* @__PURE__ */ import_react6.default.createElement("span", null, "Vector: ", /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-cyan-300 font-mono font-bold" }, match.distance_km, " km")), match.site_details?.capacity && /* @__PURE__ */ import_react6.default.createElement("span", null, "Capacity: ", /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-slate-200 font-mono" }, match.site_details.capacity.toLocaleString(), " persons"))))),
          /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-3 flex-shrink-0" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: `px-3 py-1.5 rounded-xl border text-xs font-mono font-black ${scoreClass}` }, match.suitability_score, "% Match"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "p-1 rounded-lg text-slate-400 hover:text-white" }, isExpanded ? /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.ChevronDown, { className: "w-4 h-4" })))
        ),
        isExpanded && /* @__PURE__ */ import_react6.default.createElement("div", { className: "px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/70 space-y-3 animate-fadeIn text-xs" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block" }, "Suitability Matrix Factors"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center justify-between text-slate-400 mb-1" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.Navigation, { className: "w-3 h-3 text-cyan-400" }), " Proximity"), /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-white font-mono" }, breakdown.proximity || 0, "%")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "w-full bg-slate-800 h-1 rounded-full" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-cyan-500 h-full rounded-full", style: { width: `${breakdown.proximity || 0}%` } }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center justify-between text-slate-400 mb-1" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.Droplet, { className: "w-3 h-3 text-blue-400" }), " Elevation"), /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-white font-mono" }, breakdown.water || 0, "%")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "w-full bg-slate-800 h-1 rounded-full" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-blue-500 h-full rounded-full", style: { width: `${breakdown.water || 0}%` } }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center justify-between text-slate-400 mb-1" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.Building2, { className: "w-3 h-3 text-emerald-400" }), " Capacity"), /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-white font-mono" }, breakdown.capacity || 0, "%")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "w-full bg-slate-800 h-1 rounded-full" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-emerald-500 h-full rounded-full", style: { width: `${breakdown.capacity || 0}%` } }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center justify-between text-slate-400 mb-1" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react5.Truck, { className: "w-3 h-3 text-amber-400" }), " Road Link"), /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-white font-mono" }, breakdown.road || 0, "%")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "w-full bg-slate-800 h-1 rounded-full" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bg-amber-500 h-full rounded-full", style: { width: `${breakdown.road || 0}%` } })))), match.site_details && /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-3 text-[11px] text-slate-400 pt-1" }, /* @__PURE__ */ import_react6.default.createElement("span", null, "Coordinates: ", /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-slate-300 font-mono" }, match.site_details.lat, "\xB0N, ", match.site_details.lng, "\xB0E")), /* @__PURE__ */ import_react6.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react6.default.createElement("span", null, "Elevation: ", /* @__PURE__ */ import_react6.default.createElement("strong", { className: "text-emerald-400 font-mono" }, match.site_details.elevation || 86, "m"))))
      );
    })));
  }

  // src/components/VillageDetail.jsx
  function VillageDetail({
    village,
    siteMatches,
    loadingMatches,
    onOpenDrawer
  }) {
    if (!village) {
      return /* @__PURE__ */ import_react7.default.createElement("div", { className: "glass-panel rounded-2xl p-12 text-center text-slate-500 h-full flex flex-col items-center justify-center space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Compass, { className: "w-8 h-8 text-cyan-400 animate-spin", style: { animationDuration: "8s" } })), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-sm font-bold text-slate-300" }, "Select a sector from the Priority Matrix"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-slate-500 max-w-sm" }, "Examine multi-factor flood/erosion diagnostics, demographic vulnerability metrics, and algorithmic resettlement matches."));
    }
    const priorityStyle = PRIORITY_STYLES[village.priority_category] || PRIORITY_STYLES.Monitor;
    const factors = village.hazard_factors || {};
    return /* @__PURE__ */ import_react7.default.createElement("div", { className: "glass-panel rounded-2xl p-4 sm:p-6 space-y-5 overflow-y-auto h-full shadow-2xl" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: `text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${priorityStyle.badgeBg}` }, village.priority_category, " Priority"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "Sector ID: ", village.id)), /* @__PURE__ */ import_react7.default.createElement("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight" }, village.name), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-400" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.MapPin, { className: "w-3.5 h-3.5 text-rose-400" }), /* @__PURE__ */ import_react7.default.createElement("span", null, village.district, ", ", village.state), /* @__PURE__ */ import_react7.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-mono text-cyan-300" }, village.lat?.toFixed(4), "\xB0 N, ", village.lng?.toFixed(4), "\xB0 E"))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 px-4 flex-shrink-0 self-start" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[10px] uppercase tracking-wider text-slate-400 block font-semibold" }, "Priority Index"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-2xl font-black font-mono", style: { color: priorityStyle.color } }, village.priority_score)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { backgroundColor: `${priorityStyle.color}15`, border: `1px solid ${priorityStyle.color}40` } }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Flame, { className: "w-5 h-5", style: { color: priorityStyle.color } })))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-3 gap-2.5 mt-4 text-xs" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2.5" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-500 block text-[10px] uppercase font-semibold" }, "Population"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-bold text-white font-mono text-sm" }, village.population?.toLocaleString())), /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2.5" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-500 block text-[10px] uppercase font-semibold" }, "Elderly Ratio"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-bold text-amber-400 font-mono text-sm" }, village.elderly_pct, "%")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2.5" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-500 block text-[10px] uppercase font-semibold" }, "Evacuation Road"), /* @__PURE__ */ import_react7.default.createElement("span", { className: `font-bold capitalize text-sm ${village.road_access === "poor" ? "text-red-400" : "text-emerald-400"}` }, village.road_access || "moderate"))), onOpenDrawer && /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        onClick: onOpenDrawer,
        className: "w-full mt-3.5 py-2 px-3 bg-gradient-to-r from-slate-850 to-slate-800 hover:from-slate-800 hover:to-slate-750 text-cyan-300 hover:text-white rounded-xl border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
      },
      /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.PanelRightOpen, { className: "w-3.5 h-3.5 text-cyan-400" }),
      /* @__PURE__ */ import_react7.default.createElement("span", null, "Open Comprehensive Explainability Drawer")
    )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Activity, { className: "w-3.5 h-3.5 text-rose-400" }), "Multi-Pillar Composite Risk Distribution"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px] text-slate-400 mb-1.5" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Hazard (35%)"), /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-rose-400 font-mono" }, village.hazard_score || 0)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "bg-rose-500 h-full rounded-full",
        style: { width: `${Math.min(100, village.hazard_score || 0)}%` }
      }
    ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px] text-slate-400 mb-1.5" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Exposure (25%)"), /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-orange-400 font-mono" }, village.exposure_score || 0)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "bg-orange-500 h-full rounded-full",
        style: { width: `${Math.min(100, village.exposure_score || 0)}%` }
      }
    ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px] text-slate-400 mb-1.5" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "Vulnerability (20%)"), /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-yellow-400 font-mono" }, village.vulnerability_score || 0)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "bg-yellow-500 h-full rounded-full",
        style: { width: `${Math.min(100, village.vulnerability_score || 0)}%` }
      }
    ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px] text-slate-400 mb-1.5" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "History (20%)"), /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-indigo-400 font-mono" }, village.history_score || 0)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "bg-indigo-500 h-full rounded-full",
        style: { width: `${Math.min(100, village.history_score || 0)}%` }
      }
    ))))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Mountain, { className: "w-3.5 h-3.5 text-amber-400" }), "Geospatial & Hydro-Geological Hazard Diagnostics"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px]" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-400" }, "Riverbank Erosion & Slope"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-mono text-slate-200 font-bold" }, factors.slope || 0, " / 100")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-amber-500 h-full rounded-full", style: { width: `${factors.slope || 0}%` } }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px]" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-400" }, "Monsoon Rainfall & Flood Surge"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-mono text-slate-200 font-bold" }, factors.rainfall || 0, " / 100")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-blue-500 h-full rounded-full", style: { width: `${factors.rainfall || 0}%` } }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px]" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-400" }, "Historical Embankment Breach Frequency"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-mono text-slate-200 font-bold" }, factors.landslide_history || 0, " / 100")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-rose-500 h-full rounded-full", style: { width: `${factors.landslide_history || 0}%` } }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-between text-[11px]" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-slate-400" }, "Lowland Inundation Vulnerability"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "font-mono text-slate-200 font-bold" }, factors.elevation || 0, " / 100")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-purple-500 h-full rounded-full", style: { width: `${factors.elevation || 0}%` } })))), village.top_factors && village.top_factors.length > 0 && /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2 flex-wrap pt-1" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] text-slate-400 font-semibold uppercase" }, "Top Risk Drivers:"), village.top_factors.map((tf, i) => /* @__PURE__ */ import_react7.default.createElement(
      "span",
      {
        key: i,
        className: "text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium"
      },
      tf.factor.replace("_", " "),
      ": ",
      /* @__PURE__ */ import_react7.default.createElement("strong", { className: "font-mono" }, tf.contribution, "%")
    )))));
  }

  // src/components/VillageDrawer.jsx
  var import_react8 = __toESM(__require("react"), 1);
  var import_lucide_react7 = __require("lucide-react");
  function ScoreGauge({ score, categoryColor }) {
    const normalizedScore = Math.min(100, Math.max(0, score || 0));
    const radius = 58;
    const strokeWidth = 10;
    const fullCircumference = 2 * Math.PI * radius;
    const arcLength = fullCircumference * 0.75;
    const strokeDashoffset = arcLength - arcLength * normalizedScore / 100;
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "relative flex flex-col items-center justify-center" }, /* @__PURE__ */ import_react8.default.createElement("svg", { width: "150", height: "150", className: "transform -rotate-[135deg]" }, /* @__PURE__ */ import_react8.default.createElement(
      "circle",
      {
        cx: "75",
        cy: "75",
        r: radius,
        fill: "none",
        stroke: "rgba(51, 65, 85, 0.4)",
        strokeWidth,
        strokeDasharray: `${arcLength} ${fullCircumference}`,
        strokeLinecap: "round"
      }
    ), /* @__PURE__ */ import_react8.default.createElement(
      "circle",
      {
        cx: "75",
        cy: "75",
        r: radius,
        fill: "none",
        stroke: categoryColor,
        strokeWidth,
        strokeDasharray: `${arcLength} ${fullCircumference}`,
        strokeDashoffset,
        strokeLinecap: "round",
        className: "transition-all duration-1000 ease-out",
        style: {
          filter: `drop-shadow(0 0 8px ${categoryColor}80)`
        }
      }
    )), /* @__PURE__ */ import_react8.default.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-3xl font-black font-mono tracking-tight text-white" }, typeof score === "number" ? score.toFixed(1) : score || 0), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider" }, "out of 100")));
  }
  function VillageDrawer({
    isOpen,
    onClose,
    village,
    siteMatches = [],
    loadingMatches = false
  }) {
    if (!village) return null;
    const categoryColor = PIN_COLORS[village.priority_category] || "#10B981";
    const formatFactorLabel = (factorKey) => {
      const labels = {
        landslide_history: "Landslide History & Frequency",
        rainfall: "Monsoon Rainfall Saturation",
        slope: "Steep Slope Gradient",
        elevation: "High Altitude / Elevation Risk",
        exposure: "Population Exposure Density",
        vulnerability: "Socio-Demographic Vulnerability"
      };
      return labels[factorKey] || factorKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };
    const getFactorIcon = (factorKey) => {
      switch (factorKey) {
        case "landslide_history":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Flame, { className: "w-3.5 h-3.5 text-rose-400" });
        case "rainfall":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Droplets, { className: "w-3.5 h-3.5 text-blue-400" });
        case "slope":
        case "elevation":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Mountain, { className: "w-3.5 h-3.5 text-amber-400" });
        default:
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Activity, { className: "w-3.5 h-3.5 text-slate-400" });
      }
    };
    const topThreeFactors = (village.top_factors || [
      { factor: "landslide_history", contribution: village.hazard_factors?.landslide_history || 90 },
      { factor: "rainfall", contribution: village.hazard_factors?.rainfall || 85 },
      { factor: "slope", contribution: village.hazard_factors?.slope || 80 }
    ]).slice(0, 3);
    const topSite = siteMatches[0];
    return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, isOpen && /* @__PURE__ */ import_react8.default.createElement(
      "div",
      {
        onClick: onClose,
        className: "fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9980] lg:hidden transition-opacity"
      }
    ), /* @__PURE__ */ import_react8.default.createElement(
      "aside",
      {
        className: `fixed top-0 right-0 h-full w-full sm:w-[440px] md:w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-[9990] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`
      },
      /* @__PURE__ */ import_react8.default.createElement("div", { className: "p-4 sm:p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-slate-950/70" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, /* @__PURE__ */ import_react8.default.createElement(
        "span",
        {
          className: "text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded shadow-sm text-white",
          style: { backgroundColor: categoryColor }
        },
        village.priority_category,
        " Priority"
      ), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-xs font-mono text-slate-400" }, "ID: ", village.id)), /* @__PURE__ */ import_react8.default.createElement("h2", { className: "text-xl font-extrabold text-white mt-1.5 truncate" }, village.name), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-400 mt-1" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.MapPin, { className: "w-3.5 h-3.5 text-rose-400 flex-shrink-0" }), /* @__PURE__ */ import_react8.default.createElement("span", { className: "truncate" }, village.district, ", ", village.state), /* @__PURE__ */ import_react8.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono text-slate-300 text-[11px]" }, village.lat?.toFixed(4), "\xB0N, ", village.lng?.toFixed(4), "\xB0E"))), /* @__PURE__ */ import_react8.default.createElement(
        "button",
        {
          onClick: onClose,
          "aria-label": "Close Drawer",
          className: "p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors shadow-sm"
        },
        /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.X, { className: "w-5 h-5" })
      )),
      /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-center shadow-inner relative overflow-hidden" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-1" }, "Composite Relocation Priority Index"), /* @__PURE__ */ import_react8.default.createElement(
        ScoreGauge,
        {
          score: village.priority_score,
          categoryColor
        }
      ), /* @__PURE__ */ import_react8.default.createElement("div", { className: "w-full grid grid-cols-4 gap-1.5 mt-2 pt-3 border-t border-slate-800/80 text-center" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Hazard"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-rose-400 text-xs" }, village.hazard_score || "N/A")), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Exposure"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-orange-400 text-xs" }, village.exposure_score || "N/A")), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Vuln."), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-yellow-400 text-xs" }, village.vulnerability_score || "N/A")), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "History"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-indigo-400 text-xs" }, village.history_score || "N/A")))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react8.default.createElement("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Users, { className: "w-3.5 h-3.5 text-cyan-400" }), "Demographic & Evacuation Profile"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-3 gap-2.5" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800/80" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-400 block mb-0.5" }, "Total Population"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-base font-extrabold font-mono text-white" }, village.population?.toLocaleString()), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block mt-0.5" }, "Residents")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800/80" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-400 block mb-0.5" }, "Elderly (60+)"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-base font-extrabold font-mono text-amber-400" }, village.elderly_pct, "%"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block mt-0.5" }, "High fragility")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800/80" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-400 block mb-0.5" }, "Road Access"), /* @__PURE__ */ import_react8.default.createElement(
        "span",
        {
          className: `text-sm font-extrabold capitalize block ${village.road_access === "poor" ? "text-red-400" : village.road_access === "moderate" ? "text-yellow-400" : "text-emerald-400"}`
        },
        village.road_access || "Moderate"
      ), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-slate-500 block mt-0.5" }, "Evac route")))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react8.default.createElement("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.TrendingUp, { className: "w-3.5 h-3.5 text-rose-400" }), "AI Explainability: Top 3 Risk Drivers"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium" }, "ML Pipeline")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/90 space-y-3" }, topThreeFactors.map((item, index) => {
        const contribution = item.contribution || 0;
        let barColor = "bg-emerald-500";
        let textColor = "text-emerald-400";
        if (contribution >= 80) {
          barColor = "bg-rose-500";
          textColor = "text-rose-400";
        } else if (contribution >= 60) {
          barColor = "bg-orange-500";
          textColor = "text-orange-400";
        } else if (contribution >= 40) {
          barColor = "bg-amber-500";
          textColor = "text-amber-400";
        }
        return /* @__PURE__ */ import_react8.default.createElement("div", { key: index, className: "space-y-1.5" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-1.5 font-medium text-slate-200" }, getFactorIcon(item.factor), /* @__PURE__ */ import_react8.default.createElement("span", null, formatFactorLabel(item.factor))), /* @__PURE__ */ import_react8.default.createElement("span", { className: `font-mono font-bold ${textColor}` }, contribution, "% contribution")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5" }, /* @__PURE__ */ import_react8.default.createElement(
          "div",
          {
            className: `${barColor} h-full rounded-full transition-all duration-700 ease-out`,
            style: { width: `${Math.min(100, contribution)}%` }
          }
        )));
      }), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-start gap-1" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Info, { className: "w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ import_react8.default.createElement("span", null, "Prioritization algorithm computed this severity score driven primarily by", " ", /* @__PURE__ */ import_react8.default.createElement("strong", { className: "text-slate-200" }, formatFactorLabel(topThreeFactors[0]?.factor || "hazard")), ".")))), topSite && /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react8.default.createElement("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.Navigation, { className: "w-3.5 h-3.5 text-emerald-400" }), "Primary Relocation Target"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-2" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] text-emerald-400 font-semibold uppercase tracking-wider" }, "Rank #1 Destination"), /* @__PURE__ */ import_react8.default.createElement("h4", { className: "text-sm font-bold text-white mt-0.5" }, topSite.site_name)), /* @__PURE__ */ import_react8.default.createElement("span", { className: "px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold" }, topSite.suitability_score, "% Fit")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-slate-500 block" }, "Straight Distance"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-slate-200" }, topSite.distance_km, " km")), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-slate-500 block" }, "Available Space"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono font-bold text-emerald-400" }, topSite.site_details?.capacity?.toLocaleString() || "N/A", " slots")))))),
      /* @__PURE__ */ import_react8.default.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2" }, /* @__PURE__ */ import_react8.default.createElement(
        "button",
        {
          onClick: onClose,
          className: "flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700 text-center"
        },
        "Close Panel"
      ), /* @__PURE__ */ import_react8.default.createElement(
        "button",
        {
          onClick: () => {
            alert(`Generated relocation action plan for ${village.name}. Exporting dossier...`);
          },
          className: "flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5"
        },
        /* @__PURE__ */ import_react8.default.createElement("span", null, "Action Dossier"),
        /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.ArrowRight, { className: "w-3.5 h-3.5" })
      ))
    ));
  }

  // src/components/WeightsModal.jsx
  var import_react9 = __toESM(__require("react"), 1);
  var import_lucide_react8 = __require("lucide-react");
  function WeightsModal({
    isOpen,
    onClose,
    initialWeights,
    onSaveWeights,
    saving
  }) {
    const [priorityWeights, setPriorityWeights] = (0, import_react9.useState)(
      initialWeights?.priority || DEFAULT_WEIGHTS.priority
    );
    const [siteWeights, setSiteWeights] = (0, import_react9.useState)(
      initialWeights?.site_ranking || DEFAULT_WEIGHTS.site_ranking
    );
    if (!isOpen) return null;
    const prioritySum = Math.round(
      Object.values(priorityWeights).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0) * 100
    );
    const siteSum = Math.round(
      Object.values(siteWeights).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0) * 100
    );
    const handlePriorityChange = (key, val) => {
      setPriorityWeights((prev) => ({
        ...prev,
        [key]: parseFloat((parseFloat(val) / 100).toFixed(2))
      }));
    };
    const handleSiteChange = (key, val) => {
      setSiteWeights((prev) => ({
        ...prev,
        [key]: parseFloat((parseFloat(val) / 100).toFixed(2))
      }));
    };
    const handleReset = () => {
      setPriorityWeights(DEFAULT_WEIGHTS.priority);
      setSiteWeights(DEFAULT_WEIGHTS.site_ranking);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSaveWeights(priorityWeights, siteWeights);
    };
    return /* @__PURE__ */ import_react9.default.createElement("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center" }, /* @__PURE__ */ import_react9.default.createElement(import_lucide_react8.Sliders, { className: "w-4 h-4 text-cyan-400" })), /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-base font-bold text-white" }, "Decision Matrix & Scoring Weights"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-xs text-slate-400" }, "Adjust multi-criteria formulation weights to simulate relocation policy scenarios."))), /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
      },
      /* @__PURE__ */ import_react9.default.createElement(import_lucide_react8.X, { className: "w-5 h-5" })
    )), /* @__PURE__ */ import_react9.default.createElement("div", { className: "p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react9.default.createElement("h4", { className: "font-bold text-slate-200 text-sm flex items-center gap-1.5" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "1. Village Risk Prioritization Formula")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-slate-400" }, "Total Sum:"), /* @__PURE__ */ import_react9.default.createElement(
      "span",
      {
        className: `font-mono font-bold px-2 py-0.5 rounded text-[11px] ${prioritySum === 100 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`
      },
      prioritySum,
      "% ",
      prioritySum === 100 ? "\u2713" : "\u2260 100%"
    ))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
      { key: "hazard", label: "Hazard Index (Slope, Rainfall, History)", color: "text-rose-400" },
      { key: "exposure", label: "Exposure (Population Density)", color: "text-orange-400" },
      { key: "vulnerability", label: "Vulnerability (Elderly & Road Access)", color: "text-yellow-400" },
      { key: "history", label: "Historical Disaster Record", color: "text-indigo-400" }
    ].map(({ key, label, color }) => /* @__PURE__ */ import_react9.default.createElement("div", { key, className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-slate-300 font-medium" }, label), /* @__PURE__ */ import_react9.default.createElement("span", { className: `font-mono font-bold ${color}` }, Math.round((priorityWeights[key] || 0) * 100), "%")), /* @__PURE__ */ import_react9.default.createElement(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        step: "5",
        value: Math.round((priorityWeights[key] || 0) * 100),
        onChange: (e) => handlePriorityChange(key, e.target.value),
        "aria-label": `Weight for ${label}`,
        className: "w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
      }
    ))))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-3 pt-4 border-t border-slate-800" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react9.default.createElement("h4", { className: "font-bold text-slate-200 text-sm flex items-center gap-1.5" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "2. Safe Resettlement Site Ranking Formula")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-slate-400" }, "Total Sum:"), /* @__PURE__ */ import_react9.default.createElement(
      "span",
      {
        className: `font-mono font-bold px-2 py-0.5 rounded text-[11px] ${siteSum === 100 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`
      },
      siteSum,
      "% ",
      siteSum === 100 ? "\u2713" : "\u2260 100%"
    ))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
      { key: "safety", label: "Safety & Hazard Buffer", color: "text-emerald-400" },
      { key: "capacity", label: "Resettlement Capacity", color: "text-cyan-400" },
      { key: "infrastructure", label: "Infrastructure & Hospital", color: "text-blue-400" },
      { key: "accessibility", label: "Road & Transport Access", color: "text-purple-400" },
      { key: "water", label: "Perennial Water Supply", color: "text-sky-400" },
      { key: "distance", label: "Proximity to Origin Village", color: "text-teal-400" }
    ].map(({ key, label, color }) => /* @__PURE__ */ import_react9.default.createElement("div", { key, className: "bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-slate-300 font-medium" }, label), /* @__PURE__ */ import_react9.default.createElement("span", { className: `font-mono font-bold ${color}` }, Math.round((siteWeights[key] || 0) * 100), "%")), /* @__PURE__ */ import_react9.default.createElement(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        step: "5",
        value: Math.round((siteWeights[key] || 0) * 100),
        onChange: (e) => handleSiteChange(key, e.target.value),
        "aria-label": `Weight for ${label}`,
        className: "w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
      }
    )))))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3" }, /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        onClick: handleReset,
        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
      },
      /* @__PURE__ */ import_react9.default.createElement(import_lucide_react8.RotateCcw, { className: "w-3.5 h-3.5" }),
      "Reset Defaults"
    ), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors"
      },
      "Cancel"
    ), /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        onClick: handleSubmit,
        disabled: saving,
        className: "flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 disabled:opacity-50"
      },
      /* @__PURE__ */ import_react9.default.createElement(import_lucide_react8.Sparkles, { className: "w-4 h-4" }),
      saving ? "Recomputing Scores..." : "Apply & Recalculate"
    )))));
  }

  // src/App.jsx
  var import_lucide_react9 = __require("lucide-react");
  function App() {
    const [villages, setVillages] = (0, import_react10.useState)([]);
    const [sites, setSites] = (0, import_react10.useState)([]);
    const [selectedVillageId, setSelectedVillageId] = (0, import_react10.useState)(null);
    const [selectedDistrict, setSelectedDistrict] = (0, import_react10.useState)("Majuli");
    const [selectedCategory, setSelectedCategory] = (0, import_react10.useState)("All");
    const [siteMatches, setSiteMatches] = (0, import_react10.useState)([]);
    const [loadingMatches, setLoadingMatches] = (0, import_react10.useState)(false);
    const [loadingVillages, setLoadingVillages] = (0, import_react10.useState)(true);
    const [dataSource, setDataSource] = (0, import_react10.useState)("local_dataset");
    const [isWeightsModalOpen, setIsWeightsModalOpen] = (0, import_react10.useState)(false);
    const [isDrawerOpen, setIsDrawerOpen] = (0, import_react10.useState)(false);
    const [savingWeights, setSavingWeights] = (0, import_react10.useState)(false);
    const [notification, setNotification] = (0, import_react10.useState)(null);
    const [errorState, setErrorState] = (0, import_react10.useState)(null);
    const [commandTab, setCommandTab] = (0, import_react10.useState)("map");
    const [mobileTab, setMobileTab] = (0, import_react10.useState)("map");
    (0, import_react10.useEffect)(() => {
      const loadedSites = ApiService.getRelocationSites();
      setSites(loadedSites);
    }, []);
    const loadVillages = (0, import_react10.useCallback)(async () => {
      setLoadingVillages(true);
      setErrorState(null);
      try {
        const data = await ApiService.getVillages(
          selectedDistrict === "All" ? void 0 : selectedDistrict,
          selectedCategory === "All" ? void 0 : selectedCategory
        );
        setVillages(data.villages || []);
        setDataSource(data.source);
        if (data.villages && data.villages.length > 0) {
          setSelectedVillageId((prev) => {
            const exists = data.villages.some((v) => v.id === prev);
            return exists ? prev : data.villages[0].id;
          });
        }
      } catch (err) {
        console.error("Error fetching villages:", err);
        setErrorState({
          message: "Failed to connect to Firebase Cloud Functions backend at asia-south1. Operating in offline resilient mode.",
          details: err.message
        });
      } finally {
        setLoadingVillages(false);
      }
    }, [selectedDistrict, selectedCategory]);
    (0, import_react10.useEffect)(() => {
      loadVillages();
    }, [loadVillages]);
    (0, import_react10.useEffect)(() => {
      if (!selectedVillageId) {
        setSiteMatches([]);
        return;
      }
      let isMounted = true;
      const fetchMatches = async () => {
        setLoadingMatches(true);
        try {
          const matches = await ApiService.getSiteMatches(selectedVillageId);
          if (isMounted) {
            setSiteMatches(matches || []);
          }
        } catch (err) {
          console.error("Error fetching site matches:", err);
        } finally {
          if (isMounted) {
            setLoadingMatches(false);
          }
        }
      };
      fetchMatches();
      return () => {
        isMounted = false;
      };
    }, [selectedVillageId]);
    const selectedVillage = villages.find((v) => v.id === selectedVillageId) || villages[0] || null;
    const handleSaveWeights = async (priorityWeights, siteWeights) => {
      setSavingWeights(true);
      try {
        const success = await ApiService.updateWeights(priorityWeights, siteWeights);
        if (success) {
          setNotification({
            type: "success",
            message: "Weights updated successfully. Recalculating live priorities..."
          });
          setIsWeightsModalOpen(false);
          await loadVillages();
          if (selectedVillageId) {
            const matches = await ApiService.getSiteMatches(selectedVillageId);
            setSiteMatches(matches || []);
          }
        }
      } catch (err) {
        console.error("Error updating weights:", err);
        setNotification({
          type: "error",
          message: "Failed to update weights. Please try again."
        });
      } finally {
        setSavingWeights(false);
      }
    };
    const handleSelectVillage = (id) => {
      setSelectedVillageId(id);
      if (window.innerWidth < 1024) {
        setMobileTab("detail");
      }
    };
    const immediateCount = villages.filter((v) => v.priority_category === "Immediate").length;
    const topMatch = siteMatches[0] || null;
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: "min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-rose-500 selection:text-white bg-grid-pattern" }, /* @__PURE__ */ import_react10.default.createElement(
      Navbar,
      {
        selectedDistrict,
        setSelectedDistrict,
        onOpenWeights: () => setIsWeightsModalOpen(true),
        onRefresh: loadVillages,
        dataSource,
        loading: loadingVillages,
        immediateCount
      }
    ), /* @__PURE__ */ import_react10.default.createElement("main", { className: "flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-6" }, errorState && /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-red-950/90 border border-red-500/50 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-red-200 shadow-2xl shadow-red-950/40 animate-fadeIn" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.AlertCircle, { className: "w-5 h-5 text-red-400" })), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("span", { className: "font-bold text-red-300 block text-xs uppercase tracking-wide" }, "Network Notice / Backend Status"), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-red-200/80 text-[11px]" }, errorState.message))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2 self-end sm:self-auto flex-shrink-0" }, /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => {
          setErrorState(null);
          loadVillages();
        },
        className: "flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow transition-colors text-xs cursor-pointer"
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.RefreshCw, { className: "w-3.5 h-3.5" }),
      "Retry Connection"
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setErrorState(null),
        className: "p-1.5 rounded-xl text-red-400 hover:text-white hover:bg-red-900/50 transition-colors",
        title: "Dismiss banner"
      },
      "\u2715"
    ))), notification && /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        className: `p-3.5 rounded-2xl flex items-center justify-between text-xs transition-all border shadow-xl ${notification.type === "success" ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300" : "bg-red-950/80 border-red-500/40 text-red-300"}`
      },
      /* @__PURE__ */ import_react10.default.createElement("span", { className: "font-medium" }, notification.message),
      /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          onClick: () => setNotification(null),
          className: "text-slate-400 hover:text-white ml-2 text-sm font-bold p-1"
        },
        "\u2715"
      )
    ), loadingVillages && /* @__PURE__ */ import_react10.default.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-fadeIn select-none" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-16 h-16 rounded-full border-4 border-slate-800 border-t-rose-500 border-r-rose-500 animate-spin" }), /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        className: "w-10 h-10 rounded-full border-4 border-slate-800 border-b-cyan-400 border-l-cyan-400 animate-spin absolute",
        style: { animationDirection: "reverse", animationDuration: "1s" }
      }
    ), /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping absolute" })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center space-y-1.5" }, /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-base font-black text-white tracking-wider font-mono" }, "INITIALIZING RESQ GEOSPATIAL COMMAND"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-slate-400 max-w-sm" }, "Fetching multi-factor flood/erosion hazard indexes & priority matrices..."))), /* @__PURE__ */ import_react10.default.createElement(StatsOverview, { villages, sites }), /* @__PURE__ */ import_react10.default.createElement("div", { className: "lg:hidden flex bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 gap-1.5 shadow-lg" }, /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setMobileTab("map"),
        className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${mobileTab === "map" ? "bg-rose-600 text-white shadow-md shadow-rose-950/40" : "text-slate-400 hover:text-slate-200"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Map, { className: "w-3.5 h-3.5" }),
      "GIS Map"
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setMobileTab("list"),
        className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${mobileTab === "list" ? "bg-rose-600 text-white shadow-md shadow-rose-950/40" : "text-slate-400 hover:text-slate-200"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.List, { className: "w-3.5 h-3.5" }),
      "Rankings (",
      villages.length,
      ")"
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setMobileTab("detail"),
        className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${mobileTab === "detail" ? "bg-rose-600 text-white shadow-md shadow-rose-950/40" : "text-slate-400 hover:text-slate-200"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.FileText, { className: "w-3.5 h-3.5" }),
      "Diagnostics & Matches"
    )), /* @__PURE__ */ import_react10.default.createElement("div", { className: "hidden lg:grid grid-cols-12 gap-6 min-h-[660px]" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "col-span-4 h-[660px]" }, /* @__PURE__ */ import_react10.default.createElement(
      VillageList,
      {
        villages,
        selectedVillageId,
        onSelectVillage: handleSelectVillage,
        selectedCategory,
        setSelectedCategory
      }
    )), /* @__PURE__ */ import_react10.default.createElement("div", { className: "col-span-8 flex flex-col h-[660px] gap-3" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between glass-panel rounded-2xl p-1.5 px-2" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setCommandTab("map"),
        className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${commandTab === "map" ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-cyan-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Map, { className: "w-3.5 h-3.5 text-cyan-400" }),
      /* @__PURE__ */ import_react10.default.createElement("span", null, "Interactive GIS Map")
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setCommandTab("diagnostics"),
        className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${commandTab === "diagnostics" ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-rose-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Activity, { className: "w-3.5 h-3.5 text-rose-400" }),
      /* @__PURE__ */ import_react10.default.createElement("span", null, "Risk & AI Diagnostics")
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setCommandTab("havens"),
        className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${commandTab === "havens" ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-emerald-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
      /* @__PURE__ */ import_react10.default.createElement("span", null, "Relocation Safe Havens"),
      /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded" }, siteMatches.length)
    )), selectedVillage && /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2 pr-2 text-xs" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-500" }, "Active Focus:"), /* @__PURE__ */ import_react10.default.createElement("strong", { className: "text-cyan-300 font-semibold truncate max-w-[160px]" }, selectedVillage.name))), commandTab === "map" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex-1 relative rounded-2xl overflow-hidden h-full" }, /* @__PURE__ */ import_react10.default.createElement(
      MapView,
      {
        villages,
        sites,
        selectedVillage,
        onSelectVillage: handleSelectVillage,
        siteMatches
      }
    ), selectedVillage && /* @__PURE__ */ import_react10.default.createElement("div", { className: "absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-md z-[20] glass-panel rounded-2xl p-3 sm:p-3.5 border-slate-700 shadow-2xl space-y-2 pointer-events-auto animate-fadeIn" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2 min-w-0" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" }), /* @__PURE__ */ import_react10.default.createElement("h4", { className: "font-bold text-xs sm:text-sm text-white truncate" }, selectedVillage.name), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-[10px] font-mono text-slate-400" }, "(", selectedVillage.priority_category, ")")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-1 font-mono text-xs font-black text-rose-400 flex-shrink-0" }, /* @__PURE__ */ import_react10.default.createElement("span", null, selectedVillage.priority_score), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-[10px] text-slate-500" }, "pts"))), topMatch && /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-300" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "flex items-center gap-1 text-slate-400" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Navigation, { className: "w-3 h-3 text-cyan-400" }), " Top Haven:", /* @__PURE__ */ import_react10.default.createElement("strong", { className: "text-white truncate max-w-[140px]" }, topMatch.site_name)), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-cyan-300 font-mono font-bold" }, topMatch.distance_km, " km (", topMatch.suitability_score, "%)")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2 pt-1" }, /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setCommandTab("diagnostics"),
        className: "flex-1 py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-xl text-[11px] font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Activity, { className: "w-3 h-3" }),
      "Diagnostics"
    ), /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        onClick: () => setIsDrawerOpen(true),
        className: "py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer",
        title: "Open Full Explainability Dossier"
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.PanelRightOpen, { className: "w-3 h-3" }),
      "Dossier"
    )))), commandTab === "diagnostics" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex-1 overflow-y-auto h-full" }, /* @__PURE__ */ import_react10.default.createElement(
      VillageDetail,
      {
        village: selectedVillage,
        siteMatches,
        loadingMatches,
        onOpenDrawer: () => setIsDrawerOpen(true)
      }
    )), commandTab === "havens" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex-1 overflow-y-auto h-full" }, /* @__PURE__ */ import_react10.default.createElement(
      SiteMatchList,
      {
        matches: siteMatches,
        villageName: selectedVillage?.name || "Selected Village",
        loading: loadingMatches
      }
    )))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "lg:hidden flex-1 h-[580px]" }, mobileTab === "map" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "h-full relative rounded-2xl overflow-hidden" }, /* @__PURE__ */ import_react10.default.createElement(
      MapView,
      {
        villages,
        sites,
        selectedVillage,
        onSelectVillage: handleSelectVillage,
        siteMatches
      }
    )), mobileTab === "list" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "h-full" }, /* @__PURE__ */ import_react10.default.createElement(
      VillageList,
      {
        villages,
        selectedVillageId,
        onSelectVillage: handleSelectVillage,
        selectedCategory,
        setSelectedCategory
      }
    )), mobileTab === "detail" && /* @__PURE__ */ import_react10.default.createElement("div", { className: "h-full overflow-y-auto" }, /* @__PURE__ */ import_react10.default.createElement(
      VillageDetail,
      {
        village: selectedVillage,
        siteMatches,
        loadingMatches,
        onOpenDrawer: () => setIsDrawerOpen(true)
      }
    )))), /* @__PURE__ */ import_react10.default.createElement("footer", { className: "border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-4 text-center text-xs text-slate-500" }, /* @__PURE__ */ import_react10.default.createElement("p", null, "ResQ \u2014 Disaster Management & Algorithmic Resettlement Decision Support Engine")), /* @__PURE__ */ import_react10.default.createElement(
      VillageDrawer,
      {
        isOpen: isDrawerOpen,
        onClose: () => setIsDrawerOpen(false),
        village: selectedVillage,
        siteMatches,
        loadingMatches
      }
    ), /* @__PURE__ */ import_react10.default.createElement(
      WeightsModal,
      {
        isOpen: isWeightsModalOpen,
        onClose: () => setIsWeightsModalOpen(false),
        initialWeights: ApiService.getWeights(),
        onSaveWeights: handleSaveWeights,
        saving: savingWeights
      }
    ));
  }

  // src/main.jsx
  var ErrorBoundary = class extends import_react11.default.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, info: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, info) {
      console.error("ErrorBoundary caught an error", error, info);
      this.setState({ info });
    }
    render() {
      if (this.state.hasError) {
        return /* @__PURE__ */ import_react11.default.createElement("div", { style: { padding: 20, color: "white", background: "red", zIndex: 9999, position: "relative" } }, /* @__PURE__ */ import_react11.default.createElement("h1", null, "Something went wrong."), /* @__PURE__ */ import_react11.default.createElement("pre", null, this.state.error && this.state.error.toString()), /* @__PURE__ */ import_react11.default.createElement("pre", null, this.state.info && this.state.info.componentStack));
      }
      return this.props.children;
    }
  };
  import_client.default.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ import_react11.default.createElement(import_react11.default.StrictMode, null, /* @__PURE__ */ import_react11.default.createElement(ErrorBoundary, null, /* @__PURE__ */ import_react11.default.createElement(App, null)))
  );
})();
