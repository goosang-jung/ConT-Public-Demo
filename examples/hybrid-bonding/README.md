# Hybrid Bonding Demo Example

**Demonstration of ConT's Hybrid Bonding workflow with synthetic data**

---

## Overview

This directory contains sample JSON files showing a complete ConT workflow for **wafer hybrid bonding**:

```
Observation (sample_observation.json)
    ↓
Reconstructed Physics (sample_mpstate.json)
    ↓
Future Predictions (sample_future_rollout.json)
    ↓
Production Decision (sample_evidence.json)
```

---

## Files

### 1. `sample_observation.json`
**Raw manufacturing data from sensors**

Contains:
- Thermal measurements (temperature, IR image reference)
- Electrical data (voltage, current, power)
- Mechanical data (force, pressure, alignment)
- Material properties (silicon die, substrate)
- Process parameters (temperature 250°C, 30s)
- Sensor readings (3 measurements)

**Key Point:** ⚠️ All data is **synthetic** and marked `"is_synthetic": true`

```json
{
  "scenario_id": "hb-001",
  "process": "hybrid_bonding",
  "temperature_c": 250,
  "time_s": 30,
  "metadata": {
    "is_synthetic": true,
    "source": "demo_generated"
  }
}
```

---

### 2. `sample_mpstate.json`
**Reconstructed Canonical Manufacturing Physical State**

Contains:
- **Thermal field**: Temperature distribution, peak 260°C
- **Electrical field**: Current density distribution, peak 2.5 A/mm²
- **Joule heating field**: Heat generation map
- **Mechanical field**: Stress distribution, peak 450 MPa
- **Deformation field**: Warpage prediction (1.8 μm)
- **Interface state**: Gap 15 nm, void probability 3.2%
- **Defect risk**: Crack probability 0.8%
- **Reconstruction confidence**: 91%

**Key Learning:** This is the "hidden physics" ConT reconstructs from the raw observation.

Field references are synthetic:
```json
{
  "thermal": {
    "temperature_field": {
      "field_type": "temperature",
      "shape": [64, 64, 32],
      "data_ref": "synthetic://hb-001/thermal_field",
      "peak_value": 260
    }
  }
}
```

In production, `data_ref` would point to actual field arrays.

---

### 3. `sample_future_rollout.json`
**Predictions for different process scenarios**

Contains:
- **Baseline scenario** (250°C, 30s)
  - Predicted warpage: 1.8 μm
  - Void probability: 3.2%
  - Pass prediction: ✓ PASS

- **Alternative 1** (260°C, 30s - higher temp)
  - Warpage: 1.5 μm (improved ↓)
  - Void probability: 2.1% (improved ↓)
  - Stress: 420 MPa (reduced ↓)
  - Pass prediction: ✓ PASS

- **Alternative 2** (240°C, 35s - lower temp)
  - Warpage: 2.1 μm (worsened ↑)
  - Void probability: 5.5% (worsened ↑)
  - Pass prediction: ✗ FAIL

**What-if Analysis:**
```json
{
  "alternative_scenarios": [
    {
      "scenario_id": "hb-001-alt-high-temp",
      "parameters": {
        "temperature_c": 260
      },
      "predictions": {
        "final_warpage_um": 1.5,
        "void_probability": 0.021,
        "pass_prediction": true
      }
    }
  ]
}
```

**Key Learning:** Higher temperature improves outcomes but requires monitoring. Lower temperature increases risk.

---

### 4. `sample_evidence.json`
**Validation report and production decision**

Contains:
- **Prediction vs Measurement**
  - Predicted warpage: 1.8 μm
  - Measured warpage: 1.7 μm
  - Error: 5.6% (acceptable)
  - Status: ✓ MATCHES

- **Validation Results**
  - Void risk criterion: ✓ PASS (3.2% < 5% max)
  - Warpage criterion: ✓ PASS (1.7 μm < 2.0 μm max)
  - Crack risk criterion: ✓ PASS (0.8% < 2.0% max)
  - Alignment criterion: ✓ PASS (0.8 μm < 1.0 μm max)
  - **Overall: 4/4 criteria passed**

