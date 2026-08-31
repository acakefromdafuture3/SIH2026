import React, { useState } from "react";
import { X, Sliders, CheckCircle2, RotateCcw, AlertTriangle, Sparkles } from "lucide-react";
import { DEFAULT_WEIGHTS } from "../data/mockChamoliData";

export default function WeightsModal({
  isOpen,
  onClose,
  initialWeights,
  onSaveWeights,
  saving
}) {
  const [priorityWeights, setPriorityWeights] = useState(
    initialWeights?.priority || DEFAULT_WEIGHTS.priority
  );
  const [siteWeights, setSiteWeights] = useState(
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

  // Backend requires each weight group to sum to exactly 1.0 — normalize before saving
  const normalize = (weights) => {
    const total = Object.values(weights).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
    if (!total) return weights;
    const entries = Object.entries(weights).map(([k, v]) => [k, (parseFloat(v) || 0) / total]);
    // Round to 2 decimals, then fix any residual drift on the largest weight so the sum is exactly 1.0
    const rounded = entries.map(([k, v]) => [k, parseFloat(v.toFixed(2))]);
    const drift = parseFloat((1 - rounded.reduce((a, [, v]) => a + v, 0)).toFixed(2));
    if (drift !== 0) {
      let maxIdx = 0;
      rounded.forEach(([, v], i) => { if (v > rounded[maxIdx][1]) maxIdx = i; });
      rounded[maxIdx][1] = parseFloat((rounded[maxIdx][1] + drift).toFixed(2));
    }
    return Object.fromEntries(rounded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveWeights(normalize(priorityWeights), normalize(siteWeights));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Decision Matrix & Scoring Weights
              </h3>
              <p className="text-xs text-slate-400">
                Adjust multi-criteria formulation weights to simulate relocation policy scenarios.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Section 1: Village Prioritization Weights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span>1. Village Risk Prioritization Formula</span>
              </h4>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Total Sum:</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    prioritySum === 100
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {prioritySum}% {prioritySum === 100 ? "✓" : "≠ 100%"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "hazard", label: "Hazard Index (Slope, Rainfall, History)", color: "text-rose-400" },
                { key: "exposure", label: "Exposure (Population Density)", color: "text-orange-400" },
                { key: "vulnerability", label: "Vulnerability (Elderly & Road Access)", color: "text-yellow-400" },
                { key: "history", label: "Historical Disaster Record", color: "text-indigo-400" }
              ].map(({ key, label, color }) => (
                <div key={key} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">{label}</span>
                    <span className={`font-mono font-bold ${color}`}>
                      {Math.round((priorityWeights[key] || 0) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={Math.round((priorityWeights[key] || 0) * 100)}
                    onChange={(e) => handlePriorityChange(key, e.target.value)}
                    aria-label={`Weight for ${label}`}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Resettlement Site Ranking Weights */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span>2. Safe Resettlement Site Ranking Formula</span>
              </h4>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Total Sum:</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    siteSum === 100
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {siteSum}% {siteSum === 100 ? "✓" : "≠ 100%"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "safety", label: "Safety & Hazard Buffer", color: "text-emerald-400" },
                { key: "capacity", label: "Resettlement Capacity", color: "text-cyan-400" },
                { key: "infrastructure", label: "Infrastructure & Hospital", color: "text-blue-400" },
                { key: "accessibility", label: "Road & Transport Access", color: "text-purple-400" },
                { key: "water", label: "Perennial Water Supply", color: "text-sky-400" },
                { key: "distance", label: "Proximity to Origin Village", color: "text-teal-400" }
              ].map(({ key, label, color }) => (
                <div key={key} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">{label}</span>
                    <span className={`font-mono font-bold ${color}`}>
                      {Math.round((siteWeights[key] || 0) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={Math.round((siteWeights[key] || 0) * 100)}
                    onChange={(e) => handleSiteChange(key, e.target.value)}
                    aria-label={`Weight for ${label}`}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {saving ? "Recomputing Scores..." : "Apply & Recalculate"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
