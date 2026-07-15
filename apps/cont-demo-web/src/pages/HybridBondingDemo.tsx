import React, { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T;
  metadata: any;
}

export default function HybridBondingDemo() {
  const [loading, setLoading] = useState(false);
  const [observation, setObservation] = useState<any>(null);
  const [mpstate, setMpstate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"obs" | "physics" | "rollout">(
    "obs"
  );

  const loadDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/demo/reconstruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario_id: "hb-001" }),
      });

      if (!response.ok) throw new Error("Failed to load demo");

      const data = (await response.json()) as ApiResponse<any>;
      setObservation(data.data.observation);
      setMpstate(data.data.mpstate);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemo();
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        Hybrid Bonding Demo
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        ⚠️ <strong>Synthetic Demo Data</strong> — Not for production decisions
      </p>

      {/* Controls */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={loadDemo}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            fontWeight: "600",
          }}
        >
          {loading ? "Loading..." : "Load Scenario"}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          Error: {error}
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          borderBottom: "2px solid #ddd",
          marginBottom: "20px",
          display: "flex",
          gap: "0",
        }}
      >
        {(["obs", "physics", "rollout"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 20px",
              backgroundColor: activeTab === tab ? "#0066cc" : "transparent",
              color: activeTab === tab ? "white" : "#333",
              border: "none",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "600" : "400",
              borderBottom: activeTab === tab ? "3px solid #0066cc" : "none",
            }}
          >
            {tab === "obs"
              ? "Observation"
              : tab === "physics"
                ? "Hidden Physics"
                : "Prediction"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ minHeight: "400px" }}>
        {activeTab === "obs" && observation && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
              Raw Manufacturing Data
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Temperature</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {observation.process_parameters?.temperature_c}°C
                </div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Current</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {observation.process_parameters?.current_a}A
                </div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Time</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {observation.process_parameters?.time_s}s
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "physics" && mpstate && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
              Reconstructed Physical State (MPState)
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Warpage</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {mpstate.key_metrics?.warpage_um}μm
                </div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Void Risk</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {(mpstate.key_metrics?.void_risk_pct * 100).toFixed(1)}%
                </div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Peak Stress</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {mpstate.key_metrics?.peak_stress_mpa}MPa
                </div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Confidence</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>
                  {(mpstate.reconstruction_quality?.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "rollout" && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
              Future Predictions
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Based on the reconstructed physics, ConT predicts future manufacturing
              outcomes and validates against acceptance criteria.
            </p>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f5ff",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#0066cc" }}>
                ✓ All criteria PASS
              </div>
              <div style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
                Void risk within limits • Warpage acceptable • Stress manageable
              </div>
              <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                <strong>Recommendation: APPROVE</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fffbf0",
          borderLeft: "4px solid #ff9900",
          borderRadius: "4px",
        }}
      >
        <strong>About This Demo</strong>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
          This demonstration uses synthetic data to show ConT's workflow. Real
          production use requires commercial licensing, actual physics
          reconstruction algorithms, and solver integration.
        </p>
      </div>
    </div>
  );
}
