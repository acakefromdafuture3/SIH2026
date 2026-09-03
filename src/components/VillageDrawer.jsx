import React from "react";
import {
  X,
  MapPin,
  Users,
  ShieldAlert,
  AlertTriangle,
  Flame,
  Droplets,
  Mountain,
  Navigation,
  Compass,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Info
} from "lucide-react";
import { PIN_COLORS } from "../constants/theme";

/**
 * Circular / Semi-circular Radial SVG Score Gauge
 */
function ScoreGauge({ score, categoryColor }) {
  const normalizedScore = Math.min(100, Math.max(0, score || 0));
  const radius = 58;
  const strokeWidth = 10;
  // Circumference for 270 degree arc (3/4 of a circle)
  const fullCircumference = 2 * Math.PI * radius;
  const arcLength = fullCircumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="150" height="150" className="transform -rotate-[135deg]">
        {/* Background Arc */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="rgba(51, 65, 85, 0.4)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${fullCircumference}`}
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke={categoryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${fullCircumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${categoryColor}80)`
          }}
        />
      </svg>

      {/* Center text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-black font-mono tracking-tight text-white">
          {typeof score === 'number' ? score.toFixed(1) : (score || 0)}
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          out of 100
        </span>
      </div>
    </div>
  );
}

/**
 * Sliding Right-Side Drawer Component for Village Risk & Explainability
 */
export default function VillageDrawer({
  isOpen,
  onClose,
  village,
  siteMatches = [],
  loadingMatches = false
}) {
  if (!village) return null;

  const priorityCategory = village.priority_category || "Monitor";
  const categoryColor = PIN_COLORS[priorityCategory] || "#10B981";

  // Format factor labels nicely
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

  // Get factor icon
  const getFactorIcon = (factorKey) => {
    switch (factorKey) {
      case "landslide_history":
        return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      case "rainfall":
        return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
      case "slope":
      case "elevation":
        return <Mountain className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Top 3 factors for Explainability
  const topThreeFactors = (village.top_factors || [
    { factor: "landslide_history", contribution: village.hazard_factors?.landslide_history || 90 },
    { factor: "rainfall", contribution: village.hazard_factors?.rainfall || 85 },
    { factor: "slope", contribution: village.hazard_factors?.slope || 80 }
  ]).slice(0, 3);

  const topSite = siteMatches[0];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9980] lg:hidden transition-opacity"
        />
      )}

      {/* Sliding Drawer Container */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] md:w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-[9990] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-slate-950/70">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Badge */}
              <span
                className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded shadow-sm text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {priorityCategory} Priority
              </span>
              <span className="text-xs font-mono text-slate-400">
                ID: {village.id}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white mt-1.5 truncate">
              {village.name}
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span className="truncate">{village.district}, {village.state}</span>
              <span>•</span>
              <span className="font-mono text-slate-300 text-[11px]">
                {village.lat?.toFixed(4)}°N, {village.lng?.toFixed(4)}°E
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Drawer"
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs">
          
          {/* Section 1: Priority Score Radial Gauge */}
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Composite Relocation Priority Index
            </span>
            
            <ScoreGauge
              score={village.priority_score}
              categoryColor={categoryColor}
            />

            <div className="w-full grid grid-cols-4 gap-1.5 mt-2 pt-3 border-t border-slate-800/80 text-center">
              <div>
                <span className="text-[10px] text-slate-500 block">Hazard</span>
                <span className="font-mono font-bold text-rose-400 text-xs">
                  {village.hazard_score || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Exposure</span>
                <span className="font-mono font-bold text-orange-400 text-xs">
                  {village.exposure_score || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Vuln.</span>
                <span className="font-mono font-bold text-yellow-400 text-xs">
                  {village.vulnerability_score || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">History</span>
                <span className="font-mono font-bold text-indigo-400 text-xs">
                  {village.history_score || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Demographics & Access Metrics */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Demographic & Evacuation Profile
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Population Card */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">Total Population</span>
                <span className="text-base font-extrabold font-mono text-white">
                  {village.population?.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Residents</span>
              </div>

              {/* Elderly Card */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">Elderly (60+)</span>
                <span className="text-base font-extrabold font-mono text-amber-400">
                  {village.elderly_pct}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">High fragility</span>
              </div>

              {/* Road Access Card */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">Road Access</span>
                <span
                  className={`text-sm font-extrabold capitalize block ${
                    village.road_access === "poor"
                      ? "text-red-400"
                      : village.road_access === "moderate"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }`}
                >
                  {village.road_access || "Moderate"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Evac route</span>
              </div>
            </div>
          </div>

          {/* Section 3: Explainability — Top 3 Hazard Contribution Factors */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                AI Explainability: Top 3 Risk Drivers
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                ML Pipeline
              </span>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/90 space-y-3">
              {topThreeFactors.map((item, index) => {
                const contribution = item.contribution || 0;
                
                // Color ramp according to severity
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

                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-slate-200">
                        {getFactorIcon(item.factor)}
                        <span>{formatFactorLabel(item.factor)}</span>
                      </div>
                      <span className={`font-mono font-bold ${textColor}`}>
                        {contribution}% contribution
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`${barColor} h-full rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${Math.min(100, contribution)}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-start gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  Prioritization algorithm computed this severity score driven primarily by{" "}
                  <strong className="text-slate-200">{formatFactorLabel(topThreeFactors[0]?.factor || "hazard")}</strong>.
                </span>
              </p>
            </div>
          </div>

          {/* Section 4: Recommended Resettlement Zone */}
          {topSite && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                Primary Relocation Target
              </h3>

              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                      Rank #1 Destination
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {topSite.site_name}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    {topSite.suitability_score}% Fit
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 block">Straight Distance</span>
                    <span className="font-mono font-bold text-slate-200">{topSite.distance_km} km</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Available Space</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {topSite.site_details?.capacity?.toLocaleString() || "N/A"} slots
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700 text-center"
          >
            Close Panel
          </button>
          <button
            onClick={() => {
              alert(`Generated relocation action plan for ${village.name}. Exporting dossier...`);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5"
          >
            <span>Action Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </aside>
    </>
  );
}
