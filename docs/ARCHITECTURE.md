# ConT System Architecture

High-level system design and data flow.

---

## 1. System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        ConT Platform                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Frontend   │  │   Mock API   │  │  Contracts & Types   │  │
│  │  (React)     │  │  (Express)   │  │  (TypeScript)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│        ▲                   ▲                                     │
│        └───────────────────┴─────────────────────┐              │
│                                                  ▼              │
│                             ┌──────────────────────────┐        │
│                             │   Synthetic Data Layer   │        │
│                             │   (Demo Datasets)        │        │
│                             └──────────────────────────┘        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

Production ConT (Separate, Private)
┌──────────────────────────────────────────────────────────────────┐
│  ├─ Physics Reconstruction Engine (proprietary)                 │
│  ├─ Multi-Physics Solver Integration                            │
│  ├─ Model Weights & Training Pipeline                           │
│  ├─ Customer Data Management                                    │
│  ├─ Production Evidence & Audit                                 │
│  └─ Enterprise Security & Compliance                            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### Frontend (React + TypeScript)
**Location**: `apps/cont-demo-web/src/`

```
Frontend
├─ Pages
│  ├─ Landing.tsx          # Hero + intro
│  ├─ ProductPortfolio.tsx # ConT Physics/Fabs/Studio
│  ├─ HybridBondingDemo.tsx# Interactive demo
│  ├─ MPStateInspector.tsx # Explore reconstructed state
│  ├─ WhatIfAnalysis.tsx   # Scenario comparison
│  ├─ Evidence.tsx         # Validation results
│  └─ Architecture.tsx     # System diagram
│
├─ Components
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ Visualization3D.tsx  # Three.js scenes
│  ├─ DataViewer.tsx       # JSON/table viewer
│  └─ Forms/               # Input forms
│
└─ Hooks & Utilities
   ├─ useMockAPI.ts
   ├─ useSyntheticData.ts
   └─ constants.ts
```

**Technologies**:
- React 18+
- TypeScript strict mode
- Vite (build tool)
- Three.js (3D visualization)
- Tailwind CSS (styling)

---

### Mock API Server (Express + Node.js)
**Location**: `packages/mock-api/src/`

```
Mock API
├─ Server.ts
├─ Routes
│  ├─ health.ts         # GET  /api/demo/health
│  ├─ scenarios.ts      # GET  /api/demo/scenarios
│  ├─ reconstruct.ts    # POST /api/demo/reconstruct
│  ├─ what-if.ts        # POST /api/demo/what-if
│  ├─ compare.ts        # POST /api/demo/compare
│  ├─ rollout.ts        # POST /api/demo/future-rollout
│  └─ evidence.ts       # GET  /api/demo/evidence/{id}
│
└─ Middleware
   ├─ auth.ts           # Demo auth
   ├─ logging.ts        # Request logging
   └─ errors.ts         # Error handling
```

**Features**:
- RESTful API
- Mock responses (synthetic data)
- Request validation
- CORS support
- Comprehensive logging

---

### Public Contracts & Types
**Location**: `packages/public-contracts/src/`

```
Contracts
├─ Observation.ts       # Input: raw observations
├─ MPState.ts          # Reconstructed physical state
├─ FutureRollout.ts    # Predictions
├─ Evidence.ts         # Validation & risk
├─ Scenario.ts         # What-if parameters
└─ Common.ts           # Shared types
```

**All are TypeScript interfaces** for:
- Type safety across frontend/backend
- Documentation via JSDoc
- Auto-generated API docs

---

### Synthetic Data Layer
**Location**: `data/synthetic/`, `examples/`

```
Synthetic Data
├─ Hybrid Bonding
│  ├─ observations/     # Raw sensor data
│  ├─ mpstates/        # Reconstructed states
│  ├─ rollouts/        # Predictions
│  └─ evidence/        # Validation results
│
├─ Thermal Process
│  └─ [similar structure]
│
└─ MPState
   └─ [generic examples]
```

**All marked with**: `"production_valid": false`

---

## 3. Data Flow

### Workflow 1: View Observation & Reconstruction

```
User Browser
    │
    ├─ GET /api/demo/scenarios
    │   ↓
    │ Mock API returns list
    │   ↓
    └─ Render Scenario Selector
    
User selects "Hybrid Bonding Demo"
    │
    ├─ GET /api/demo/reconstruct?scenario=hb-001
    │   ↓
    │ Mock API loads synthetic data:
    │   - observation.json
    │   - mpstate.json (reconstructed fields)
    │   ↓
    ├─ Frontend renders:
    │   - Thermal image (observation)
    │   - 3D stress field visualization
    │   - Current density heatmap
    │   ↓
    └─ User explores MPState
```

### Workflow 2: What-if Comparison

```
User enters parameters
    │
    ├─ POST /api/demo/what-if
    │   {
    │     "scenario": "hb-001",
    │     "parameter_delta": {
    │       "temperature": 260,  // vs baseline 250
    │       "time_s": 40         // vs baseline 30
    │     }
    │   }
    │   ↓
    │ Mock API:
    │   - Loads baseline MPState
    │   - Loads what-if prediction
    │   - Returns both
    │   ↓
    ├─ Frontend displays:
    │   - Side-by-side comparison
    │   - Diff highlighting
    │   - Risk score changes
    │   ↓
    └─ User sees "Temperature +10°C → Warpage -0.3μm" ✓
```

### Workflow 3: Evidence & Validation