- **Risk Assessment**
  - Void risk: LOW (3.2%)
  - Crack risk: LOW (0.8%)
  - Yield estimate: 96.5%
  - Risk factors: Current crowding (manageable), gap variance (within spec)

- **Production Decision**
  - Recommendation: **✓ APPROVE**
  - Justification: All criteria met, prediction validated
  - Confidence: 91%
  - Required actions: Standard production, log evidence

**Key Learning:** Evidence bridges prediction and measurement to make auditable production decisions.

---

## How to Use

### 1. View the Data

```bash
# View observation
cat sample_observation.json | jq '.'

# View just the key metrics
cat sample_mpstate.json | jq '.key_metrics'

# View the decision
cat sample_evidence.json | jq '.decision'
```

### 2. Understand the Workflow

1. **Observation** (sample_observation.json)
   - Q: What did we measure?
   - A: Temperature 250°C, current 15A, alignment 0.8μm offset

2. **Reconstruction** (sample_mpstate.json)
   - Q: What's the hidden physics?
   - A: Warpage 1.8μm, stress 450 MPa, void risk 3.2%

3. **Rollout** (sample_future_rollout.json)
   - Q: What if we change parameters?
   - A: Temp +10°C → Warpage -0.3μm but stress -30 MPa

4. **Evidence** (sample_evidence.json)
   - Q: Should we approve this part?
   - A: YES, prediction matches measurement, all criteria pass

### 3. Integrate into Your Application

```typescript
import observation from './sample_observation.json';
import mpstate from './sample_mpstate.json';
import evidence from './sample_evidence.json';

// Use in React component
<Evidence
  prediction={mpstate.key_metrics}
  measurement={evidence.prediction_vs_measurement.comparisons}
  decision={evidence.decision.recommendation}
/>
```

### 4. Create Your Own Example

Copy this structure for your manufacturing process:

```json
{
  "scenario_id": "your-process-001",
  "observation_id": "obs-xxx",
  "process": "your_process_name",
  "timestamp": "2026-07-15T...",
  
  "metadata": {
    "is_synthetic": true,
    "source": "demo_generated"
  }
}
```

⚠️ **Always include the synthetic marker!**

---

## Key Points

### ✅ This Demo Shows
- Complete workflow from observation to decision
- Hidden physics reconstruction
- What-if scenario analysis
- Evidence-based decision making
- Prediction validation
- Risk assessment
- Acceptance criteria checking

### ❌ This Demo Does NOT Include
- Real reconstruction algorithms
- Actual model weights
- Production solver integration
- Real customer data
- Proprietary techniques

### 🎯 Learning Goals
1. Understand ConT's workflow
2. See what MPState represents
3. Learn what-if analysis
4. Understand evidence generation
5. See how ConT validates predictions

---

## Scenario Details: HB-001

**Hybrid Bonding - Standard Process**

- **Die**: Silicon, 50 μm
- **Substrate**: Silicon, 100 μm
- **Temperature**: 250°C for 30 seconds
- **Force**: 1000 N (10 MPa)
- **Target**: Interface bond quality

**Expected Outcomes**:
- Warpage: ~1.8 μm ✓
- Interface gap: ~15 nm ✓
- Void risk: ~3.2% ✓
- Crack risk: ~0.8% ✓
- **Decision**: APPROVE ✓

---

## More Information

- **API Documentation**: See `/docs/DEMO_GUIDE.md`
- **Architecture**: See `/docs/ARCHITECTURE.md`
- **Types**: See `@cont-public/contracts` package
- **Mock API**: `packages/mock-api/src/routes/`

---

**Last Updated**: 2026-07-15  
**Version**: 0.1.0  
**Status**: ⚠️ Synthetic Demo Data Only
