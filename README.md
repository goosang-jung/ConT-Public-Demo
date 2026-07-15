# ConT — Manufacturing Physical AI Platform

**Reconstruct Hidden Physics. Predict Future Manufacturing States. Validate Every Decision with Evidence.**

---

## What is ConT?

ConT is **not** another dashboard or solver.

It is a **Manufacturing Physics Control & Evidence Layer** that connects:
- 🏭 Factory observations (images, sensors, measurements)
- 🔬 Physical models (inverse physics, multi-physics)
- 🤖 AI models (manufacturing intelligence)
- ⚖️ Commercial solvers (FEA, CFD, process simulators)
- ✅ Validation rules & human approval

ConT reconstructs **hidden physics** from observations, builds **canonical physical states** (MPState), predicts **future manufacturing outcomes**, and generates **production-grade evidence** for every decision.

---

## ConT Product Suite

### **ConT Physics**
Inverse physics reconstruction engine for manufacturing processes.
- Hidden Physics Reconstruction
- Multi-Physics Intelligence  
- Canonical Physical State (MPState)

### **ConT Fabs**
Manufacturing process control & optimization.
- **Hybrid Bonding** (wafer bonding, thermal analysis, alignment)
- **Thermal Processes** (heat treatment, reflow, CVD)
- **Packaging & Assembly** (coming soon)

### **ConT Studio**
Visual evidence platform for manufacturers.
- What-if analysis
- Future rollout prediction
- Evidence generation & validation
- Production decision support

---

## Core Workflow

```
┌─ Observation ──────────────────────────────┐
│  (Images, sensors, measurements)           │
│                                            │
│ Reconstructed Physics                      │
│  (Hidden stress, current, thermal fields)  │
│                                            │
│ Canonical Physical State (MPState)         │
│  (Unified representation)                  │
│                                            │
│ Future Rollout & What-if                   │
│  (Predict next steps, compare scenarios)   │
│                                            │
│ Evidence & Validation                      │
│  (Confidence, risk, production decision)   │
│                                            │
│ Review & Approve                           │
│  (Human decision + signature)              │
└────────────────────────────────────────────┘
```

---

## Get Started

### Requirements
- Node.js 18+
- Python 3.10+
- 4GB RAM

### Installation

```bash
git clone https://github.com/goosang-jung/ConT-Public-Demo.git
cd ConT-Public-Demo

# Install dependencies
npm install

# Start demo server
npm run dev
```

Open `http://localhost:3000` and explore the **Hybrid Bonding Demo**.

### Quick Start Guide
👉 See [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md) for step-by-step walkthrough.

---

## What's in This Repository?

This is a **public showcase** of the ConT platform.

✅ **Included:**
- Product concept and architecture
- Public API contracts
- Mock API server (for testing concepts)
- Synthetic demo datasets
- Web UI showcase (landing, portfolio, demo)
- Evidence validation workflow
- Usage examples

❌ **Not Included:**
- Production algorithms (proprietary)
- Real customer data
- Commercial solver integrations
- Model weights
- Actual reconstruction engines

**For production use, commercial integration, or licensing**, contact [sales@conception.ai](mailto:sales@conception.ai).

---

## Demo Highlights

### Hybrid Bonding Wafer Demo
See how ConT analyzes wafer bonding processes:

1. **Observation** → Thermal image of bonded wafer
2. **Reconstruction** → Hidden current density, Joule heating, thermal stress
3. **MPState** → Unified physical state representation
4. **What-if** → Compare different process parameters
5. **Rollout** → Predict void risk, alignment errors, warpage
6. **Evidence** → Confidence scores, validation rules, approval workflow

**Try it**: Start the server and visit `/hybrid-bonding-demo`

### Key Screens
- **Landing** — Product overview
- **Product Portfolio** — ConT Physics / ConT Fabs / ConT Studio
- **Hybrid Bonding Demo** — Interactive process visualization
- **MPState Inspector** — Explore canonical physical states
- **What-if Analysis** — Compare baseline vs scenarios
- **Evidence Board** — Validation results & production decisions

