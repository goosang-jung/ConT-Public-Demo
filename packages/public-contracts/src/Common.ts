/**
 * Common types and interfaces for ConT Public Demo API
 *
 * All types in this module are safe for public API contracts.
 * No proprietary algorithms or models are exposed.
 */

/**
 * Metadata for all demo API responses
 * Clearly marks data as synthetic and not for production use
 */
export interface DemoMetadata {
  /** API mode: always "public_demo" */
  mode: "public_demo";

  /** Data origin: "synthetic" (never "production") */
  data_origin: "synthetic";

  /** CRITICAL: This data is NOT valid for production decisions */
  production_valid: false;

  /** No commercial engines are used in demo */
  commercial_engine_included: false;

  /** Timestamp when response was generated */
  timestamp: string; // ISO 8601

  /** Version of the demo API */
  version: string; // e.g., "0.1.0"
}

/**
 * Standard error response
 */
export interface ApiError {
  error: true;
  code: string; // e.g., "INVALID_SCENARIO", "NOT_FOUND"
  message: string;
  details?: Record<string, unknown>;
  metadata: DemoMetadata;
}

/**
 * Standard success response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  metadata: DemoMetadata;
}

/**
 * Confidence score (0.0 to 1.0)
 * In production, this comes from Bayesian inference.
 * In this demo, it's a sample value.
 */
export type ConfidenceScore = number & { readonly __brand: "ConfidenceScore" };

/**
 * Create a confidence score with validation
 */
export function createConfidenceScore(value: number): ConfidenceScore {
  if (value < 0 || value > 1) {
    throw new Error("Confidence must be between 0 and 1");
  }
  return value as ConfidenceScore;
}

/**
 * Risk level (0.0 to 1.0)
 * Probability of defect or failure
 */
export type RiskScore = number & { readonly __brand: "RiskScore" };

export function createRiskScore(value: number): RiskScore {
  if (value < 0 || value > 1) {
    throw new Error("Risk must be between 0 and 1");
  }
  return value as RiskScore;
}

/**
 * Physical field reference (synthetic demo)
 * In production, these would be actual field arrays.
 * In demo, they're string references to data.
 */
export interface FieldReference {
  /** Type of field: current_density, thermal, stress, etc. */
  field_type:
    | "current_density"
    | "joule_heating"
    | "temperature"
    | "stress"
    | "strain"
    | "deformation";

  /** Shape of field: (nx, ny, nz) or scalar */
  shape: [number, number, number] | "scalar";

  /** In demo: reference to synthetic data file or computed reference */
  data_ref: string; // e.g., "synthetic://hb-001/thermal_field"

  /** Physical units */
  units: string; // e.g., "A/mm²", "°C", "MPa"

  /** Peak value (for quick assessment) */
  peak_value?: number;

  /** Average value */
  mean_value?: number;
}

/**
 * Manufacturing process type
 */
export enum ManufacturingProcess {
  HybridBonding = "hybrid_bonding",
  ThermalProcess = "thermal_process",
  Packaging = "packaging",
  Assembly = "assembly",
}

/**
 * Validation status
 */
export enum ValidationStatus {
  /** All criteria passed */
  Pass = "PASS",
  /** All criteria failed */
  Fail = "FAIL",
  /** Some criteria passed, others need review */
  Review = "REVIEW",
  /** Validation not yet run */
  Pending = "PENDING",
}

/**
 * Decision recommendation
 */
export enum DecisionRecommendation {
  /** Accept the part/process */
  Approve = "APPROVE",
  /** Reject the part/process */
  Reject = "REJECT",
  /** Requires human review */
  Review = "REVIEW",
  /** Insufficient data */
  Inconclusive = "INCONCLUSIVE",
}

/**
 * Risk level category
 */
export enum RiskLevel {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Critical = "CRITICAL",
}

/**
 * Convert risk score to risk level
 */
export function getRiskLevel(risk: RiskScore): RiskLevel {
  if (risk < 0.2) return RiskLevel.Low;
  if (risk < 0.5) return RiskLevel.Medium;
  if (risk < 0.8) return RiskLevel.High;
  return RiskLevel.Critical;
}

/**
 * Acceptance criterion
 * A single rule that prediction/measurement must satisfy
 */
export interface AcceptanceCriterion {
  /** Criterion name: e.g., "void_risk", "warpage" */
  name: string;

  /** Human-readable description */
  description: string;

  /** Threshold type: less_than, greater_than, between, etc. */
  threshold_type: "less_than" | "greater_than" | "between" | "equals";

  /** Threshold value(s) */
  threshold_value: number | [number, number];

  /** Physical unit */
  unit: string;

  /** Sample weight in overall decision (1-10) */
  weight: number;
}

/**
 * Material properties (simplified for demo)
 */
export interface MaterialProperties {
  /** Material name: silicon, copper, adhesive, etc. */
  material: string;

  /** Thickness in micrometers */
  thickness_um: number;

  /** Thermal conductivity (W/m·K) */
  thermal_conductivity?: number;

  /** Electrical conductivity (S/m) */
  electrical_conductivity?: number;

  /** Coefficient of thermal expansion (ppm/K) */
  cte?: number;

  /** Young's modulus (GPa) */
  youngs_modulus?: number;

  /** Poisson's ratio */
  poisson_ratio?: number;
}

/**
 * Process parameters (varies by process)
 */
export interface ProcessParameters {
  /** Temperature in Celsius */
  temperature_c?: number;

  /** Time in seconds */
  time_s?: number;

  /** Pressure in MPa */
  pressure_mpa?: number;

  /** Force in Newtons */
  force_n?: number;

  /** Voltage in Volts */
  voltage_v?: number;

  /** Current in Amps */
  current_a?: number;

  /** Custom parameters */
  custom?: Record<string, number | string>;
}

/**
 * Scenario metadata
 */
export interface ScenarioMetadata {
  /** Unique scenario ID */
  id: string;

  /** Human-readable name */
  name: string;

  /** Detailed description */
  description: string;

  /** Manufacturing process */
  process: ManufacturingProcess;

  /** Is this a baseline scenario for comparison? */
  is_baseline: boolean;

  /** Creation timestamp */
  created_at: string; // ISO 8601

  /** Modified timestamp */
  modified_at: string; // ISO 8601
}

/**
 * Comparison result (what-if analysis)
 */
export interface ComparisonResult {
  /** Change in metric value */
  delta: number;

  /** Percentage change */
  percent_change: number;

  /** Direction: improved, worsened, or neutral */
  direction: "improved" | "worsened" | "neutral";

  /** Human-readable comment */
  comment: string;
}

/**
 * Helper: Create demo metadata
 */
export function createDemoMetadata(version: string = "0.1.0"): DemoMetadata {
  return {
    mode: "public_demo",
    data_origin: "synthetic",
    production_valid: false,
    commercial_engine_included: false,
    timestamp: new Date().toISOString(),
    version,
  };
}

/**
 * Helper: Create error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiError {
  return {
    error: true,
    code,
    message,
    details,
    metadata: createDemoMetadata(),
  };
}

/**
 * Helper: Create success response
 */
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    metadata: createDemoMetadata(),
  };
}
