/**
 * POST /api/demo/reconstruct
 * Get observation and reconstructed MPState for a scenario
 */

import { Router, Request, Response } from "express";
import {
  createDemoObservation,
  createDemoMPState,
  getScenario,
  ManufacturingProcess,
} from "@cont-public/contracts";

const router = Router();

/**
 * Reconstruct: Get observation + MPState
 */
router.post("/", (req: Request, res: Response) => {
  const { scenario_id } = req.body;

  if (!scenario_id) {
    return res.status(400).json({
      error: true,
      code: "MISSING_SCENARIO_ID",
      message: "scenario_id is required",
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

  // Get scenario definition
  const scenario = getScenario(scenario_id);
  if (!scenario) {
    return res.status(404).json({
      error: true,
      code: "SCENARIO_NOT_FOUND",
      message: `Scenario ${scenario_id} not found`,
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

  // Create synthetic observation and mpstate
  const observation = createDemoObservation(scenario_id, scenario.process);
  const mpstate = createDemoMPState(scenario_id, scenario.process);

  res.json({
    data: {
      scenario_id,
      scenario_name: scenario.metadata.name,
      observation,
      mpstate,
      preview: {
        process: scenario.process,
        timestamp: new Date().toISOString(),
        key_metrics: {
          warpage_um: mpstate.key_metrics.warpage_um,
          interface_gap_nm: mpstate.key_metrics.interface_gap_nm,
          peak_stress_mpa: mpstate.key_metrics.peak_stress_mpa,
          void_risk_pct: mpstate.key_metrics.void_risk_pct,
          crack_risk_pct: mpstate.key_metrics.crack_risk_pct,
          quality_score: mpstate.key_metrics.quality_score,
        },
      },
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