---

## Documentation

- **[PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md)** — ConT concept and use cases
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — System architecture (high-level)
- **[CONCEPTS.md](docs/CONCEPTS.md)** — Manufacturing physics terminology
- **[DEMO_GUIDE.md](docs/DEMO_GUIDE.md)** — How to run and explore the demo
- **[SECURITY_BOUNDARY.md](docs/SECURITY_BOUNDARY.md)** — What's in public demo vs production
- **[ROADMAP_PUBLIC.md](docs/ROADMAP_PUBLIC.md)** — Public feature roadmap

---

## API & Integration

### Public API Contracts
The demo includes **mock APIs** for integration testing:

```typescript
// Public endpoints (mock responses)
GET  /api/demo/health
GET  /api/demo/scenarios
POST /api/demo/reconstruct
POST /api/demo/what-if
POST /api/demo/compare
POST /api/demo/future-rollout
GET  /api/demo/evidence/{run_id}
```

See **[packages/public-contracts/](packages/public-contracts/)** for TypeScript interfaces.

### Examples
- [Hybrid Bonding Observation](examples/hybrid-bonding/sample_observation.json)
- [MPState Reconstruction](examples/hybrid-bonding/sample_mpstate.json)
- [Future Rollout Prediction](examples/hybrid-bonding/sample_future_rollout.json)
- [Evidence Report](examples/hybrid-bonding/sample_evidence.json)

---

## Security & Data Privacy

- ✅ This demo uses **synthetic data only** (no production data)
- ✅ All data marked as `"production_valid": false`
- ✅ Suitable for evaluation, not production decisions
- ⚠️ See [SECURITY_BOUNDARY.md](docs/SECURITY_BOUNDARY.md) for details

**Vulnerability Report**: See [SECURITY.md](SECURITY.md)

---

## License

Copyright © Conception Co., Ltd. All Rights Reserved.

This repository is provided for **evaluation and demonstration purposes only**.

**Permitted:**
- ✅ View, study, and understand ConT concepts
- ✅ Run the demo locally for evaluation
- ✅ Provide feedback and suggestions

**Prohibited:**
- ❌ Reverse engineering or extracting proprietary algorithms
- ❌ Commercial use or redistribution
- ❌ Training AI models on this code

For commercial licensing, production use, or integration:  
📧 [contact@conception.ai](mailto:contact@conception.ai)

See [LICENSE](LICENSE) and [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## Contributing

We welcome feedback, bug reports, and feature suggestions!

- 💬 [GitHub Issues](https://github.com/goosang-jung/ConT-Public-Demo/issues)
- 📧 [Email](mailto:contact@conception.ai)
- 🐦 [Twitter](https://twitter.com/conception_ai)

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Contact & Support

**Demo Questions**  
💬 Open an issue on GitHub

**Product Interest**  
📧 [contact@conception.ai](mailto:contact@conception.ai)

**Commercial Licensing**  
📧 [sales@conception.ai](mailto:sales@conception.ai)

---

## About Conception

[Conception](https://conception.ai) is a **Manufacturing Physical AI** company.

We help manufacturers predict and prevent defects, optimize processes, and make evidence-grounded decisions — by reconstructing the hidden physics that drives manufacturing.

- 🌐 Website: [conception.ai](https://conception.ai)
- 📖 Blog: [conception.ai/blog](https://conception.ai/blog)
- 🐦 Twitter: [@conception_ai](https://twitter.com/conception_ai)

---

## Acknowledgments

ConT is built with:
- React & TypeScript (frontend)
- Node.js & Express (backend)
- Python & FastAPI (ML/physics services)
- Open-source libraries (see package.json)

---

**Last Updated**: 2026-07-15  
**Version**: 0.1.0 (Public Demo)  
**Status**: ✨ Public Showcase — Not Production Ready
