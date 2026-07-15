/**
 * Health check endpoint tests
 *
 * Verifies that the API is running and responds with correct metadata
 */

import request from "supertest";
import app from "../../packages/mock-api/src/server";

describe("GET /api/demo/health", () => {
  it("should return healthy status", async () => {
    const res = await request(app).get("/api/demo/health");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "healthy");
    expect(res.body).toHaveProperty("version", "0.1.0");
    expect(res.body).toHaveProperty("mode", "public_demo");
    expect(res.body).toHaveProperty("data_origin", "synthetic");
    expect(res.body).toHaveProperty("timestamp");
  });

  it("should include production_valid false", async () => {
    const res = await request(app).get("/api/demo/health");

    expect(res.body.production_valid).toBe(false);
    expect(res.body.commercial_engine_included).toBe(false);
  });

  it("should include timestamp in ISO format", async () => {
    const res = await request(app).get("/api/demo/health");
    const timestamp = new Date(res.body.timestamp);

    expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
  });
});
