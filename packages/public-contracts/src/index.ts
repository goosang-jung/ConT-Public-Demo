/**
 * ConT Public Contracts
 *
 * Type definitions and contracts for the ConT Public Demo API
 * Use these types in your frontend/backend to ensure type safety
 *
 * Example:
 * ```typescript
 * import { Observation, MPState, Evidence } from '@cont-public/contracts';
 *
 * const obs: Observation = await fetch('/api/demo/observation').then(r => r.json());
 * const mpstate: MPState = await fetch('/api/demo/mpstate').then(r => r.json());
 * const evidence: Evidence = await fetch('/api/demo/evidence').then(r => r.json());
 * ```
 */

// Common types
export {
  DemoMetadata,
  ApiError,
  ApiResponse,
  ConfidenceScore,
  RiskScore,
  FieldReference,
  ManufacturingProcess,
  ValidationStatus,
  DecisionRecommendation,
  RiskLevel,
  AcceptanceCriterion,
  MaterialProperties,
  ProcessParameters,
  ScenarioMetadata,
  ComparisonResult,
  createConfidenceScore,
  createRiskScore,
  getRiskLevel,
  createDemoMetadata,
  createErrorResponse,
  createSuccessResponse,
} from "./Common";

// Observation
export {
  ThermalImageData,
  MeasurementPoint,
  SensorReadings,
  Observation,
  SimpleObservation,
  ObservationRequest,
  ObservationResponse,
  validateObservation,
  createDemoObservation,
} from "./Observation";

// MPState
export {
  ThermalState,
  ElectricalState,
  MechanicalState,
  DeformationState,
  InterfaceState,
  DefectState,
  MPState,
  SimplePhysicalState,
  createDemoMPState,
  validateMPState,
} from "./MPState";

// FutureRollout
export {
  PredictionTimeStep,
  OutcomeDistribution,
  RolloutScenario,
  FutureRollout,
  WhatIfComparison,
  createDemoRolloutScenario,
  createDemoFutureRollout,
  createDemoWhatIfComparison,
} from "./FutureRollout";

// Evidence
export {
  PredictionMeasurementComparison,
  CriterionCheckResult,
  ValidationReport,
  RiskAssessment,
  ProductionDecision,
  Evidence,
  SimpleEvidence,
  createDemoValidationReport,
  createDemoEvidence,
} from "./Evidence";

// Scenarios
export {
  DemoScenario,
  DEMO_SCENARIOS,
  getScenario,
  listScenarioIds,
  listScenarios,
} from "./Scenario";

/**
 * Version of this package
 */
export const VERSION = "0.1.0";

/**
 * Helper: Create a complete demo workflow
 * Observation → MPState → Evidence
 */
export function createCompleteDemo(scenarioId: string) {
  const { ManufacturingProcess } = require("./Common");
  const { createDemoObservation } = require("./Observation");
  const { createDemoMPState } = require("./MPState");
  const { createDemoEvidence } = require("./Evidence");

  const observation = createDemoObservation(
    scenarioId,
    ManufacturingProcess.HybridBonding
  );
  const mpstate = createDemoMPState(
    scenarioId,
    ManufacturingProcess.HybridBonding
  );
  const evidence = createDemoEvidence(
    scenarioId,
    ManufacturingProcess.HybridBonding
  );

  return {
    observation,
    mpstate,
    evidence,
  };
}
