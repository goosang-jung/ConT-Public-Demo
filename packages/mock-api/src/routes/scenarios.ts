/**
 * GET /api/demo/scenarios
 * List all available demo scenarios
 */

import { Router, Request, Response } from "express";
import { listScenarios } from "@cont-public/contracts";

const router = Router();

/**
 * List all demo scenarios
 */
router.get("/", (req: Request, res: Response) => {
  const scenarios = listScenarios();

  res.json({
    data: scenarios,
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
