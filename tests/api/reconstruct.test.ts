/**
 * Reconstruct endpoint tests
 *
 * Verifies that observation + MPState are returned correctly
 */

import request from "supertest";
import app from "../../packages/mock-api/src/server";

describe("POST /api/demo/reconstruct", () => {
  it("should require scenario_id", async () => {
    const res = await request(app).post("/api/demo/reconstruct").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
    expect(res.body.code).toBe("MISSING_SCENARIO_ID");
  });

  it("should reject unknown scenario", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "unknown-scenario" });

    expect(res.status).toBe(404);
    expect(res.body.code).toBe("SCENARIO_NOT_FOUND");
  });

  it("should return observation and mpstate for valid scenario", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("observation");
    expect(res.body.data).toHaveProperty("mpstate");
    expect(res.body.data).toHaveProperty("preview");
  });

  it("observation should have required fields", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    const obs = res.body.data.observation;
    expect(obs).toHaveProperty("observation_id");
    expect(obs).toHaveProperty("scenario_id");
    expect(obs).toHaveProperty("process");
    expect(obs).toHaveProperty("timestamp");
  });

  it("mpstate should have required fields", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    const mpstate = res.body.data.mpstate;
    expect(mpstate).toHaveProperty("mpstate_id");
    expect(mpstate).toHaveProperty("scenario_id");
    expect(mpstate).toHaveProperty("process");
    expect(mpstate).toHaveProperty("key_metrics");
  });

  it("mpstate.key_metrics should have expected values", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    const metrics = res.body.data.mpstate.key_metrics;
    expect(metrics).toHaveProperty("warpage_um");
    expect(metrics).toHaveProperty("interface_gap_nm");
    expect(metrics).toHaveProperty("peak_stress_mpa");
    expect(metrics).toHaveProperty("void_risk_pct");
    expect(metrics).toHaveProperty("crack_risk_pct");
    expect(metrics).toHaveProperty("quality_score");

    expect(metrics.warpage_um).toBeGreaterThan(0);
    expect(metrics.void_risk_pct).toBeGreaterThan(0);
    expect(metrics.quality_score).toBeGreaterThan(0);
  });

  it("should include demo metadata", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    expect(res.body.metadata.mode).toBe("public_demo");
    expect(res.body.metadata.data_origin).toBe("synthetic");
    expect(res.body.metadata.production_valid).toBe(false);
  });

  it("should mark data as synthetic", async () => {
    const res = await request(app)
      .post("/api/demo/reconstruct")
      .send({ scenario_id: "hb-001" });

    expect(res.body.data.observation.metadata.is_synthetic).toBe(true);
    expect(res.body.data.mpstate.metadata.is_synthetic).toBe(true);
  });
});
