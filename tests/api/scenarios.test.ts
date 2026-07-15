/**
 * Scenarios endpoint tests
 *
 * Verifies that scenario list is returned correctly
 */

import request from "supertest";
import app from "../../packages/mock-api/src/server";

describe("GET /api/demo/scenarios", () => {
  it("should return list of scenarios", async () => {
    const res = await request(app).get("/api/demo/scenarios");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should include required fields for each scenario", async () => {
    const res = await request(app).get("/api/demo/scenarios");
    const scenarios = res.body.data;

    expect(scenarios.length).toBeGreaterThan(0);

    scenarios.forEach((scenario: any) => {
      expect(scenario).toHaveProperty("id");
      expect(scenario).toHaveProperty("name");
      expect(scenario).toHaveProperty("process");
      expect(scenario).toHaveProperty("description");
    });
  });

  it("should include demo metadata", async () => {
    const res = await request(app).get("/api/demo/scenarios");

    expect(res.body.metadata).toHaveProperty("mode", "public_demo");
    expect(res.body.metadata).toHaveProperty("data_origin", "synthetic");
    expect(res.body.metadata).toHaveProperty("production_valid", false);
    expect(res.body.metadata).toHaveProperty("commercial_engine_included", false);
  });

  it("should include known scenarios", async () => {
    const res = await request(app).get("/api/demo/scenarios");
    const ids = res.body.data.map((s: any) => s.id);

    expect(ids).toContain("hb-001");
  });
});
