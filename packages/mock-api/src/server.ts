/**
 * ConT Public Demo Mock API Server
 *
 * A simple Express.js server that provides mock API endpoints
 * All responses are synthetic data marked as demo-only
 *
 * Endpoints:
 * - GET  /api/demo/health
 * - GET  /api/demo/scenarios
 * - POST /api/demo/reconstruct
 * - POST /api/demo/what-if
 * - POST /api/demo/compare
 * - POST /api/demo/future-rollout
 * - GET  /api/demo/evidence/{id}
 */

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import scenariosRouter from "./routes/scenarios";
import reconstructRouter from "./routes/reconstruct";
import whatIfRouter from "./routes/what-if";
import compareRouter from "./routes/compare";
import rolloutRouter from "./routes/rollout";
import evidenceRouter from "./routes/evidence";

/**
 * Server configuration
 */
const config = {
  port: parseInt(process.env.DEMO_API_PORT ?? "4000", 10),
  host: process.env.DEMO_API_HOST ?? "localhost",
};

/**
 * Create Express app
 */
const app = express();

/**
 * === Middleware ===
 */

// CORS support
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

/**
 * === Error Handler ===
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: true,
    code: "INTERNAL_ERROR",
    message: err.message || "Internal server error",
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

/**
 * === Routes ===
 */

/**
 * Health check
 */
app.get("/api/demo/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    version: "0.1.0",
    mode: "public_demo",
    data_origin: "synthetic",
    timestamp: new Date().toISOString(),
  });
});

/**
 * === API Routes ===
 */
app.use("/api/demo/scenarios", scenariosRouter);
app.use("/api/demo/reconstruct", reconstructRouter);
app.use("/api/demo/what-if", whatIfRouter);
app.use("/api/demo/compare", compareRouter);
app.use("/api/demo/future-rollout", rolloutRouter);
app.use("/api/demo/evidence", evidenceRouter);

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: true,
    code: "NOT_FOUND",
    message: `Endpoint not found: ${req.method} ${req.path}`,
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

/**
 * Start server
 */
const server = app.listen(config.port, config.host, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║           ConT Public Demo Mock API Server                 ║
╠════════════════════════════════════════════════════════════╣
║  Mode: public_demo                                          ║
║  Data: synthetic (NOT for production)                      ║
║  URL: http://${config.host}:${config.port}
║  Health: http://${config.host}:${config.port}/api/demo/health
╚════════════════════════════════════════════════════════════╝
  `);
});

/**
 * Graceful shutdown
 */
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

export default app;
