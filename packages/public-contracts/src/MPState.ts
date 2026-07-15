/**
 * MPState (Canonical Manufacturing Physical State)
 *
 * Unified representation of true manufacturing state
 * OUTPUT of Hidden Physics Reconstruction
 *
 * In production: Result of inverse physics problem solving
 * In demo: Synthetic fields with sample values
 */

import {
  FieldReference,
  ConfidenceScore,
  RiskScore,
  ManufacturingProcess,
  createConfidenceScore,
  createRiskScore,
} from "./Common";

/**
 * Thermal field state
 */
export interface ThermalState {
  /** Temperature field reference */
  temperature_field: FieldReference;

  /** Temperature gradient field (∇T) */
  gradient_field?: FieldReference;

  /** Heat flux field (q) */
  heat_flux_field?: FieldReference;

  /** Peak temperature in field (°C) */
  peak_temperature_c: number;

  /** Average temperature (°C) */
  mean_temperature_c: number;

  /** Minimum temperature (°C) */
  min_temperature_c: number;

  /** Heat source power (W) */
  heat_source_power_w?: number;
}

/**
 * Electrical field state
 */
export interface ElectricalState {
  /** Current density field (A/mm²) */
  current_density_field: FieldReference;

  /** Electric potential field (V) */
  potential_field?: FieldReference;

  /** Joule heating field (W/mm³) */
  joule_heating_field: FieldReference;

  /** Peak current density (A/mm²) */
  peak_current_density: number;

  /** Average current density (A/mm²) */
  mean_current_density: number;

  /** Total current (A) */
  total_current_a: number;

  /** Resistance (Ω) */
  resistance_ohm?: number;

  /** Power dissipation (W) */
  power_dissipation_w?: number;

  /** Current crowding factor (1.0 = uniform, >1 = crowded) */
  crowding_factor?: number;
}

/**
 * Mechanical/Stress field state
 */
export interface MechanicalState {
  /** Stress tensor field (MPa) */
  stress_field: FieldReference;

  /** Strain field (dimensionless) */
  strain_field?: FieldReference;

  /** Displacement/deformation field (μm) */
  deformation_field: FieldReference;

  /** Peak stress (MPa) */
  peak_stress_mpa: number;

  /** Von Mises stress (equivalent stress) */
  von_mises_stress_mpa: number;

  /** Average stress (MPa) */
  mean_stress_mpa: number;

  /** Shear stress field (MPa) */
  shear_stress_field?: FieldReference;

  /** Principal stresses */
  principal_stresses?: {
    sigma_1_mpa: number; // Maximum
    sigma_2_mpa: number;
    sigma_3_mpa: number; // Minimum
  };
}

/**
 * Deformation/Warpage state
 */
export interface DeformationState {
  /** Out-of-plane warpage (μm) */
  warpage_um: number;

  /** Lateral distortion (μm) */
  lateral_distortion_um?: number;

  /** Tilt angle (degrees) */
  tilt_angle_deg?: number;

  /** Contact surface gap (nm) */
  interface_gap_nm: number;

  /** Void fraction at interface (%) */
  void_fraction_pct?: number;

  /** Curvature (1/mm) */
  curvature_per_mm?: number;

  /** Curvature direction (radians) */
  curvature_direction_rad?: number;
}

/**
 * Interface/Contact state
 */
export interface InterfaceState {
  /** Contact pressure (MPa) */
  contact_pressure_mpa?: number;

  /** Contact area fraction (0-1) */
  contact_area_fraction: number;

  /** Interface gap profile (μm at various locations) */
  gap_profile?: {
    center_nm: number;
    edge_nm: number;
    corner_nm?: number;
  };

  /** Bonding quality estimate (0-1, in production) */
  bonding_quality?: number;

  /** Void probability at interface (0-1) */
  void_probability: number;

  /** Crack probability at interface (0-1) */
  crack_probability: number;

  /** Interface strength (MPa, estimated) */
  interface_strength_mpa?: number;
}

/**
 * Material defect state
 */
export interface DefectState {
  /** Void risk score (0-1) */
  void_risk: RiskScore;

  /** Crack risk score (0-1) */
  crack_risk: RiskScore;

  /** Delamination risk (0-1) */
  delamination_risk?: RiskScore;

  /** Dislocation density (cm⁻²) */
  dislocation_density?: number;

  /** Defect concentration (ppm) */
  defect_concentration?: number;

  /** Residual stress level */
  residual_stress_state?: "tensile" | "compressive" | "neutral";
}

/**
 * Complete MPState: All reconstructed fields
 */
export interface MPState {
  /** Scenario ID */
  scenario_id: string;

  /** Unique MPState ID */
  mpstate_id: string;

  /** Manufacturing process */
  process: ManufacturingProcess;

  /** Timestamp when reconstruction was completed */
  timestamp: string; // ISO 8601

  /** === Reconstructed Physical Fields === */
  thermal: ThermalState;
  electrical: ElectricalState;
  mechanical: MechanicalState;
  deformation: DeformationState;
  interface: InterfaceState;
  defect: DefectState;

