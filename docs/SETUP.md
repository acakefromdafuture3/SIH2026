# ResQ — Setup, Emulator & Deployment Manual

This guide provides step-by-step instructions for setting up the local development environment, executing local Firebase emulators, running automated tests, and deploying the ResQ platform to production.

---

## 1. Prerequisites & Required Tools

Ensure the following tools are installed on your workstation prior to setup:

| Tool | Minimum Version | Installation Command / Link |
| :--- | :--- | :--- |
| **Node.js** | `v20.0.0` (LTS) | `nvm install 20 && nvm use 20` |
| **npm** | `v10.0.0` | Included with Node.js 20 |
| **Java JDK** | `JDK 11` or higher | Required for Firebase Emulators (`winget install Oracle.JDK.17` or `brew install openjdk@17`) |
| **Firebase CLI** | `v13.0.0` | `npm install -g firebase-tools` |
| **Git** | `v2.40.0` | `winget install Git.Git` or `brew install git` |

---

## 2. Clone & Install Dependencies

Clone the repository and install dependencies for both the root frontend application and the backend functions workspace:

```bash
git clone https://github.com/acakefromdafuture3/SIH2026.git
cd SIH2026
npm install
cd functions && npm install && cd ..
```

---

## 3. Configure Environment Variables

Create the required environment configuration files by copying the provided templates:

```bash
# Frontend environment file
cp .env.example .env

# Backend functions environment file
cp functions/.env.example functions/.env
```

### Environment Variable Reference

| Variable | Target File | Description | Sample / Redacted Value |
| :--- | :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | `.env` | Firebase Web API Key | `AIzaSyD-EXAMPLE_KEY_STRING` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `.env` | Firebase Auth Domain | `sih2026-4b480.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `.env` | Firebase Project ID | `sih2026-4b480` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `.env` | Storage Bucket URL | `sih2026-4b480.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| `.env` | Messaging Sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | `.env` | Firebase Web App ID | `1:123456789012:web:abc123def456` |
| `ENVIRONMENT` | `functions/.env` | Runtime environment guard | `demo` *(or `dev` / `production`)* |
| `SEED_TOKEN` | `functions/.env` | Optional bearer token for seeding | `red-zone-secure-seed-token` |

---

## 4. Run Firebase Emulator Suite

Start the local Firebase emulators for Cloud Functions and Cloud Firestore:

```bash
npm run emulators:start
```

### Local Emulator Port Mapping

| Service | Port | Endpoint URL / Interface |
| :--- | :--- | :--- |
| **Emulator UI** | `:4000` | `http://127.0.0.1:4000` |
| **Cloud Functions v2** | `:5001` | `http://127.0.0.1:5001/sih2026-4b480/asia-south1` |
| **Cloud Firestore** | `:8080` | `127.0.0.1:8080` |

To inspect local database state, open the **Emulator Suite UI** in your browser at `http://127.0.0.1:4000`.

---

## 5. Seed Demo Data

> **⚠️ Warning:** The `seedDatabase` endpoint wipes existing Firestore data and populates it with Majuli demo records. It is strictly guarded by `ENVIRONMENT=demo` or `ENVIRONMENT=dev`. **Never invoke database seeding in a live production environment or during an active judging session.**

Populate the database with the 10 Majuli demo villages and 4 relocation sites:

```bash
# Seed local emulators
npm run seed

# Seed live Firebase project (development environment only)
npm --prefix functions run seed:live
```

---

## 6. Launch Frontend Dashboard

Start the Vite development server:

```bash
npm run dev
```

Open your browser to `http://localhost:3000`. The frontend uses a live-first architecture with automatic fallback:
* **Online:** Connects directly to the local emulator (`:5001`) or live Cloud Functions.
* **Offline:** Automatically falls back to `src/data/mockChamoliData.js` and displays a `local_dataset` tag in the telemetry header.

---

## 7. Smoke Testing & Verification

Run automated curl requests against the local emulator to verify endpoint health:

```bash
# 1. Health Check
curl -X GET http://127.0.0.1:5001/sih2026-4b480/asia-south1/healthCheck

# Expected Response:
# {"status":"ok","region":"asia-south1","timestamp":"2026-08-31T00:00:00.000Z"}

# 2. Query Villages Callable
curl -X POST http://127.0.0.1:5001/sih2026-4b480/asia-south1/getVillages \
  -H "Content-Type: application/json" \
  -d '{"data": {"district": "Majuli"}}'
```

---

## 8. Firebase Emulator Reference

| Emulator Component | Simulated Behavior |
| :--- | :--- |
| **Cloud Functions v2** | Executes `onCall` callables, HTTP endpoints (`healthCheck`), and background event triggers (`onDocumentWritten`). |
| **Cloud Firestore** | Simulates native document database with real-time listeners and security rules evaluation (`firestore.rules`). |
| **Emulator UI** | Interactive browser GUI (`http://127.0.0.1:4000`) for querying collections, editing documents, and viewing logs. |

---

## 9. Production Deployment Guide

Deploy Cloud Functions and Firestore security rules to the live GCP project (`sih2026-4b480`, region `asia-south1`):

```bash
# 1. Deploy Functions and Security Rules
npx firebase deploy --only functions,firestore:rules

# 2. Seed Live Environment (Demo Setup Only)
npm --prefix functions run seed:live

# 3. Execute Verification Test Suite
npm --prefix functions run test:live
```

### Pre-Deployment Verification Checklist

- [ ] All 10 Majuli villages and 4 relocation sites seeded (`npm run seed`).
- [ ] `seedDatabase` HTTP endpoint verified to block unauthorized/production calls (`ENVIRONMENT` set correctly).
- [ ] Security rules in `firestore.rules` reviewed (public read, server-only write).
- [ ] Production `.env` parameters configured (`VITE_FIREBASE_PROJECT_ID=sih2026-4b480`).
- [ ] Automated smoke test (`smokeTest.js`) passes against target region (`asia-south1`).

---

## 10. Troubleshooting Guide

| Symptom | Likely Cause | Recommended Resolution |
| :--- | :--- | :--- |
| **CORS Error on Callable** | Missing region specifier or mismatched origin. | Ensure `getFunctions(app, 'asia-south1')` specifies `asia-south1` explicitly in `src/firebase.js`. |
| **Emulator Connection Refused** | Java JDK missing or port `:5001`/`:8080` in use. | Install JDK 11+ and kill process occupying port (`npx kill-port 8080 5001`). |
| **Leaflet Map Displays Blank Screen** | Invalid coordinates (`NaN, NaN`) or 0-size container. | Ensure coordinates are parsed via `parseFloat()` and wrapper container has CSS height (`h-full`). |
| **Firestore Permission Denied** | Direct client-side write attempted. | Ensure all data mutations route through Cloud Functions callables; client writes are blocked by `firestore.rules`. |
| **Seed Data Missing in Emulator UI** | Emulator started after running seed script. | Execute `npm run emulators:start` *first*, then run `npm run seed` in a separate terminal window. |
| **`updateWeights` Fails to Recalculate** | Priority weights do not sum to 1.0. | Check input slider values in `WeightsModal.jsx` to ensure `w_h + w_e + w_v + w_hist = 1.0 ± 0.01`. |
