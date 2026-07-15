/**
 * GET /api/demo/evidence/:id
 * Get validation and decision evidence
 */

import { Router, Request, Response } from "express";
import { createDemoEvidence, getScenario } from "@cont-public/contracts";

const router = Router();

/**
 * Get evidence for a scenario
 */
router.get("/:scenarioId", (req: Request, res: Response) => {
  const { scenarioId } = req.params;

  if (!scenarioId) {
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
  const scenario = getScenario(scenarioId);
  if (!scenario) {
    return res.status(404).json({
      error: true,
      code: "SCENARIO_NOT_FOUND",
      message: `Scenario ${scenarioId} not found`,
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

  // Create evidence with scenario's acceptance criteria
  const evidence = createDemoEvidence(scenarioId, scenario.process, {
    validation: {
      ...createDemoEvidence(scenarioId, scenario.process).validation,
      criterion_results: scenario.acceptance_criteria.map((crit) => ({
        criterion: crit,
        measured_value: (crit.threshold_value as number) * 0.95, // Slightly below threshold (passing)
        satisfied: true,
        margin: (crit.threshold_value as number) * 0.05,
        message: `✓ ${crit.name} satisfies criteria`,
      })),
    },
  });

  res.json({
    data: evidence,
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
