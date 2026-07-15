/**
 * POST /api/demo/what-if
 * Compare baseline scenario with alternative parameters
 */

import { Router, Request, Response } from "express";
import {
  createDemoWhatIfComparison,
  createDemoRolloutScenario,
  getScenario,
  ProcessParameters,
} from "@cont-public/contracts";

const router = Router();

/**
 * What-if analysis
 */
router.post("/", (req: Request, res: Response) => {
  const { baseline_scenario_id, alternative_scenario_id, parameter_delta } =
    req.body;

  if (!baseline_scenario_id) {
    return res.status(400).json({
      error: true,
      code: "MISSING_BASELINE",
      message: "baseline_scenario_id is required",
      metadata: {
        mode: "public_demo",
        data_origin: "synthetic",
        production_valid: false,
        commercial_engine_included: false,
        timestamp: new Date().toISOString(),
        version: "0.1.0",
      },
    });
  }

  // Get baseline scenario
  const baselineScenario = getScenario(baseline_scenario_id);
  if (!baselineScenario) {
    return res.status(404).json({
      error: true,
      code: "SCENARIO_NOT_FOUND",
      message: `Baseline scenario ${baseline_scenario_id} not found`,
      metadata: {
        mode: "public_demo",
        data_origin: "synthetic",
        production_valid: false,
        commercial_engine_included: false,
        timestamp: new Date().toISOString(),
        version: "0.1.0",
      },
    });
  }

  // Use alternative scenario if provided, otherwise create from delta
  const altScenarioId =
    alternative_scenario_id || `${baseline_scenario_id}-alt`;

  // Create rollout scenarios
  const baseline = createDemoRolloutScenario(
    baseline_scenario_id,
    baselineScenario.baseline_parameters
  );

  const alternativeParams: ProcessParameters = parameter_delta
    ? {
        ...baselineScenario.baseline_parameters,
        ...parameter_delta,
      }
    : baselineScenario.baseline_parameters;

  // Simulate some effects of parameter changes
  let altWarpage = baseline.predictions.final_warpage_um;
  let altStress = baseline.predictions.final_peak_stress_mpa;
  let altVoidRisk = baseline.predictions.void_probability;
  let altCrackRisk = baseline.predictions.crack_probability;

  if (parameter_delta?.temperature_c) {
    const tempDelta = parameter_delta.temperature_c - 250;
    // Higher temp → slightly lower warpage but higher stress
    altWarpage = baseline.predictions.final_warpage_um - tempDelta * 0.01;
    altStress = baseline.predictions.final_peak_stress_mpa + tempDelta * 0.5;
    altVoidRisk = Math.max(0, altVoidRisk - tempDelta * 0.0005);
  }

  const alternative = createDemoRolloutScenario(
    altScenarioId,
    alternativeParams,
    {
      predictions: {
        ...baseline.predictions,
        final_warpage_um: Math.max(0.5, altWarpage),
        final_peak_stress_mpa: Math.max(100, altStress),
        void_probability: Math.max(0.001, altVoidRisk),
        crack_probability: Math.max(0.001, altCrackRisk),
      },
    }
  );

  // Create comparison
  const comparison = createDemoWhatIfComparison(
    baseline_scenario_id,
    altScenarioId
  );

  res.json({
    data: {
      baseline_scenario_id,
      alternative_scenario_id: altScenarioId,
      baseline,
      alternative,
      comparison,
      recommendation:
        comparison.interpretation.overall_effect === "improved"
          ? `Consider switching to ${altScenarioId}: ${comparison.interpretation.recommendation}`
          : `Keep baseline: ${comparison.interpretation.recommendation}`,
    },
    metadata: {
      mode: "public_demo",
      data_origin: "synthetic",
      production_valid: false,
      commercial_engine_included: false,
      timestamp: new Date().toISOString(),
      version: "0.1.0",
    },
  });
});

export default router;
