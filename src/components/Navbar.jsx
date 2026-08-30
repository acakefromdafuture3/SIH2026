import React from "react";
import { Sliders, RefreshCw, Database, MapPin, Activity, ShieldAlert, Radio } from "lucide-react";

export default function Navbar({
  selectedDistrict,
  setSelectedDistrict,
  onOpenWeights,
  onRefresh,
  dataSource,
  loading,
  immediateCount
}) {
  return (
    <header className="glass-panel border-b border-slate-800/80 sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Brand & System Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-red-600 to-amber-600 p-[1.5px] shadow-lg shadow-rose-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-base lg:text-lg font-black text-white tracking-wider flex items-center gap-2 font-mono">
                RESQ
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Geo-Command
                </span>
              </h1>
              {immediateCount > 0 && (
                <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 font-semibold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {immediateCount} Critical Red Zones
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Himalayan & Brahmaputra Disaster Relocation Support</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-emerald-400/90 font-mono text-[11px] hidden sm:inline flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse inline" /> LIVE TELEMETRY
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & District Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* District selector */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-rose-400 mr-1.5" />
            <span className="text-slate-500 mr-1">Sector:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter by District"
              className="bg-transparent border-none outline-none text-slate-200 font-semibold cursor-pointer pr-1"
            >
              <option value="All" className="bg-slate-900 text-white">All India Sectors</option>
              <option value="Majuli" className="bg-slate-900 text-white">Majuli, Assam</option>
              <option value="Chamoli" className="bg-slate-900 text-white">Chamoli, Uttarakhand</option>
            </select>
          </div>

          {/* Data source badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px]">
            <Database className={`w-3.5 h-3.5 ${dataSource === 'live_firebase' ? 'text-emerald-400' : 'text-cyan-400'}`} />
            <span className="text-slate-500">Engine:</span>
            <span className={`font-mono font-semibold ${dataSource === 'live_firebase' ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {dataSource === 'live_firebase' ? 'Firebase asia-south1' : 'Geospatial ML Node'}
            </span>
          </div>

          {/* Adjust weights button */}
          <button
            onClick={onOpenWeights}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-700 hover:to-slate-800 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 hover:text-cyan-300 font-semibold transition-all shadow-md cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Policy Weights</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50 cursor-pointer shadow-md"
            title="Refresh Telemetry Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
}
