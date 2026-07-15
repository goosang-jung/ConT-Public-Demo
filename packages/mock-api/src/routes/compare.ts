/**
 * POST /api/demo/compare
 * Compare two scenarios side-by-side
 */

import { Router, Request, Response } from "express";
import {
  createDemoRolloutScenario,
  getScenario,
  ComparisonResult,
} from "@cont-public/contracts";

const router = Router();

/**
 * Compare two scenarios
 */
router.post("/", (req: Request, res: Response) => {
  const { scenario_1_id, scenario_2_id } = req.body;

  if (!scenario_1_id || !scenario_2_id) {
    return res.status(400).json({
      error: true,
      code: "MISSING_SCENARIO_IDS",
      message: "scenario_1_id and scenario_2_id are required",
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

  // Get scenarios
  const scenario1 = getScenario(scenario_1_id);
  const scenario2 = getScenario(scenario_2_id);

  if (!scenario1 || !scenario2) {
    return res.status(404).json({
      error: true,
      code: "SCENARIO_NOT_FOUND",
      message: `One or both scenarios not found`,
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

  // Create rollouts
  const rollout1 = createDemoRolloutScenario(
    scenario_1_id,
    scenario1.baseline_parameters
  );
  const rollout2 = createDemoRolloutScenario(
    scenario_2_id,
    scenario2.baseline_parameters
  );

  // Build comparison results
  const comparisonResults: Record<string, ComparisonResult> = {
    warpage_um: {
      delta: rollout2.predictions.final_warpage_um - rollout1.predictions.final_warpage_um,
      percent_change:
        ((rollout2.predictions.final_warpage_um - rollout1.predictions.final_warpage_um) /
          rollout1.predictions.final_warpage_um) *
        100,
      direction:
        rollout2.predictions.final_warpage_um < rollout1.predictions.final_warpage_um
          ? "improved"
          : "worsened",
      comment: `Warpage ${rollout2.predictions.final_warpage_um < rollout1.predictions.final_warpage_um ? "reduced" : "increased"}`,
    },
    peak_stress_mpa: {
      delta:
        rollout2.predictions.final_peak_stress_mpa -
        rollout1.predictions.final_peak_stress_mpa,
      percent_change:
        ((rollout2.predictions.final_peak_stress_mpa -
          rollout1.predictions.final_peak_stress_mpa) /
          rollout1.predictions.final_peak_stress_mpa) *
        100,
      direction:
        rollout2.predictions.final_peak_stress_mpa < rollout1.predictions.final_peak_stress_mpa
          ? "improved"
          : "worsened",
      comment: `Stress ${rollout2.predictions.final_peak_stress_mpa < rollout1.predictions.final_peak_stress_mpa ? "reduced" : "increased"}`,
    },
    void_risk_pct: {
      delta: (rollout2.predictions.void_probability - rollout1.predictions.void_probability) * 100,
      percent_change:
        ((rollout2.predictions.void_probability - rollout1.predictions.void_probability) /
          rollout1.predictions.void_probability) *
        100,
      direction:
        rollout2.predictions.void_probability < rollout1.predictions.void_probability
          ? "improved"
          : "worsened",
      comment: `Void risk ${rollout2.predictions.void_probability < rollout1.predictions.void_probability ? "lower" : "higher"}`,
    },
  };

  res.json({
    data: {
      scenario_1: {
        id: scenario_1_id,
        name: scenario1.metadata.name,
        rollout: rollout1,
      },
      scenario_2: {
        id: scenario_2_id,
        name: scenario2.metadata.name,
        rollout: rollout2,
      },
      comparison_results: comparisonResults,
      winner:
        Object.values(comparisonResults).filter((r) => r.direction === "improved")
          .length >
        Object.values(comparisonResults).filter((r) => r.direction === "worsened").length
          ? scenario_2_id
          : scenario_1_id,
      summary: `Scenario ${scenario_2_id} has ${
        Object.values(comparisonResults).filter((r) => r.direction === "improved").length > 1
          ? "better overall metrics"
          : "similar or worse metrics"
      } compared to ${scenario_1_id}`,
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
