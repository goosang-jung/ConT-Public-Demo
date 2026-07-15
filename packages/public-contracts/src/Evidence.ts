/**
 * Evidence: Validation results and production decision
 *
 * OUTPUT of the complete ConT workflow
 * Contains prediction, measurement, validation, and recommendation
 *
 * In production: Auditable, signed decision record
 * In demo: Validation workflow example
 */

import {
  AcceptanceCriterion,
  ValidationStatus,
  DecisionRecommendation,
  RiskLevel,
  ConfidenceScore,
  ManufacturingProcess,
  createConfidenceScore,
} from "./Common";

/**
 * Prediction vs Measurement comparison
 */
export interface PredictionMeasurementComparison {
  /** Metric being compared */
  metric: string;

  /** Unit */
  unit: string;

  /** Predicted value */
  predicted_value: number;

  /** Actual measured value */
  measured_value: number;

  /** Absolute error */
  absolute_error: number;

  /** Relative error (%) */
  relative_error_pct: number;

  /** Did prediction match measurement (within tolerance)? */
  matches: boolean;

  /** Tolerance for matching */
  tolerance: number;
}

/**
 * Single acceptance criterion check result
 */
export interface CriterionCheckResult {
  /** Criterion definition */
  criterion: AcceptanceCriterion;

  /** Measured or predicted value */
  measured_value: number;

  /** Does it satisfy the criterion? */
  satisfied: boolean;

  /** Margin to threshold (negative = failed) */
  margin: number;

  /** Pass/fail message */
  message: string;
}

/**
 * Validation report: All criteria checks
 */
export interface ValidationReport {
  /** Overall validation status */
  status: ValidationStatus;

  /** All criterion checks */
  criterion_results: CriterionCheckResult[];

  /** Number of criteria passed */
  passed_count: number;

  /** Total criteria */
  total_count: number;

  /** Pass rate (%) */
  pass_rate_pct: number;

  /** Overall confidence */
  confidence: ConfidenceScore;

  /** Notes or issues found */
  notes?: string[];
}

/**
 * Risk assessment
 */
export interface RiskAssessment {
  /** Void defect risk (0-1) */
  void_risk: number;

  /** Crack defect risk (0-1) */
  crack_risk: number;

  /** Delamination risk (0-1) */
  delamination_risk?: number;

  /** Overall risk level (LOW, MEDIUM, HIGH, CRITICAL) */
  risk_level: RiskLevel;

  /** Top risk factors */
  risk_factors: string[];

  /** Estimated yield (% of parts expected to pass) */
  estimated_yield_pct?: number;

  /** Mitigation recommendations */
  mitigations?: string[];
}

/**
 * Production decision
 */
export interface ProductionDecision {
  /** Overall recommendation: APPROVE, REJECT, REVIEW */
  recommendation: DecisionRecommendation;

  /** Justification */
  justification: string;

  /** Required actions */
  required_actions: string[];

  /** Is this decision based on complete data? */
  is_complete_analysis: boolean;

  /** Any conditions on the decision? */
  conditions?: string[];
}

/**
 * Complete Evidence: All validation and decision info
 */
export interface Evidence {
  /** Evidence ID */
  evidence_id: string;

  /** Scenario ID */
  scenario_id: string;

  /** Manufacturing process */
  process: ManufacturingProcess;

  /** Timestamp */
  timestamp: string; // ISO 8601

  /** === Prediction vs Reality === */
  prediction_vs_measurement: {
    /** Individual metric comparisons */
    comparisons: PredictionMeasurementComparison[];

    /** Overall match quality (0-1) */
    match_quality: ConfidenceScore;

    /** Summary: does prediction match measurement? */
    prediction_accurate: boolean;
  };

  /** === Validation Against Criteria === */
  validation: ValidationReport;

  /** === Risk Assessment === */
  risk_assessment: RiskAssessment;

  /** === Production Decision === */
  decision: ProductionDecision;

  /** === Quality Metrics === */
  quality_metrics: {
    /** Model confidence (0-1) */
    model_confidence: ConfidenceScore;

    /** Data quality (0-1) */
    data_quality: number;

    /** Analysis completeness (0-1) */
    analysis_completeness: number;

    /** Overall evidence reliability (0-1) */
    evidence_reliability: ConfidenceScore;
  };

  /** === Evidence Trail === */
  evidence_trail: {
    /** Reference to observation used */
    observation_id?: string;

    /** Reference to MPState */
    mpstate_id?: string;

    /** Reference to rollout/prediction */
    rollout_id?: string;

    /** Acceptance criteria version */
    criteria_version?: string;

    /** Analysis performed by (user/system) */
    analyzed_by?: string;

    /** Manual review performed? */
    manual_review_performed: boolean;

    /** Reviewer comment */
    reviewer_comment?: string;
  };

