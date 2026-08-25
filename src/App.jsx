import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import StatsOverview from "./components/StatsOverview";
import VillageList from "./components/VillageList";
import MapView from "./components/MapView";
import VillageDetail from "./components/VillageDetail";
import VillageDrawer from "./components/VillageDrawer";
import WeightsModal from "./components/WeightsModal";
import { ApiService } from "./services/api";
import { Map, List, FileText, AlertCircle, RefreshCw, PanelRightOpen } from "lucide-react";

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
        message: "Failed to connect to Firebase Cloud Functions backend at asia-south1. Using offline resilient dataset.",
        details: err.message
      });
    } finally {
      setLoadingVillages(false);
    }
  }, [selectedDistrict, selectedCategory]);

  useEffect(() => {
    loadVillages();
  }, [loadVillages]);

  // Selected village object
  const selectedVillage = villages.find((v) => v.id === selectedVillageId) || null;

  // Fetch site matches whenever selected village changes
  useEffect(() => {
    if (!selectedVillageId) {
      setSiteMatches([]);
      return;
    }

    let isMounted = true;
    async function fetchMatches() {
      setLoadingMatches(true);
      try {
        const data = await ApiService.getSiteMatches(selectedVillageId);
        if (isMounted) {
          setSiteMatches(data.matches || []);
        }
      } catch (err) {
        console.error("Error fetching site matches:", err);
      } finally {
        if (isMounted) setLoadingMatches(false);
      }
    }

    fetchMatches();
    return () => {
      isMounted = false;
    };
  }, [selectedVillageId]);

  // Handle weight adjustments
  const handleSaveWeights = async (priorityWeights, siteWeights) => {
    setSavingWeights(true);
    try {
      const response = await ApiService.updateWeights(priorityWeights, siteWeights);
      setIsWeightsModalOpen(false);
      setNotification({
        type: "success",
        message: response.message || "Scoring weights updated and scores recalculated!"
      });
      // Reload villages with new weights
      await loadVillages();
      // Re-fetch matches for current village
      if (selectedVillageId) {
        const matchesData = await ApiService.getSiteMatches(selectedVillageId);
        setSiteMatches(matchesData.matches || []);
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
    setIsDrawerOpen(true);
    if (window.innerWidth < 1024) {
      setMobileTab("detail");
    }
  };

  const immediateCount = villages.filter((v) => v.priority_category === "Immediate").length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-rose-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onOpenWeights={() => setIsWeightsModalOpen(true)}
        onRefresh={loadVillages}
        dataSource={dataSource}
        loading={loadingVillages}
        immediateCount={immediateCount}
      />

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-4">
        
        {/* Error Retry Banner on Network Fault */}
        {errorState && (
          <div className="bg-red-950/90 border border-red-500/50 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-red-200 shadow-xl shadow-red-950/30 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <span className="font-bold text-red-300 block text-xs">
                  Network Fault / Backend Service Notice
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
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold shadow transition-colors text-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Connection
              </button>
              <button
                onClick={() => setErrorState(null)}
                className="p-1 rounded-lg text-red-400 hover:text-white hover:bg-red-900/50 transition-colors"
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
            className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all border ${
              notification.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border-red-500/40 text-red-300"
            }`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white ml-2 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Semi-transparent Loading Spinner Overlay */}
        {loadingVillages && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center gap-3 animate-fadeIn select-none">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-4 border-slate-800 border-t-rose-500 border-r-rose-500 animate-spin" />
              <div
                className="w-9 h-9 rounded-full border-4 border-slate-800 border-b-cyan-400 border-l-cyan-400 animate-spin absolute"
                style={{ animationDirection: "reverse", animationDuration: "1s" }}
              />
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping absolute" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-extrabold text-white tracking-wide">
                Loading ResQ Geospatial Intelligence
              </p>
              <p className="text-xs text-slate-400 max-w-xs">
                Fetching multi-factor landslide hazard indexes & priority matrices...
              </p>
            </div>
          </div>
        )}

        {/* Top Summary Metrics */}
        <StatsOverview villages={villages} sites={sites} />

        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setMobileTab("map")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "map"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            GIS Map
          </button>
          <button
            onClick={() => setMobileTab("list")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "list"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Rankings ({villages.length})
          </button>
          <button
            onClick={() => setMobileTab("detail")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "detail"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Details & Match
          </button>
        </div>

        {/* Responsive Grid Section */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[620px]">
          
          {/* Left Column: Village Rankings List */}
          <div
            className={`lg:col-span-3 h-[620px] ${
              mobileTab !== "list" ? "hidden lg:block" : "block"
            }`}
          >
            <VillageList
              villages={villages}
              selectedVillageId={selectedVillageId}
              onSelectVillage={handleSelectVillage}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Center Column: Interactive GIS Map */}
          <div
            className={`lg:col-span-5 h-[620px] ${
              mobileTab !== "map" ? "hidden lg:block" : "block"
            }`}
          >
            <MapView
              villages={villages}
              sites={sites}
              selectedVillage={selectedVillage}
              onSelectVillage={handleSelectVillage}
              siteMatches={siteMatches}
            />
          </div>

          {/* Right Column: Village Risk Detail & Site Suitability */}
          <div
            className={`lg:col-span-4 h-[620px] ${
              mobileTab !== "detail" ? "hidden lg:block" : "block"
            }`}
          >
            <VillageDetail
              village={selectedVillage}
              siteMatches={siteMatches}
              loadingMatches={loadingMatches}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-3 text-center text-xs text-slate-500">
        <p>ResQ &mdash; Disaster Management & Resettlement Decision Support Engine</p>
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
