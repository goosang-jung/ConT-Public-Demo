/**
 * FutureRollout: Predictions of future manufacturing outcomes
 *
 * OUTPUT of forward physics simulation / what-if analysis
 * Based on current MPState + process parameters
 *
 * In production: Result of solver-in-the-loop simulation
 * In demo: Synthetic predictions
 */

import {
  ProcessParameters,
  ConfidenceScore,
  RiskScore,
  ManufacturingProcess,
  createConfidenceScore,
  createRiskScore,
} from "./Common";

/**
 * Predicted outcome at a single timestep
 */
export interface PredictionTimeStep {
  /** Simulation time (seconds) */
  time_s: number;

  /** Predicted temperature (°C) */
  temperature_c?: number;

  /** Predicted warpage (μm) */
  warpage_um?: number;

  /** Predicted stress (MPa) */
  stress_mpa?: number;

  /** Predicted void probability */
  void_probability?: number;

  /** Predicted crack probability */
  crack_probability?: number;
}

/**
 * Outcome distribution (uncertainty quantification)
 * Shows range of possible outcomes
 */
export interface OutcomeDistribution {
  /** Metric name (e.g., "warpage_um") */
  metric: string;

  /** Percentile values */
  percentiles: {
    p10: number; // 10th percentile
    p25: number;
    p50: number; // Median
    p75: number;
    p90: number; // 90th percentile
  };

  /** Distribution shape ("normal", "skewed", etc.) */
  distribution_type?: string;

  /** Mean value */
  mean: number;

  /** Standard deviation */
  std_dev: number;
}

/**
 * Future rollout scenario
 */
export interface RolloutScenario {
  /** Scenario identifier */
  scenario_id: string;

  /** Name/description */
  name: string;

  /** Process parameters for this scenario */
  parameters: ProcessParameters;

  /** === Predicted Outcomes === */
  predictions: {
    /** Time-series predictions */
    time_series?: PredictionTimeStep[];

    /** Final warpage (μm) */
    final_warpage_um: number;

    /** Final interface gap (nm) */
    final_interface_gap_nm: number;

    /** Final peak stress (MPa) */
    final_peak_stress_mpa: number;

    /** Predicted void probability (0-1) */
    void_probability: number;

    /** Predicted crack probability (0-1) */
    crack_probability: number;

    /** Delamination probability (0-1) */
    delamination_probability?: number;

    /** Overall pass/fail prediction */
    pass_prediction: boolean;

    /** Confidence in this prediction (0-1) */
    confidence: ConfidenceScore;
  };

  /** === Uncertainty === */
  uncertainty: {
    /** Outcome distributions (UQ) */
    warpage_distribution?: OutcomeDistribution;
    stress_distribution?: OutcomeDistribution;
    void_distribution?: OutcomeDistribution;

    /** Estimated accuracy (%) */
    estimated_accuracy_pct?: number;
  };

  /** === Notes === */
  notes?: string;
}

/**
 * Future rollout: Complete prediction
 */
export interface FutureRollout {
  /** ID */
  rollout_id: string;

  /** Reference to scenario/observation */
  scenario_id: string;

  /** Process type */
  process: ManufacturingProcess;

  /** Timestamp */
  timestamp: string; // ISO 8601

  /** === Baseline Scenario === */
  baseline_scenario: RolloutScenario;

  /** === Alternative Scenarios (What-if) === */
  alternative_scenarios?: RolloutScenario[];

  /** === Comparative Analysis === */
  comparison?: {
    /** Best scenario (lowest risk) */
    best_scenario_id?: string;

    /** Worst scenario (highest risk) */
    worst_scenario_id?: string;

    /** Recommended scenario (best tradeoff) */
    recommended_scenario_id?: string;

    /** Key differences between scenarios */
    key_differences?: string[];
  };

  /** === Overall Assessment === */
  assessment: {
    /** Average void risk across scenarios */
    average_void_risk: RiskScore;

    /** Average crack risk */
    average_crack_risk: RiskScore;

    /** Robustness: how sensitive to parameter variation */
    robustness_score?: number; // 0-1

    /** Recommendation: PASS, FAIL, or REVIEW */
    recommendation: "PASS" | "FAIL" | "REVIEW";

    /** Explanation */
    explanation: string;
  };

  /** === Metadata === */
  metadata: {
    /** Is this synthetic data? */
    is_synthetic: true;

    /** Source */
    source: "demo_synthetic" | "surrogate_model" | "solver";

    /** Simulation engine used */
    engine?: string;

    /** Number of timesteps */
    timesteps?: number;

    /** Total prediction time (ms) */
    computation_time_ms?: number;
  };
}

/**
 * What-if comparison result
 * Shows delta between two scenarios
 */
export interface WhatIfComparison {
  /** Baseline scenario ID */
  baseline_id: string;

  /** Alternative scenario ID */
  alternative_id: string;

