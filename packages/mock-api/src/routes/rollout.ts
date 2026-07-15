/**
 * POST /api/demo/future-rollout
 * Get future rollout predictions and what-if scenarios
 */

import { Router, Request, Response } from "express";
import { createDemoFutureRollout, getScenario } from "@cont-public/contracts";

const router = Router();

/**
 * Future rollout: baseline + alternatives
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

  // Get scenario
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

  // Create future rollout
  const rollout = createDemoFutureRollout(scenario_id, scenario.process);

  res.json({
    data: rollout,
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
