/**
 * Observation interface
 *
 * Raw data from manufacturing process: images, sensor readings, process parameters
 * This is the INPUT to the reconstruction workflow.
 */

import { ProcessParameters, MaterialProperties, ManufacturingProcess } from "./Common";

/**
 * Raw thermal image data
 * In demo: reference to synthetic image
 * In production: actual image array or reference to blob storage
 */
export interface ThermalImageData {
  /** Image format (always "url" for demo) */
  format: "url" | "base64" | "array";

  /** URL or data reference */
  data: string;

  /** Image resolution */
  resolution: {
    width_px: number;
    height_px: number;
  };

  /** Spatial calibration (pixels to mm) */
  calibration_px_per_mm: number;

  /** Temperature range in the image */
  temperature_range_c: {
    min: number;
    max: number;
  };

  /** Emissivity used for temperature conversion */
  emissivity: number;

  /** Camera specification (optional) */
  camera?: {
    model: string;
    resolution_ir: string;
    wavelength_um: string;
  };
}

/**
 * Measurement point (individual sensor reading)
 */
export interface MeasurementPoint {
  /** Measurement type: temperature, force, displacement, etc. */
  type:
    | "temperature_c"
    | "force_n"
    | "displacement_um"
    | "pressure_mpa"
    | "current_a"
    | "voltage_v"
    | "alignment_um"
    | "gap_nm"
    | "custom";

  /** Measured value */
  value: number;

  /** Measurement unit */
  unit: string;

  /** Spatial location (x, y, z in mm relative to wafer center) */
  location?: {
    x_mm: number;
    y_mm: number;
    z_mm?: number;
  };

  /** Uncertainty (±) */
  uncertainty?: number;

  /** Timestamp when measurement was taken */
  timestamp: string; // ISO 8601
}

/**
 * Sensor readings: discretized measurements
 * These are used to validate predictions
 */
export interface SensorReadings {
  /** Array of measurement points */
  measurements: MeasurementPoint[];

  /** Total number of sensors used */
  sensor_count: number;

  /** Sampling rate (Hz) if time-series */
  sampling_rate_hz?: number;

  /** Duration of measurement (seconds) */
  duration_s?: number;
}

/**
 * Observation: Complete set of data about manufacturing state
 * This is what you observe from the factory
 */
export interface Observation {
  /** Scenario ID for tracking */
  scenario_id: string;

  /** Unique observation ID */
  observation_id: string;

  /** Manufacturing process type */
  process: ManufacturingProcess;

  /** Timestamp when observation was taken */
  timestamp: string; // ISO 8601

  /** === Thermal Data === */
  thermal?: {
    /** Thermal image from IR camera */
    image?: ThermalImageData;

    /** Ambient temperature (°C) */
    ambient_temperature_c?: number;

    /** Environment relative humidity (%) */
    relative_humidity_pct?: number;

    /** Radiation view factor (for emissivity correction) */
    view_factor?: number;
  };

  /** === Electrical Data === */
  electrical?: {
    /** Applied voltage (V) */
    applied_voltage_v?: number;

    /** Measured current (A) */
    measured_current_a?: number;

    /** Current waveform (if AC) */
    frequency_hz?: number;

    /** Power dissipation (W) */
    power_w?: number;
  };

  /** === Mechanical Data === */
  mechanical?: {
    /** Applied force (N) */
    applied_force_n?: number;

    /** Applied pressure (MPa) */
    applied_pressure_mpa?: number;

    /** Alignment offset (μm) */
    alignment_offset_um?: number;

    /** Contact area (mm²) */
    contact_area_mm2?: number;
  };

  /** === Material Data === */
  materials: {
    /** Top material (die) */
    top: MaterialProperties;

    /** Bottom material (substrate) */
    bottom: MaterialProperties;

    /** Bonding material (adhesive, solder, etc.) */
    interface?: MaterialProperties;
  };

  /** === Process Parameters === */
  process_parameters: ProcessParameters;

  /** === Sensor Readings === */
  sensor_readings: SensorReadings;

  /** === Data Quality === */
  data_quality: {
    /** Overall data quality score (0-1) */
    quality_score: number;

    /** Known issues or artifacts */
    notes?: string[];

    /** Missing or invalid data points */
    missing_data?: string[];
  };

  /** === Metadata === */
  metadata: {
    /** Is this data synthetic (demo) or real? */
    is_synthetic: true; // Always true for public demo

    /** Source: "demo_generated", "lab_measured", "production" */
    source: "demo_generated" | "lab_measured" | "production";

    /** Equipment or tool used to collect data */
    equipment?: string;

    /** Operator or automation system */
    operator?: string;

    /** Lot or batch ID */
    lot_id?: string;

    /** Wafer ID */
    wafer_id?: string;

    /** Dies or samples involved */
    sample_ids?: string[];
  };
}

/**
 * Simplified observation (for demos and quick testing)
 * Contains only essential fields
 */
export interface SimpleObservation {
  observation_id: string;
  process: ManufacturingProcess;
  temperature_c: number;
  time_s: number;
  is_synthetic: true;
  timestamp: string;
}

/**
 * Observation request (what the API receives)
 */
export interface ObservationRequest {
  scenario_id: string;
  observation?: Observation;
}

/**
 * Observation response (what the API returns)
 */
export interface ObservationResponse {
  observation: Observation | SimpleObservation;
  preview?: {
    thermal_image_url?: string;
    key_measurements?: Record<string, number>;
  };
}

/**
 * Validate an observation
 * Ensures required fields are present
 */
export function validateObservation(obs: Partial<Observation>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!obs.observation_id) errors.push("observation_id is required");
  if (!obs.process) errors.push("process type is required");
  if (!obs.materials) errors.push("material properties are required");
  if (!obs.process_parameters) errors.push("process parameters are required");
  if (!obs.timestamp) errors.push("timestamp is required");

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Create a minimal synthetic observation for demo
 */
export function createDemoObservation(
  scenarioId: string,
  process: ManufacturingProcess
): Observation {
  return {
    scenario_id: scenarioId,
    observation_id: `obs-${Date.now()}`,
    process,
    timestamp: new Date().toISOString(),
    thermal: {
      ambient_temperature_c: 25,
      relative_humidity_pct: 45,
    },
    electrical: {
      applied_voltage_v: 5.0,
      measured_current_a: 0.5,
    },
    mechanical: {
      applied_force_n: 1000,
      alignment_offset_um: 0.5,
    },
    materials: {
      top: {
        material: "silicon",
        thickness_um: 50,
      },
      bottom: {
        material: "silicon",
        thickness_um: 100,
      },
    },
    process_parameters: {
      temperature_c: 250,
      time_s: 30,
      pressure_mpa: 10,
    },
    sensor_readings: {
      measurements: [
        {
          type: "temperature_c",
          value: 250,
          unit: "°C",
          timestamp: new Date().toISOString(),
        },
      ],
      sensor_count: 1,
    },
    data_quality: {
      quality_score: 0.95,
    },
    metadata: {
      is_synthetic: true,
      source: "demo_generated",
      equipment: "Demo System",
    },
  };
}
