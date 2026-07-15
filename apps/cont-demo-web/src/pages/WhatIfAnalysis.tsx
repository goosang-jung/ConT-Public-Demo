import React, { useState } from "react";

interface ApiResponse<T> {
  data: T;
  metadata: any;
}

export default function WhatIfAnalysis() {
  const [tempDelta, setTempDelta] = useState(10);
  const [timeDelta, setTimeDelta] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/demo/what-if", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseline_scenario_id: "hb-001",
          parameter_delta: {
            temperature_c: tempDelta,
            time_s: timeDelta,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to run analysis");

      const data = (await response.json()) as ApiResponse<any>;
      setResult(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        What-if Analysis
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        Compare baseline scenario with alternative process parameters
      </p>

      {/* Input Section */}
      <div
        style={{
          padding: "30px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
          Baseline: HB-001
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
              Temperature
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0066cc" }}>
              250°C
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
              Time
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0066cc" }}>
              30s
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
              Pressure
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0066cc" }}>
              10 MPa
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
          Alternative Parameters
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "8px" }}>
              Temperature Change: <strong>{tempDelta > 0 ? "+" : ""}{tempDelta}°C</strong>
            </label>
            <input
              type="range"
              min="-10"
              max="20"
              value={tempDelta}
              onChange={(e) => setTempDelta(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
              Baseline: 250°C → {250 + tempDelta}°C
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "8px" }}>
              Time Change: <strong>{timeDelta > 0 ? "+" : ""}{timeDelta}s</strong>
            </label>
            <input
              type="range"
              min="-5"
              max="15"
              value={timeDelta}
              onChange={(e) => setTimeDelta(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
              Baseline: 30s → {30 + timeDelta}s
            </div>
          </div>
        </div>

        <button
          onClick={runAnalysis}
          disabled={loading}
          style={{
            padding: "12px 30px",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Analyzing..." : "Run What-if Analysis"}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
            Comparison Results
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {/* Baseline */}
            <div
              style={{
                padding: "20px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "15px",
                }}
              >
                Baseline
              </h3>
              {[
                {
                  label: "Warpage",
                  value: result.baseline?.predictions?.final_warpage_um,
                  unit: "μm",
                },
                {
                  label: "Void Risk",
                  value: (result.baseline?.predictions?.void_probability * 100).toFixed(1),
                  unit: "%",
                },
                {
                  label: "Stress",
                  value: result.baseline?.predictions?.final_peak_stress_mpa,
                  unit: "MPa",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <span style={{ color: "#666" }}>{m.label}</span>
                  <span style={{ fontWeight: "600" }}>
                    {m.value} {m.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Alternative */}
            <div
              style={{
                padding: "20px",
                border: "2px solid #0066cc",
                borderRadius: "8px",
                backgroundColor: "#f0f5ff",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "15px",
                }}
              >
                Alternative
              </h3>
              {[
                {
                  label: "Warpage",
                  value: result.alternative?.predictions?.final_warpage_um,
                  unit: "μm",
                },
                {
                  label: "Void Risk",
                  value: (result.alternative?.predictions?.void_probability * 100).toFixed(1),
                  unit: "%",
                },
                {
                  label: "Stress",
                  value: result.alternative?.predictions?.final_peak_stress_mpa,
                  unit: "MPa",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <span style={{ color: "#333", fontWeight: "500" }}>
                    {m.label}
                  </span>
                  <span style={{ fontWeight: "700", color: "#0066cc" }}>
                    {m.value} {m.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deltas */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              Changes
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {Object.entries(result.comparison?.deltas || {}).map(
                ([key, value]: [string, any]) => {
                  const isImprovement =
                    (key === "warpage_delta_um" && value < 0) ||
                    (key === "stress_delta_mpa" && value < 0) ||
                    (key === "void_risk_delta_pct" && value < 0) ||
                    (key === "crack_risk_delta_pct" && value < 0);

                  return (
                    <div
                      key={key}
                      style={{
                        padding: "15px",
                        backgroundColor: isImprovement ? "#e8f5e9" : "#fff3e0",
                        borderRadius: "4px",
                      }}
                    >
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {key.replace(/_/g, " ")}
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: isImprovement ? "#2e7d32" : "#e65100",
                          marginTop: "5px",
                        }}
                      >
                        {value > 0 ? "+" : ""}
                        {typeof value === "number"
                          ? value.toFixed(2)
                          : value}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0f5ff",
              borderRadius: "8px",
              borderLeft: "4px solid #0066cc",
            }}
          >
            <div style={{ fontWeight: "600", color: "#0066cc", marginBottom: "8px" }}>
              Recommendation
            </div>
            <div style={{ fontSize: "14px", color: "#333" }}>
              {result.recommendation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