  /** === Metadata === */
  metadata: {
    /** Is this synthetic demo data? */
    is_synthetic: true;

    /** Evidence type: "demo", "production", "qualification" */
    evidence_type: "demo" | "production" | "qualification";

    /** Source: how was evidence generated */
    source: "auto_generated" | "manual_review" | "hybrid";

    /** Retention policy (keep until date) */
    retention_until?: string;

    /** Is this an audit-ready record? */
    is_auditable: boolean;
  };
}

/**
 * Simplified evidence (quick summary)
 */
export interface SimpleEvidence {
  evidence_id: string;
  scenario_id: string;
  timestamp: string;
  recommendation: DecisionRecommendation;
  risk_level: RiskLevel;
  confidence: number;
  void_risk: number;
  crack_risk: number;
  validation_status: ValidationStatus;
}

/**
 * Create demo validation report
 */
export function createDemoValidationReport(
  criteria: AcceptanceCriterion[]
): ValidationReport {
  const results = criteria.map(
    (crit): CriterionCheckResult => ({
      criterion: crit,
      measured_value: crit.threshold_value as number,
      satisfied: true,
      margin: 0.2,
      message: `✓ ${crit.name} passes (within margin)`,
    })
  );

  return {
    status: ValidationStatus.Pass,
    criterion_results: results,
    passed_count: results.length,
    total_count: results.length,
    pass_rate_pct: 100,
    confidence: createConfidenceScore(0.91),
  };
}

/**
 * Create demo evidence
 */
export function createDemoEvidence(
  scenarioId: string,
  process: ManufacturingProcess,
  overrides?: Partial<Evidence>
): Evidence {
  const baseCriteria: AcceptanceCriterion[] = [
    {
      name: "void_risk",
      description: "Maximum void probability",
      threshold_type: "less_than",
      threshold_value: 0.05,
      unit: "probability",
      weight: 9,
    },
    {
      name: "warpage",
      description: "Maximum out-of-plane warpage",
      threshold_type: "less_than",
      threshold_value: 2.0,
      unit: "μm",
      weight: 8,
    },
    {
      name: "crack_risk",
      description: "Maximum crack probability",
      threshold_type: "less_than",
      threshold_value: 0.02,
      unit: "probability",
      weight: 9,
    },
  ];

  return {
    evidence_id: `evidence-${Date.now()}`,
    scenario_id: scenarioId,
    process,
    timestamp: new Date().toISOString(),

    prediction_vs_measurement: {
      comparisons: [
        {
          metric: "warpage_um",
          unit: "μm",
          predicted_value: 1.8,
          measured_value: 1.7,
          absolute_error: 0.1,
          relative_error_pct: 5.6,
          matches: true,
          tolerance: 0.3,
        },
        {
          metric: "interface_gap_nm",
          unit: "nm",
          predicted_value: 15,
          measured_value: 16,
          absolute_error: 1,
          relative_error_pct: 6.7,
          matches: true,
          tolerance: 5,
        },
      ],
      match_quality: createConfidenceScore(0.92),
      prediction_accurate: true,
    },

    validation: createDemoValidationReport(baseCriteria),

    risk_assessment: {
      void_risk: 0.032,
      crack_risk: 0.008,
      delamination_risk: 0.015,
      risk_level: RiskLevel.Low,
      risk_factors: [
        "Current crowding at corner (manageable)",
        "Interface gap variance (within spec)",
      ],
      estimated_yield_pct: 96.5,
      mitigations: [
        "Monitor corner current during production",
        "Maintain temperature control ±2°C",
      ],
    },

    decision: {
      recommendation: DecisionRecommendation.Approve,
      justification:
        "All acceptance criteria met. Prediction validated against measurement. Risk levels acceptable.",
      required_actions: [
        "Standard production process",
        "Log evidence record",
      ],
      is_complete_analysis: true,
      conditions: ["Process parameters within ±5%"],
    },

    quality_metrics: {
      model_confidence: createConfidenceScore(0.91),
      data_quality: 0.94,
      analysis_completeness: 1.0,
      evidence_reliability: createConfidenceScore(0.91),
    },

    evidence_trail: {
      observation_id: `obs-${Date.now()}`,
      mpstate_id: `mpstate-${Date.now()}`,
      rollout_id: `rollout-${Date.now()}`,
      criteria_version: "1.0",
      manual_review_performed: false,
    },

    metadata: {
      is_synthetic: true,
      evidence_type: "demo",
      source: "auto_generated",
      is_auditable: true,
    },

    ...overrides,
  };
}
