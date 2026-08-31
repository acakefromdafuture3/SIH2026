import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import StatsOverview from "./components/StatsOverview";
import VillageList from "./components/VillageList";
import MapView from "./components/MapView";
import VillageDetail from "./components/VillageDetail";
import VillageDrawer from "./components/VillageDrawer";
import SiteMatchList from "./components/SiteMatchList";
import WeightsModal from "./components/WeightsModal";
import { ApiService } from "./services/api";
import {
  Map,
  List,
  FileText,
  AlertCircle,
  RefreshCw,
  PanelRightOpen,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Navigation
} from "lucide-react";

export default function App() {
  const [villages, setVillages] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedVillageId, setSelectedVillageId] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Majuli");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [siteMatches, setSiteMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(true);
  const [dataSource, setDataSource] = useState("local_dataset");

  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [savingWeights, setSavingWeights] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errorState, setErrorState] = useState(null);

  // Command workspace tab: "map" | "diagnostics" | "havens"
  const [commandTab, setCommandTab] = useState("map");

  // Mobile view tab toggle: "map" | "list" | "detail"
  const [mobileTab, setMobileTab] = useState("map");

  // Load initial sites
  useEffect(() => {
    const loadedSites = ApiService.getRelocationSites();
    setSites(loadedSites);
  }, []);

  // Fetch villages
  const loadVillages = useCallback(async () => {
    setLoadingVillages(true);
    setErrorState(null);
    try {
      const data = await ApiService.getVillages(
        selectedDistrict === "All" ? undefined : selectedDistrict,
        selectedCategory === "All" ? undefined : selectedCategory
      );
      setVillages(data.villages || []);
      setDataSource(data.source);

      // Select first village if none selected or if previously selected is no longer in list
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

  useEffect(() => {
    loadVillages();
  }, [loadVillages]);

  // When selected village changes, fetch candidate relocation site matches
  useEffect(() => {
    if (!selectedVillageId) {
      setSiteMatches([]);
      return;
    }

    let isMounted = true;
    const fetchMatches = async () => {
      setLoadingMatches(true);
      try {
        const data = await ApiService.getSiteMatches(selectedVillageId);
        if (isMounted) {
          let matchesArray = data?.matches || [];
          if (!Array.isArray(matchesArray) && typeof matchesArray === 'object') {
            matchesArray = Object.values(matchesArray);
          }
          setSiteMatches(Array.isArray(matchesArray) ? matchesArray : []);
        }
      } catch (err) {
        console.error("Error fetching site matches:", err);
      } finally {
        if (isMounted) setLoadingMatches(false);
      }
    };
    fetchMatches();

    return () => {
      isMounted = false;
    };
  }, [selectedVillageId, isWeightsModalOpen]);

  const selectedVillage = villages.find((v) => v.id === selectedVillageId) || villages[0] || null;

  // Auto-dismiss success notifications after 5s; keep errors visible until dismissed
  useEffect(() => {
    if (notification && notification.type === "success") {
      const timeoutId = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  // Handle saving weights from modal
  const handleSaveWeights = async (priorityWeights, siteWeights) => {
    setSavingWeights(true);
    const startTime = Date.now();
    try {
      const result = await ApiService.updateWeights(priorityWeights, siteWeights);

      // Fetch recomputed villages AND updated site matches concurrently
      const [villagesData, matchData] = await Promise.all([
        ApiService.getVillages(
          selectedDistrict === "All" ? undefined : selectedDistrict,
          selectedCategory === "All" ? undefined : selectedCategory
        ),
        selectedVillageId
          ? ApiService.getSiteMatches(selectedVillageId)
          : Promise.resolve({ matches: [] })
      ]);

      const nextVillages = villagesData?.villages || [];
      setVillages(nextVillages);
      if (villagesData?.source) setDataSource(villagesData.source);
      if (nextVillages.length > 0) {
        setSelectedVillageId((prev) => {
          const exists = nextVillages.some((v) => v.id === prev);
          return exists ? prev : nextVillages[0].id;
        });
      }

      let matchesArray = matchData?.matches || [];
      if (!Array.isArray(matchesArray) && typeof matchesArray === "object") {
        matchesArray = Object.values(matchesArray);
      }
      setSiteMatches(Array.isArray(matchesArray) ? matchesArray : []);

      const elapsedMs = Date.now() - startTime;
      const recomputed =
        result?.villages_recomputed ?? nextVillages.length;

      setNotification({
        type: "success",
        message: `Weights updated — ${recomputed} villages recomputed in ${elapsedMs} ms.`
      });
      setIsWeightsModalOpen(false);
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

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-rose-500 selection:text-white bg-grid-pattern">
      
      {/* Top Command Navigation */}
      <Navbar
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onOpenWeights={() => setIsWeightsModalOpen(true)}
        onRefresh={loadVillages}
        dataSource={dataSource}
        loading={loadingVillages}
        immediateCount={immediateCount}
      />

      {/* Main Command Center Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-6">
        
        {/* Error Retry Banner on Network Fault */}
        {errorState && (
          <div className="bg-red-950/90 border border-red-500/50 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-red-200 shadow-2xl shadow-red-950/40 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <span className="font-bold text-red-300 block text-xs uppercase tracking-wide">
                  Network Notice / Backend Status
                </span>
                <span className="text-red-200/80 text-[11px]">
                  {errorState.message}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
              <button
                onClick={() => {
                  setErrorState(null);
                  loadVillages();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow transition-colors text-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Connection
              </button>
              <button
                onClick={() => setErrorState(null)}
                className="p-1.5 rounded-xl text-red-400 hover:text-white hover:bg-red-900/50 transition-colors"
                title="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Success Toast Banner */}
        {notification && (
          <div
            className={`p-3.5 rounded-2xl flex items-center justify-between text-xs transition-all border shadow-xl ${
              notification.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border-red-500/40 text-red-300"
            }`}
          >
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white ml-2 text-sm font-bold p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Semi-transparent Loading Spinner Overlay */}
        {loadingVillages && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-fadeIn select-none">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-rose-500 border-r-rose-500 animate-spin" />
              <div
                className="w-10 h-10 rounded-full border-4 border-slate-800 border-b-cyan-400 border-l-cyan-400 animate-spin absolute"
                style={{ animationDirection: "reverse", animationDuration: "1s" }}
              />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping absolute" />
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-base font-black text-white tracking-wider font-mono">
                INITIALIZING RESQ GEOSPATIAL COMMAND
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                Fetching multi-factor flood/erosion hazard indexes & priority matrices...
              </p>
            </div>
          </div>
        )}

        {/* Top Summary Metrics */}
        <StatsOverview villages={villages} sites={sites} />

        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden flex bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 gap-1.5 shadow-lg">
          <button
            onClick={() => setMobileTab("map")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mobileTab === "map"
                ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            GIS Map
          </button>
          <button
            onClick={() => setMobileTab("list")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mobileTab === "list"
                ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Rankings ({villages.length})
          </button>
          <button
            onClick={() => setMobileTab("detail")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mobileTab === "detail"
                ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Diagnostics & Matches
          </button>
        </div>

        {/* Desktop View: Spacious 2-Column Command Workspace */}
        <div className="hidden lg:grid grid-cols-12 gap-6 min-h-[660px]">
          {/* Left Column: Priority Matrix Village Rankings (4 Cols) */}
          <div className="col-span-4 h-[660px]">
            <VillageList
              villages={villages}
              selectedVillageId={selectedVillageId}
              onSelectVillage={handleSelectVillage}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Right Column: Tactical Command Canvas (8 Cols) */}
          <div className="col-span-8 flex flex-col h-[660px] gap-3">
            {/* Desktop Command Tab Bar */}
            <div className="flex items-center justify-between glass-panel rounded-2xl p-1.5 px-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCommandTab("map")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    commandTab === "map"
                      ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-cyan-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Map className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Interactive GIS Map</span>
                </button>

                <button
                  onClick={() => setCommandTab("diagnostics")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    commandTab === "diagnostics"
                      ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-rose-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-rose-400" />
                  <span>Risk & AI Diagnostics</span>
                </button>

                <button
                  onClick={() => setCommandTab("havens")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    commandTab === "havens"
                      ? "bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-emerald-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Relocation Safe Havens</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                    {siteMatches.length}
                  </span>
                </button>
              </div>

              {selectedVillage && (
                <div className="flex items-center gap-2 pr-2 text-xs">
                  <span className="text-slate-500">Active Focus:</span>
                  <strong className="text-cyan-300 font-semibold truncate max-w-[160px]">
                    {selectedVillage.name}
                  </strong>
                </div>
              )}
            </div>

            {/* Tab 1: GIS Map */}
            {commandTab === "map" && (
              <div className="flex-1 relative rounded-2xl overflow-hidden h-full">
                <MapView
                  villages={villages}
                  sites={sites}
                  selectedVillage={selectedVillage}
                  onSelectVillage={handleSelectVillage}
                  siteMatches={siteMatches}
                />

                {/* Floating Bottom HUD Strip for Active Village */}
                {selectedVillage && (
                  <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-md z-[20] glass-panel rounded-2xl p-3 sm:p-3.5 border-slate-700 shadow-2xl space-y-2 pointer-events-auto animate-fadeIn">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                          {selectedVillage.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          ({selectedVillage.priority_category})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs font-black text-rose-400 flex-shrink-0">
                        <span>{selectedVillage.priority_score}</span>
                        <span className="text-[10px] text-slate-500">pts</span>
                      </div>
                    </div>

                    {/* Top Match quick vector */}
                    {topMatch && (
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Navigation className="w-3 h-3 text-cyan-400" /> Top Haven:
                          <strong className="text-white truncate max-w-[140px]">{topMatch.site_name}</strong>
                        </span>
                        <span className="text-cyan-300 font-mono font-bold">
                          {topMatch.distance_km} km ({topMatch.suitability_score}%)
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setCommandTab("diagnostics")}
                        className="flex-1 py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-xl text-[11px] font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Activity className="w-3 h-3" />
                        Diagnostics
                      </button>
                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                        title="Open Full Explainability Dossier"
                      >
                        <PanelRightOpen className="w-3 h-3" />
                        Dossier
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Risk Diagnostics */}
            {commandTab === "diagnostics" && (
              <div className="flex-1 overflow-y-auto h-full">
                <VillageDetail
                  village={selectedVillage}
                  siteMatches={siteMatches}
                  loadingMatches={loadingMatches}
                  onOpenDrawer={() => setIsDrawerOpen(true)}
                />
              </div>
            )}

            {/* Tab 3: Safe Havens & Matches */}
            {commandTab === "havens" && (
              <div className="flex-1 overflow-y-auto h-full">
                <SiteMatchList
                  matches={siteMatches}
                  villageName={selectedVillage?.name || "Selected Village"}
                  loading={loadingMatches}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile View: Dynamic Single Tab Display */}
        <div className="lg:hidden flex-1 h-[580px]">
          {mobileTab === "map" && (
            <div className="h-full relative rounded-2xl overflow-hidden">
              <MapView
                villages={villages}
                sites={sites}
                selectedVillage={selectedVillage}
                onSelectVillage={handleSelectVillage}
                siteMatches={siteMatches}
              />
            </div>
          )}

          {mobileTab === "list" && (
            <div className="h-full">
              <VillageList
                villages={villages}
                selectedVillageId={selectedVillageId}
                onSelectVillage={handleSelectVillage}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          )}

          {mobileTab === "detail" && (
            <div className="h-full overflow-y-auto">
              <VillageDetail
                village={selectedVillage}
                siteMatches={siteMatches}
                loadingMatches={loadingMatches}
                onOpenDrawer={() => setIsDrawerOpen(true)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-4 text-center text-xs text-slate-500">
        <p>ResQ &mdash; Disaster Management & Algorithmic Resettlement Decision Support Engine</p>
      </footer>

      {/* Sliding Right-Side Explainability & Risk Drawer */}
      <VillageDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        village={selectedVillage}
        siteMatches={siteMatches}
        loadingMatches={loadingMatches}
      />

      {/* Scoring Weights Calibration Modal */}
      <WeightsModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
        initialWeights={ApiService.getWeights()}
        onSaveWeights={handleSaveWeights}
        saving={savingWeights}
      />

    </div>
  );
}