  /** === Deltas (Alternative - Baseline) === */
  deltas: {
    /** Change in warpage (μm) */
    warpage_delta_um: number;

    /** Change in stress (MPa) */
    stress_delta_mpa: number;

    /** Change in void risk (percentage points) */
    void_risk_delta_pct: number;

    /** Change in crack risk */
    crack_risk_delta_pct: number;
  };

  /** === Interpretation === */
  interpretation: {
    /** Effect direction */
    overall_effect: "improved" | "worsened" | "neutral";

    /** Key changes */
    key_changes: string[];

    /** Recommendation */
    recommendation: string;

    /** Risk assessment */
    risk_assessment: string;
  };

  /** === Statistical Confidence === */
  confidence: ConfidenceScore;

  /** Timestamp */
  timestamp: string;
}

/**
 * Create demo rollout scenario
 */
export function createDemoRolloutScenario(
  scenarioId: string,
  parameters: ProcessParameters,
  overrides?: Partial<RolloutScenario>
): RolloutScenario {
  return {
    scenario_id: scenarioId,
    name: `Rollout for ${scenarioId}`,
    parameters,

    predictions: {
      final_warpage_um: 1.8,
      final_interface_gap_nm: 15,
      final_peak_stress_mpa: 450,
      void_probability: 0.032,
      crack_probability: 0.008,
      pass_prediction: true,
      confidence: createConfidenceScore(0.91),
    },

    uncertainty: {
      warpage_distribution: {
        metric: "warpage_um",
        percentiles: {
          p10: 1.2,
          p25: 1.5,
          p50: 1.8,
          p75: 2.1,
          p90: 2.5,
        },
        mean: 1.8,
        std_dev: 0.35,
      },
      estimated_accuracy_pct: 91,
    },

    ...overrides,
  };
}

/**
 * Create demo future rollout
 */
export function createDemoFutureRollout(
  scenarioId: string,
  process: ManufacturingProcess
): FutureRollout {
  const baselineParams: ProcessParameters = {
    temperature_c: 250,
    time_s: 30,
  };

  return {
    rollout_id: `rollout-${Date.now()}`,
    scenario_id: scenarioId,
    process,
    timestamp: new Date().toISOString(),

    baseline_scenario: createDemoRolloutScenario(
      `${scenarioId}-baseline`,
      baselineParams
    ),

    alternative_scenarios: [
      createDemoRolloutScenario(
        `${scenarioId}-alt1`,
        { temperature_c: 260, time_s: 30 }, // Higher temp
        {
          predictions: {
            final_warpage_um: 1.5,
            final_interface_gap_nm: 12,
            final_peak_stress_mpa: 420,
            void_probability: 0.021,
            crack_probability: 0.005,
            pass_prediction: true,
            confidence: createConfidenceScore(0.89),
          },
        }
      ),
      createDemoRolloutScenario(
        `${scenarioId}-alt2`,
        { temperature_c: 240, time_s: 35 }, // Lower temp, longer time
        {
          predictions: {
            final_warpage_um: 2.1,
            final_interface_gap_nm: 22,
            final_peak_stress_mpa: 480,
            void_probability: 0.055,
            crack_probability: 0.012,
            pass_prediction: false,
            confidence: createConfidenceScore(0.87),
          },
        }
      ),
    ],

    comparison: {
      best_scenario_id: `${scenarioId}-alt1`,
      worst_scenario_id: `${scenarioId}-alt2`,
      recommended_scenario_id: `${scenarioId}-baseline`,
      key_differences: [
        "Higher temperature reduces warpage but increases stress",
        "Lower temperature increases void risk",
      ],
    },

    assessment: {
      average_void_risk: createRiskScore(0.036),
      average_crack_risk: createRiskScore(0.008),
      robustness_score: 0.82,
      recommendation: "PASS",
      explanation:
        "All scenarios result in acceptable outcomes. Baseline recommended for robustness.",
    },

    metadata: {
      is_synthetic: true,
      source: "demo_synthetic",
      engine: "surrogate_model",
      timesteps: 10,
      computation_time_ms: 150,
    },
  };
}

/**
 * Create demo what-if comparison
 */
export function createDemoWhatIfComparison(
  baselineId: string,
  alternativeId: string
): WhatIfComparison {
  return {
    baseline_id: baselineId,
    alternative_id: alternativeId,

    deltas: {
      warpage_delta_um: -0.3,
      stress_delta_mpa: -30,
      void_risk_delta_pct: -1.1,
      crack_risk_delta_pct: -0.3,
    },

    interpretation: {
      overall_effect: "improved",
      key_changes: [
        "Warpage reduced by 0.3 μm",
        "Peak stress reduced by 30 MPa",
        "Void risk reduced by 1.1%",
      ],
      recommendation:
        "Temperature increase to 260°C improves outcomes across all metrics",
      risk_assessment: "Lower risk in alternative scenario",
    },

    confidence: createConfidenceScore(0.89),
    timestamp: new Date().toISOString(),
  };
}
