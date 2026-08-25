# SIH2026 Firebase Backend

Firebase project setup for **Node.js Cloud Functions + Cloud Firestore**, configured for local development and emulation.

---

## 📁 Project Structure

```text
SIH2026/
├── .firebaserc              # Firebase project target configuration
├── firebase.json            # Firebase emulators, functions, & firestore configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore database index definitions
├── package.json             # Root scripts & dev dependencies (firebase-tools)
├── README.md                # Documentation & local run instructions
└── functions/               # Cloud Functions source code
    ├── package.json         # Node.js 20 runtime & dependencies (firebase-admin, firebase-functions)
    ├── index.js             # Main entry point & exported Cloud Functions
    ├── priorityEngine.js    # Priority computation and weighting engine
    ├── siteRanking.js       # Site evaluation and ranking algorithm
    └── seed/
        └── seedData.js      # Seed dataset and Firestore populating helper
```

---

## 🛠️ Prerequisites

1. **Node.js**: Version 20.x or higher (`node -v`)
2. **npm**: Version 10.x or higher (`npm -v`)
3. **Java JDK**: Version 11 or higher required by the Firestore emulator (`java -version`). If using Android Studio's bundled JBR, set `JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"`.

---

## 📦 Installation

Install root dependencies (`firebase-tools`) and Cloud Functions dependencies (`firebase-admin`, `firebase-functions`):

```bash
# 1. Install root dependencies
npm install

# 2. Install functions dependencies
cd functions
npm install
cd ..
```

---

## 🚀 Running the Local Emulators

Start the Firebase Emulator Suite (Firestore, Functions, and Emulator UI):

```bash
# Using root npm script
npm run emulators:start

# Or directly with firebase-tools
npx firebase emulators:start
```

### Emulator Endpoints

When started, the emulators are accessible at:

| Service | Host / URL | Port |
| :--- | :--- | :--- |
| **Emulator UI** | [http://127.0.0.1:4000](http://127.0.0.1:4000) | `4000` |
| **Cloud Functions (Mumbai)** | `http://127.0.0.1:5001/sih2026-demo/asia-south1` | `5001` |
| **Cloud Firestore** | `127.0.0.1:8080` | `8080` |

---

## 🌱 Seeding Mock Demo Data

To populate Firestore with mock demo data for Chamoli, Uttarakhand:

```bash
# Seed against local running Firestore emulator
npm run seed
# or: cd functions && npm run seed

# Seed against live Firebase project
cd functions
npm run seed:live
```

---

## ⚡ Available Cloud Function Endpoints

Once the emulators are running, test the endpoints locally:

- **Health Check**:
  ```bash
  curl http://127.0.0.1:5001/sih2026-demo/asia-south1/healthCheck
  ```

- **Seed Firestore Emulator Data**:
  ```bash
  curl -X POST http://127.0.0.1:5001/sih2026-demo/asia-south1/seedDatabase
  ```

- **Get Villages**:
  ```bash
  # PowerShell
  curl.exe -X POST http://127.0.0.1:5001/sih2026-demo/asia-south1/getVillages -H "Content-Type: application/json" -d "{\"data\": {}}"

  # Bash
  curl -X POST http://127.0.0.1:5001/sih2026-demo/asia-south1/getVillages \
    -H "Content-Type: application/json" \
    -d '{"data": {}}'
  ```

- **Get Site Matches**:
  ```bash
  # PowerShell
  curl.exe -X POST http://127.0.0.1:5001/sih2026-demo/asia-south1/getSiteMatches -H "Content-Type: application/json" -d "{\"data\": {\"villageId\": \"mock-village-chamoli-01\"}}"

  # Bash
  curl -X POST http://127.0.0.1:5001/sih2026-demo/asia-south1/getSiteMatches \
    -H "Content-Type: application/json" \
    -d '{"data": {"villageId": "mock-village-chamoli-01"}}'
  ```

---

## 🌐 Live Deployment & Smoke Testing

### Deploy to Live Firebase Project

```bash
# Deploy all Cloud Functions and Firestore Security Rules
npx firebase deploy --only functions,firestore:rules
```

### Seed Live Firestore

```bash
# Populate live Firestore database with mock Chamoli data
npm --prefix functions run seed:live
```

### Run End-to-End Live Smoke Test

```bash
# Test getVillages, updateWeights, getVillageDetail, and getSiteMatches live
npm --prefix functions run test:live
```

---

## 💾 Persisting Emulator Data (Optional)

Export emulator data on exit or import previously saved state:

```bash
# Start emulators and export data on exit
npx firebase emulators:start --export-on-exit=./emulator-data

# Import existing data on start
npm run emulators:import
```