```
User views prediction results
    │
    ├─ GET /api/demo/evidence/hb-001
    │   ↓
    │ Mock API returns:
    │   {
    │     "prediction": {...},
    │     "measurement": {...},
    │     "validation": {
    │       "status": "PASS",
    │       "confidence": 0.91,
    │       "void_risk": 0.032,
    │       "warpage_um": 1.8,
    │       "acceptance_criteria": {
    │         "void_risk_max": 0.05,
    │         "warpage_max_um": 2.0
    │       }
    │     }
    │   }
    │   ↓
    ├─ Frontend renders Evidence Board:
    │   - Prediction vs Measurement
    │   - Risk scores (color-coded)
    │   - Acceptance criteria (pass/fail)
    │   - Recommended action
    │   ↓
    └─ User can "Approve" (signed evidence)
```

---

## 4. API Contracts

### Health Check
```
GET /api/demo/health
→ 200 OK
{
  "status": "healthy",
  "version": "0.1.0",
  "mode": "public_demo",
  "data_origin": "synthetic"
}
```

### List Scenarios
```
GET /api/demo/scenarios
→ 200 OK
[
  {
    "id": "hb-001",
    "name": "Hybrid Bonding - Baseline",
    "process": "hybrid_bonding",
    "description": "Standard bonding parameters"
  },
  ...
]
```

### Reconstruct (Get Observation + MPState)
```
POST /api/demo/reconstruct
{
  "scenario_id": "hb-001"
}
→ 200 OK
{
  "observation": {
    "thermal_image_url": "...",
    "temperature_c": 250,
    ...
  },
  "mpstate": {
    "current_density_field": "...",
    "joule_heating_field": "...",
    "thermal_stress_field": "...",
    "warpage_um": 1.8,
    ...
  },
  "metadata": {
    "mode": "public_demo",
    "data_origin": "synthetic",
    "production_valid": false
  }
}
```

### What-if Comparison
```
POST /api/demo/what-if
{
  "baseline_scenario": "hb-001",
  "parameter_delta": {
    "temperature": 260,
    "time_s": 40
  }
}
→ 200 OK
{
  "baseline": {...},
  "scenario": {...},
  "comparison": {
    "warpage_delta_um": -0.3,
    "void_risk_delta": -0.012,
    "recommendation": "Temperature increase favorable"
  }
}
```

### Evidence & Validation
```
GET /api/demo/evidence/hb-001
→ 200 OK
{
  "scenario_id": "hb-001",
  "prediction": {
    "warpage_um": 1.8,
    "void_risk": 0.032,
    "confidence": 0.91
  },
  "measurement": {
    "warpage_um": 1.7,
    "void_detected": false
  },
  "validation": {
    "status": "PASS",
    "warpage_check": "PASS",
    "void_risk_check": "PASS",
    "overall_confidence": 0.91
  },
  "decision": {
    "recommendation": "APPROVE",
    "risk_level": "LOW"
  }
}
```

---

## 5. Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Visualization**: Three.js
- **State Management**: React Hooks / Context
- **Testing**: Vitest, React Testing Library

### Backend (Mock API)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod / Joi
- **Testing**: Jest, Supertest

### Data & Types
- **Contracts**: TypeScript Interfaces
- **Synthetic Data**: JSON files
- **No Database** (demo only)

### DevOps
- **VCS**: Git
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, TypeScript
- **Security**: Secret scanning, dependency audit

---

## 6. Deployment Architecture

### Local Development
```
Developer Machine
├─ Frontend (npm run dev)      → localhost:3000
├─ Mock API (npm run api)      → localhost:4000
└─ Synthetic data (local)
```

### Production Demo (Coming)
```
ConT-Public-Demo @ GitHub
├─ Frontend (Vercel / Netlify) → cont-demo.conception.ai
├─ API (Heroku / Railway)      → api.cont-demo.conception.ai
└─ Data (GitHub / S3)
```

---

## 7. Security Architecture

### In This Demo
- ✅ No real authentication (dev mode)
- ✅ No database
- ✅ No sensitive data
- ✅ CORS for local testing
- ✅ Request validation

### In Production ConT
- ✅ OAuth 2.0 / SSO
- ✅ Role-based access control (RBAC)
- ✅ Data encryption (TLS, at-rest)
- ✅ Audit logging
- ✅ Customer data isolation
- ✅ Compliance (ISO, SOC2, etc.)

---

## 8. Extensibility

### Add a New Demo Scenario

1. **Create synthetic data**
   ```
   examples/your-process/sample_*.json
   ```

2. **Add API endpoint**
   ```typescript
   // packages/mock-api/src/routes/your-process.ts
   router.post('/api/demo/your-process', async (req, res) => {
     // Load data, return response
   });
   ```

3. **Add UI page**
   ```typescript
   // apps/cont-demo-web/src/pages/YourProcessDemo.tsx
   export default function YourProcessDemo() { ... }
   ```

4. **Update navigation**
   ```typescript
   // Link in Header.tsx
   ```

---

## 9. Known Limitations

### Demo Only
- ❌ No real physics reconstruction (mock data)
- ❌ No actual solver integration
- ❌ No model training or adaptation
- ❌ No customer data support
- ❌ No scalability (single-user)
- ❌ No persistence (in-memory)

### For Production
✅ See [SECURITY_BOUNDARY.md](SECURITY_BOUNDARY.md)

---

## 10. Development & Contribution

### Getting Started
```bash
git clone https://github.com/goosang-jung/ConT-Public-Demo.git
npm install
npm run dev
```

### Project Structure
```
ConT-Public-Demo/
├─ apps/cont-demo-web/    # Frontend
├─ packages/
│  ├─ public-contracts/    # Types
│  └─ mock-api/            # Backend
├─ examples/               # Demo datasets
├─ docs/                   # Documentation
└─ tests/                  # Tests
```

---

**Version**: 1.0  
**Last Updated**: 2026-07-15  
**Next Section**: [CONCEPTS.md](CONCEPTS.md)
