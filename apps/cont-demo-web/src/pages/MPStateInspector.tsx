import React, { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T;
  metadata: any;
}

export default function MPStateInspector() {
  const [mpstate, setMpstate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "thermal" | "electrical" | "mechanical" | "interface"
  >("thermal");

  const loadMPState = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/demo/reconstruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario_id: "hb-001" }),
      });

      if (!response.ok) throw new Error("Failed to load");

      const data = (await response.json()) as ApiResponse<any>;
      setMpstate(data.data.mpstate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMPState();
  }, []);

  const FieldCard = ({
    title,
    value,
    unit,
    color,
  }: {
    title: string;
    value: number;
    unit: string;
    color: string;
  }) => (
    <div style={{ marginBottom: "15px" }}>
      <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>
        {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: color,
            borderRadius: "50%",
            opacity: 0.3,
          }}
        />
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
          {value}
          <span style={{ fontSize: "13px", color: "#666", marginLeft: "4px" }}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  );

  const TabButton = (tab: typeof activeTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: "10px 16px",
        backgroundColor: activeTab === tab ? "#0066cc" : "transparent",
        color: activeTab === tab ? "white" : "#333",
        border: "none",
        borderBottom: activeTab === tab ? "3px solid #0066cc" : "1px solid #ddd",
        cursor: "pointer",
        fontWeight: activeTab === tab ? "600" : "400",
      }}
    >
      {label}
    </button>
  );

  if (!mpstate) {
    return (
      <div style={{ paddingTop: "40px", textAlign: "center" }}>
        <p>Loading MPState...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        MPState Inspector
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        Explore the reconstructed Canonical Manufacturing Physical State
      </p>

      {/* Reconstruction Quality */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f5ff",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666" }}>Confidence</div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#0066cc",
                marginTop: "5px",
              }}
            >
              {(mpstate.reconstruction_quality?.confidence * 100).toFixed(0)}%
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666" }}>Fidelity</div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#0066cc",
                marginTop: "5px",
              }}
            >
              {(mpstate.reconstruction_quality?.fidelity_score * 100).toFixed(0)}%
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#666" }}>Quality Score</div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#0066cc",
                marginTop: "5px",
              }}
            >
              {mpstate.key_metrics?.quality_score}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "2px solid #ddd", marginBottom: "20px" }}>
        {TabButton("thermal", "Thermal")}
        {TabButton("electrical", "Electrical")}
        {TabButton("mechanical", "Mechanical")}
        {TabButton("interface", "Interface")}
      </div>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <div>
          {activeTab === "thermal" && (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
                Thermal Field
              </h3>
              <FieldCard
                title="Peak Temperature"
                value={mpstate.thermal?.peak_temperature_c}
                unit="°C"
                color="#ff6b6b"
              />
              <FieldCard
                title="Mean Temperature"
                value={mpstate.thermal?.mean_temperature_c}
                unit="°C"
                color="#ff6b6b"
              />
              <FieldCard
                title="Min Temperature"
                value={mpstate.thermal?.min_temperature_c}
                unit="°C"
                color="#ff6b6b"
              />
            </div>
          )}

          {activeTab === "electrical" && (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
                Electrical Field
              </h3>
              <FieldCard
                title="Peak Current Density"
                value={mpstate.electrical?.peak_current_density}
                unit="A/mm²"
                color="#4ecdc4"
              />
              <FieldCard
                title="Mean Current Density"
                value={mpstate.electrical?.mean_current_density}
                unit="A/mm²"
                color="#4ecdc4"
              />
              <FieldCard
                title="Total Current"
                value={mpstate.electrical?.total_current_a}
                unit="A"
                color="#4ecdc4"
              />
              <FieldCard
                title="Power Dissipation"
                value={mpstate.electrical?.power_dissipation_w}
                unit="W"
                color="#4ecdc4"
              />
            </div>
          )}

          {activeTab === "mechanical" && (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
                Mechanical Field
              </h3>
              <FieldCard
                title="Peak Stress"
                value={mpstate.mechanical?.peak_stress_mpa}
                unit="MPa"
                color="#95e1d3"
              />
              <FieldCard
                title="Von Mises Stress"
                value={mpstate.mechanical?.von_mises_stress_mpa}
                unit="MPa"
                color="#95e1d3"
              />
              <FieldCard
                title="Mean Stress"
                value={mpstate.mechanical?.mean_stress_mpa}
                unit="MPa"
                color="#95e1d3"
              />
            </div>
          )}

          {activeTab === "interface" && (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
                Interface State
              </h3>
              <FieldCard
                title="Contact Area Fraction"
                value={mpstate.interface?.contact_area_fraction * 100}
                unit="%"
                color="#f8b500"
              />
              <FieldCard
                title="Void Probability"
                value={mpstate.interface?.void_probability * 100}
                unit="%"
                color="#f8b500"
              />
              <FieldCard
                title="Crack Probability"
                value={mpstate.interface?.crack_probability * 100}
                unit="%"
                color="#f8b500"
              />
            </div>
          )}
        </div>

        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
            Key Metrics Summary
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                label: "Warpage",
                value: mpstate.key_metrics?.warpage_um,
                unit: "μm",
              },
              {
                label: "Interface Gap",
                value: mpstate.key_metrics?.interface_gap_nm,
                unit: "nm",
              },
              {
                label: "Peak Stress",
                value: mpstate.key_metrics?.peak_stress_mpa,
                unit: "MPa",
              },
              {
                label: "Void Risk",
                value: mpstate.key_metrics?.void_risk_pct,
                unit: "%",
              },
              {
                label: "Crack Risk",
                value: mpstate.key_metrics?.crack_risk_pct,
                unit: "%",
              },
            ].map((metric, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                }}
              >
                <span style={{ color: "#666" }}>{metric.label}</span>
                <span style={{ fontWeight: "600" }}>
                  {metric.value}
                  <span style={{ fontSize: "12px", color: "#999", marginLeft: "4px" }}>
                    {metric.unit}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#fffbf0",
              borderLeft: "4px solid #ff9900",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontSize: "13px", color: "#666" }}>
              <strong>Note:</strong> All values are from synthetic demo data.
              Real reconstruction uses proprietary physics algorithms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
