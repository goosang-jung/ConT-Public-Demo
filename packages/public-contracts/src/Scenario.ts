/**
 * Scenario: Named, reusable demo scenarios
 *
 * A scenario bundles: observation + metadata + context
 * Multiple scenarios demonstrate different aspects of ConT
 */

import {
  ManufacturingProcess,
  AcceptanceCriterion,
  ScenarioMetadata,
  ProcessParameters,
} from "./Common";
import { Observation } from "./Observation";

/**
 * Demo scenario definition
 */
export interface DemoScenario {
  /** Scenario metadata */
  metadata: ScenarioMetadata;

  /** Manufacturing process */
  process: ManufacturingProcess;

  /** Acceptance criteria for this scenario */
  acceptance_criteria: AcceptanceCriterion[];

  /** Sample observation (can be fetched separately) */
  observation?: Observation;

  /** Process parameters for baseline */
  baseline_parameters: ProcessParameters;

  /** Alternative parameters for what-if */
  alternative_parameters?: ProcessParameters[];

  /** Use case description */
  use_case: string;

  /** Key learning points */
  learning_points: string[];

  /** Expected outcomes (for demo reference) */
  expected_outcomes?: {
    warpage_um?: number;
    void_risk?: number;
    crack_risk?: number;
  };
}

/**
 * List of available demo scenarios
 */
export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  "hb-001": {
    metadata: {
      id: "hb-001",
      name: "Hybrid Bonding - Standard Process",
      description:
        "Standard wafer bonding with typical thermal profile. Shows how ConT reconstructs hidden physics from observations.",
      process: ManufacturingProcess.HybridBonding,
      is_baseline: true,
      created_at: "2026-07-01T00:00:00Z",
      modified_at: "2026-07-15T00:00:00Z",
    },

    process: ManufacturingProcess.HybridBonding,

    baseline_parameters: {
      temperature_c: 250,
      time_s: 30,
      pressure_mpa: 10,
      voltage_v: 5.0,
      current_a: 15.0,
    },

    alternative_parameters: [
      {
        temperature_c: 260,
        time_s: 30,
        pressure_mpa: 10,
      },
      {
        temperature_c: 240,
        time_s: 35,
        pressure_mpa: 10,
      },
    ],

    acceptance_criteria: [
      {
        name: "void_risk",
        description: "Maximum void probability at interface",
        threshold_type: "less_than",
        threshold_value: 0.05,
        unit: "probability",
        weight: 9,
      },
      {
        name: "warpage",
        description: "Out-of-plane warpage after cooling",
        threshold_type: "less_than",
        threshold_value: 2.0,
        unit: "μm",
        weight: 8,
      },
      {
        name: "crack_risk",
        description: "Probability of micro-cracks at interface",
        threshold_type: "less_than",
        threshold_value: 0.02,
        unit: "probability",
        weight: 9,
      },
      {
        name: "alignment",
        description: "Die-to-substrate alignment error",
        threshold_type: "less_than",
        threshold_value: 1.0,
        unit: "μm",
        weight: 7,
      },
    ],

    use_case:
      "Learn how ConT predicts bonding quality from thermal and electrical observations. Explore what-if scenarios to optimize process parameters.",

    learning_points: [
      "How inverse physics reconstructs hidden fields (current density, stress)",
      "Why warpage and voids occur (coupled thermal-mechanical effects)",
      "How what-if analysis helps optimize parameters",
      "How risk scores guide production decisions",
      "How ConT combines prediction + measurement for evidence",
    ],

    expected_outcomes: {
      warpage_um: 1.8,
      void_risk: 0.032,
      crack_risk: 0.008,
    },
  },

  "hb-002": {
    metadata: {
      id: "hb-002",
      name: "Hybrid Bonding - High Temperature Process",
      description:
        "Elevated temperature bonding for strength optimization. Shows trade-offs between warpage and interfacial strength.",
      process: ManufacturingProcess.HybridBonding,
      is_baseline: false,
      created_at: "2026-07-10T00:00:00Z",
      modified_at: "2026-07-15T00:00:00Z",
    },

    process: ManufacturingProcess.HybridBonding,

    baseline_parameters: {
      temperature_c: 300,
      time_s: 45,
      pressure_mpa: 15,
      voltage_v: 6.0,
      current_a: 18.0,
    },

    acceptance_criteria: [
      {
        name: "void_risk",
        description: "Maximum void probability",
        threshold_type: "less_than",
        threshold_value: 0.08,
        unit: "probability",
        weight: 8,
      },
      {
        name: "warpage",
        description: "Out-of-plane warpage",
        threshold_type: "less_than",
        threshold_value: 3.0,
        unit: "μm",
        weight: 7,
      },
    ],

    use_case:
      "Explore higher-temperature bonding strategy. Understand yield vs warpage tradeoff.",

    learning_points: [
      "Effect of temperature on void formation",
      "Thermal gradient impact on warpage",
      "Stress distribution at elevated temperatures",
      "When to use high-temperature strategy",
    ],

    expected_outcomes: {
      warpage_um: 2.2,
      void_risk: 0.045,
      crack_risk: 0.006,
    },
  },

  "tp-001": {
    metadata: {
      id: "tp-001",
      name: "Thermal Process - Reflow Solder",
      description:
        "Solder reflow thermal profile. Shows transient thermal effects and residual stress.",
      process: ManufacturingProcess.ThermalProcess,
      is_baseline: true,
      created_at: "2026-07-05T00:00:00Z",
      modified_at: "2026-07-15T00:00:00Z",
    },

    process: ManufacturingProcess.ThermalProcess,

    baseline_parameters: {
      temperature_c: 250,
      time_s: 120,
      pressure_mpa: 0,
    },

    acceptance_criteria: [
      {
        name: "residual_stress",
        description: "Peak residual stress after cooling",
        threshold_type: "less_than",
        threshold_value: 100,
        unit: "MPa",
        weight: 8,
      },
      {
        name: "warpage",
        description: "Board warpage after reflow",
        threshold_type: "less_than",
        threshold_value: 1.5,
        unit: "mm",
        weight: 7,
      },
    ],

    use_case:
      "Understand thermal history and residual stress in solder reflow. Optimize cooling profiles.",

    learning_points: [
      "Transient thermal effects during reflow",
      "Solder joint stress distribution",
      "Board warpage mechanisms",
      "Cooling curve optimization",
    ],

    expected_outcomes: {
      warpage_um: 800,
      crack_risk: 0.015,
    },
  },
};

/**
 * Get scenario by ID
 */
export function getScenario(id: string): DemoScenario | undefined {
  return DEMO_SCENARIOS[id];
}

/**
 * List all scenario IDs
 */
export function listScenarioIds(): string[] {
  return Object.keys(DEMO_SCENARIOS);
}

/**
 * List all scenarios (for API endpoint)
 */
export function listScenarios(): Array<{
  id: string;
  name: string;
  process: ManufacturingProcess;
  description: string;
}> {
  return Object.entries(DEMO_SCENARIOS).map(([id, scenario]) => ({
    id,
    name: scenario.metadata.name,
    process: scenario.process,
    description: scenario.metadata.description,
  }));
}
