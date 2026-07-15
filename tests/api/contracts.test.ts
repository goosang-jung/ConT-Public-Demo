/**
 * API Contract tests
 *
 * Verifies that all API responses conform to public contracts
 */

import request from "supertest";
import app from "../../packages/mock-api/src/server";

describe("API Contracts", () => {
  describe("Synthetic data markers", () => {
    it("all responses should indicate they are not for production", async () => {
      const scenarios = await request(app).get("/api/demo/scenarios");
      const reconstruct = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "hb-001" });

      expect(scenarios.body.metadata.production_valid).toBe(false);
      expect(reconstruct.body.metadata.production_valid).toBe(false);
    });

    it("all responses should indicate synthetic data source", async () => {
      const health = await request(app).get("/api/demo/health");
      expect(health.body.data_origin || health.body.mode).toBeDefined();

      const scenarios = await request(app).get("/api/demo/scenarios");
      expect(scenarios.body.metadata.data_origin).toBe("synthetic");
    });
  });

  describe("Response structure", () => {
    it("POST endpoints should return data wrapped in response", async () => {
      const res = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "hb-001" });

      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("metadata");
    });

    it("error responses should follow error contract", async () => {
      const res = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "unknown" });

      expect(res.body.error).toBe(true);
      expect(res.body.code).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.body.metadata).toBeDefined();
    });
  });

  describe("Confidence and Risk scores", () => {
    it("confidence scores should be between 0 and 1", async () => {
      const res = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "hb-001" });

      const confidence = res.body.data.mpstate.reconstruction_quality.confidence;
      expect(confidence).toBeGreaterThanOrEqual(0);
      expect(confidence).toBeLessThanOrEqual(1);
    });

    it("risk scores should be between 0 and 1", async () => {
      const res = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "hb-001" });

      const voidRisk = res.body.data.mpstate.interface.void_probability;
      const crackRisk = res.body.data.mpstate.defect.crack_risk;

      expect(voidRisk).toBeGreaterThanOrEqual(0);
      expect(voidRisk).toBeLessThanOrEqual(1);
      expect(crackRisk).toBeGreaterThanOrEqual(0);
      expect(crackRisk).toBeLessThanOrEqual(1);
    });
  });

  describe("Timestamps", () => {
    it("all responses should include ISO 8601 timestamps", async () => {
      const res = await request(app)
        .post("/api/demo/reconstruct")
        .send({ scenario_id: "hb-001" });

      const timestamp = res.body.metadata.timestamp;
      const date = new Date(timestamp);

      expect(isNaN(date.getTime())).toBe(false);
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});
