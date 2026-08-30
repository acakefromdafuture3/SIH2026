// Priority & Disaster Risk Theme Constants

export const PIN_COLORS = {
  Immediate: "#EF4444",   // Red
  "Short-term": "#F97316", // Orange
  "Medium-term": "#EAB308",// Yellow
  Monitor: "#10B981"       // Green
};

export const PRIORITY_STYLES = {
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