  /** === Reconstruction Quality === */
  reconstruction_quality: {
    /** Overall confidence in reconstruction (0-1) */
    confidence: ConfidenceScore;

    /** Uncertainty in key predictions (%) */
    uncertainty_pct?: number;

    /** Data fidelity (how well synthetic data matches real physics) */
    fidelity_score?: number;

    /** Reconstruction method used (info only) */
    method?: "pinn" | "fea" | "hybrid" | "surrogate";

    /** Any warnings or limitations */
    notes?: string[];
  };

  /** === Key Metrics for Quick Assessment === */
  key_metrics: {
    /** Warpage in micrometers */
    warpage_um: number;

    /** Interface gap in nanometers */
    interface_gap_nm: number;

    /** Peak stress in MPa */
    peak_stress_mpa: number;

    /** Void risk probability */
    void_risk_pct: number;

    /** Crack risk probability */
    crack_risk_pct: number;

    /** Overall quality indicator (0-100) */
    quality_score: number;
  };

  /** === Metadata === */
  metadata: {
    /** Is this synthetic demo data? */
    is_synthetic: true;

    /** Reconstruction source */
    source: "demo_synthetic" | "pinn_model" | "fea_solver";

    /** Which physical models were used */
    models_used?: string[];

    /** Total reconstruction time (ms) */
    computation_time_ms?: number;

    /** Reference to original observation */
    observation_id?: string;
  };
}

/**
 * Simplified MPState (for quick visualization)
 */
export interface SimplePhysicalState {
  mpstate_id: string;
  process: ManufacturingProcess;
  warpage_um: number;
  interface_gap_nm: number;
  peak_stress_mpa: number;
  void_risk: number;
  crack_risk: number;
  confidence: number;
  timestamp: string;
}

/**
 * Create a minimal synthetic MPState for demo
 */
export function createDemoMPState(
  scenarioId: string,
  process: ManufacturingProcess,
  overrides?: Partial<MPState>
): MPState {
  const baseState: MPState = {
    scenario_id: scenarioId,
    mpstate_id: `mpstate-${Date.now()}`,
    process,
    timestamp: new Date().toISOString(),

    thermal: {
      temperature_field: {
        field_type: "temperature",
        shape: [64, 64, 32],
        data_ref: "synthetic://thermal_field",
        units: "°C",
        peak_value: 260,
        mean_value: 245,
      },
      peak_temperature_c: 260,
      mean_temperature_c: 245,
      min_temperature_c: 180,
    },

    electrical: {
      current_density_field: {
        field_type: "current_density",
        shape: [64, 64, 32],
        data_ref: "synthetic://current_field",
        units: "A/mm²",
        peak_value: 2.5,
      },
      joule_heating_field: {
        field_type: "joule_heating",
        shape: [64, 64, 32],
        data_ref: "synthetic://joule_field",
        units: "W/mm³",
        peak_value: 1.2,
      },
      peak_current_density: 2.5,
      mean_current_density: 1.0,
      total_current_a: 15.0,
      power_dissipation_w: 75,
    },

    mechanical: {
      stress_field: {
        field_type: "stress",
        shape: [64, 64, 32],
        data_ref: "synthetic://stress_field",
        units: "MPa",
        peak_value: 450,
      },
      deformation_field: {
        field_type: "deformation",
        shape: [64, 64, 32],
        data_ref: "synthetic://deformation_field",
        units: "μm",
        peak_value: 3.2,
      },
      peak_stress_mpa: 450,
      von_mises_stress_mpa: 420,
      mean_stress_mpa: 180,
    },

    deformation: {
      warpage_um: 1.8,
      interface_gap_nm: 15,
      void_fraction_pct: 2.1,
      curvature_per_mm: 0.05,
    },

    interface: {
      contact_area_fraction: 0.95,
      void_probability: 0.032,
      crack_probability: 0.008,
      gap_profile: {
        center_nm: 10,
        edge_nm: 20,
      },
    },

    defect: {
      void_risk: createRiskScore(0.032),
      crack_risk: createRiskScore(0.008),
    },

    reconstruction_quality: {
      confidence: createConfidenceScore(0.91),
      uncertainty_pct: 8.2,
      fidelity_score: 0.88,
      method: "pinn",
    },

    key_metrics: {
      warpage_um: 1.8,
      interface_gap_nm: 15,
      peak_stress_mpa: 450,
      void_risk_pct: 3.2,
      crack_risk_pct: 0.8,
      quality_score: 88,
    },

    metadata: {
      is_synthetic: true,
      source: "demo_synthetic",
      computation_time_ms: 234,
    },
  };

  return { ...baseState, ...overrides };
}

/**
 * Validate an MPState
 */
export function validateMPState(state: Partial<MPState>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!state.mpstate_id) errors.push("mpstate_id is required");
  if (!state.process) errors.push("process is required");
  if (!state.thermal) errors.push("thermal state is required");
  if (!state.mechanical) errors.push("mechanical state is required");
  if (state.deformation?.warpage_um === undefined)
    errors.push("warpage_um is required");

  return {
    valid: errors.length === 0,
    errors,
  };
}
