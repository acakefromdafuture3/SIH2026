import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Live Firebase Web configuration for SIH2026
export const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyDFjququvz4BVYq9PS6e5sWkpv5oY58Yhw",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "sih2026-4b480.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "sih2026-4b480",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "sih2026-4b480.firebasestorage.app",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "896652024753",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:896652024753:web:61062c4540f1b918b2bb90"
};

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore (Direct client reads enabled)
export const db = getFirestore(app);

// Cloud Functions deployed in Mumbai (asia-south1)
export const functions = getFunctions(app, "asia-south1");

// Helper callable function wrappers
export async function fetchVillages(district, priorityCategory) {
  const getVillagesFn = httpsCallable(functions, "getVillages");
  const result = await getVillagesFn({
    district: district || undefined,
    priority_category: priorityCategory || undefined
  });
  return result.data;
}

export async function fetchVillageDetail(villageId) {
  const getVillageDetailFn = httpsCallable(functions, "getVillageDetail");
  const result = await getVillageDetailFn({ villageId });
  return result.data.village;
}

export async function fetchSiteMatches(villageId) {
  const getSiteMatchesFn = httpsCallable(functions, "getSiteMatches");
  const result = await getSiteMatchesFn({ villageId });
  return result.data;
}

export async function updateScoringWeights(newPriorityWeights, newSiteWeights) {
  const updateWeightsFn = httpsCallable(functions, "updateWeights");
  const result = await updateWeightsFn({
    priority: newPriorityWeights,
    site_ranking: newSiteWeights
  });
  return result.data;
}
