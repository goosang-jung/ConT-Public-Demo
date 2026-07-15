import React, { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T;
  metadata: any;
}

export default function Evidence() {
  const [evidence, setEvidence] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvidence = async () => {
      try {
        const response = await fetch("/api/demo/evidence/hb-001", {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to load");

        const data = (await response.json()) as ApiResponse<any>;
        setEvidence(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvidence();
  }, []);

  if (loading) {
    return <div style={{ paddingTop: "40px" }}>Loading evidence...</div>;
  }

  if (!evidence) {
    return <div style={{ paddingTop: "40px" }}>No evidence available</div>;
  }

  const ValidationStatus = () => (
    <div
      style={{
        padding: "30px",
        borderRadius: "8px",
        backgroundColor:
          evidence.decision?.recommendation === "APPROVE" ? "#e8f5e9" : "#ffebee",
        border: `2px solid ${
          evidence.decision?.recommendation === "APPROVE" ? "#2e7d32" : "#c62828"
        }`,
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color:
            evidence.decision?.recommendation === "APPROVE"
              ? "#2e7d32"
              : "#c62828",
          marginBottom: "10px",
        }}
      >
        {evidence.decision?.recommendation === "APPROVE" ? "✓ APPROVED" : "✗ REJECTED"}
      </div>
      <div style={{ fontSize: "16px", color: "#333" }}>
        {evidence.decision?.justification}
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        Production Evidence
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        Complete validation report and decision record
      </p>

      <ValidationStatus />

      {/* Prediction vs Measurement */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Prediction vs Measurement
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {evidence.prediction_vs_measurement?.comparisons?.map(
            (comp: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: "15px",
                  border: comp.matches ? "2px solid #2e7d32" : "2px solid #c62828",
                  borderRadius: "4px",
                  backgroundColor: comp.matches ? "#f1f8e9" : "#ffebee",
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "10px" }}>
                  {comp.metric}
                </div>
                <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
                  Predicted: <strong>{comp.predicted_value}</strong> {comp.unit}
                </div>
                <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
                  Measured: <strong>{comp.measured_value}</strong> {comp.unit}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: comp.matches ? "#2e7d32" : "#c62828",
                    fontWeight: "600",
                  }}
                >
                  Error: {comp.relative_error_pct.toFixed(1)}%
                  {comp.matches ? " ✓" : " ✗"}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Validation Criteria */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Acceptance Criteria
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          {evidence.validation?.criterion_results?.map(
            (result: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: "15px",
                  border: result.satisfied ? "1px solid #e0e0e0" : "2px solid #c62828",
                  borderRadius: "4px",
                  backgroundColor: result.satisfied ? "#f5f5f5" : "#ffebee",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: result.satisfied ? "#333" : "#c62828",
                  }}
                >
                  {result.criterion?.name}
                  {result.satisfied ? " ✓" : " ✗"}
                </div>
                <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>
                  Threshold: &lt; {result.criterion?.threshold_value}{" "}
                  {result.criterion?.unit}
                </div>
                <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>
                  Measured: {result.measured_value} {result.criterion?.unit}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: result.satisfied ? "#2e7d32" : "#c62828",
                  }}
                >
                  {result.message}
                </div>
              </div>
            )
          )}
        </div>
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>Pass Rate:</strong>{" "}
          {evidence.validation?.pass_rate_pct.toFixed(0)}% (
          {evidence.validation?.passed_count}/{evidence.validation?.total_count})
        </div>
      </section>

      {/* Risk Assessment */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Risk Assessment
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {[
            {
              label: "Void Risk",
              value: evidence.risk_assessment?.void_risk,
            },
            {
              label: "Crack Risk",
              value: evidence.risk_assessment?.crack_risk,
            },
            {
              label: "Risk Level",
              value: evidence.risk_assessment?.risk_level,
              isText: true,
            },
            {
              label: "Estimated Yield",
              value: evidence.risk_assessment?.estimated_yield_pct?.toFixed(1),
              unit: "%",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0066cc" }}>
                {item.isText
                  ? item.value
                  : typeof item.value === "number"
                    ? (item.value * 100).toFixed(1)
                    : item.value}
                {!item.isText && (
                  <span style={{ fontSize: "12px", color: "#999", marginLeft: "4px" }}>
                    {item.unit || "%"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {evidence.risk_assessment?.risk_factors && (
          <div
            style={{
              padding: "15px",
              backgroundColor: "#fffbf0",
              borderLeft: "4px solid #ff9900",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontWeight: "600", marginBottom: "10px" }}>
              Risk Factors
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {evidence.risk_assessment.risk_factors.map(
                (factor: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      marginBottom: "5px",
                    }}
                  >
                    • {factor}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </section>

      {/* Quality Metrics */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Quality Metrics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {[
            {
              label: "Model Confidence",
              value: evidence.quality_metrics?.model_confidence,
            },
            {
              label: "Data Quality",
              value: evidence.quality_metrics?.data_quality,
            },
            {
              label: "Analysis Completeness",
              value: evidence.quality_metrics?.analysis_completeness,
            },
            {
              label: "Evidence Reliability",
              value: evidence.quality_metrics?.evidence_reliability,
            },
          ].map((metric, i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                backgroundColor: "#e6f2ff",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#0066cc",
                }}
              >
                {(metric.value * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decision */}
      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Decision & Actions
        </h2>
        <div style={{ padding: "20px", backgroundColor: "#f0f5ff", borderRadius: "4px" }}>
          <div style={{ fontWeight: "600", marginBottom: "15px" }}>
            Required Actions:
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {evidence.decision?.required_actions?.map(
              (action: string, i: number) => (
                <li
                  key={i}
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    marginBottom: "8px",
                    paddingLeft: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "#0066cc",
                    }}
                  >
                    ✓
                  </span>
                  {action}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          backgroundColor: "#fffbf0",
          borderLeft: "4px solid #ff9900",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        ⚠️ <strong>This is synthetic demo evidence.</strong> Production decisions must use
        the commercial ConT system with real physics reconstruction and validated
        acceptance criteria.
      </div>
    </div>
  );
}
