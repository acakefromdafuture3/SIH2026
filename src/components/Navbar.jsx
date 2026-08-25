import React from "react";
import { Sliders, RefreshCw, Database, MapPin, Activity, ShieldAlert } from "lucide-react";

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
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Brand & System Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                ResQ
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                  Himalayan Region
                </span>
              </h1>
              {immediateCount > 0 && (
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-semibold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {immediateCount} Critical
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Disaster Risk Monitoring & Relocation Decision Support System
            </p>
          </div>
        </div>

        {/* Action Controls & District Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* District selector */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400 mr-1.5" />
            <span className="text-slate-500 mr-1">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter by District"
              className="bg-transparent border-none outline-none text-slate-200 font-semibold cursor-pointer pr-1"
            >
              <option value="All" className="bg-slate-900 text-white">All Districts</option>
              <option value="Chamoli" className="bg-slate-900 text-white">Chamoli, UK</option>
            </select>
          </div>

          {/* Data source badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
            <Database className={`w-3.5 h-3.5 ${dataSource === 'live_firebase' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-slate-400">Backend:</span>
            <span className={`font-mono font-medium ${dataSource === 'live_firebase' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {dataSource === 'live_firebase' ? 'asia-south1 (Live)' : 'Live Mode (Chamoli)'}
            </span>
          </div>

          {/* Adjust weights button */}
          <button
            onClick={onOpenWeights}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-xs text-slate-200 font-medium transition-all shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Policy Weights</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
}
