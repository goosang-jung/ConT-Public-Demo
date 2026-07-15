import React from "react";

export default function ProductPortfolio() {
  const products = [
    {
      name: "ConT Physics",
      subtitle: "Inverse Physics Reconstruction Engine",
      icon: "⚛️",
      features: [
        "Hidden Physics Reconstruction",
        "Multi-Physics Coupling (Thermal + Electrical + Mechanical)",
        "Physics-Informed Neural Networks (PINN)",
        "Uncertainty Quantification",
        "Real-time Computation",
      ],
      description: "The core engine that reconstructs hidden physics from observations.",
      status: "Production Ready",
    },
    {
      name: "ConT Fabs",
      subtitle: "Manufacturing Process Control",
      icon: "🏭",
      features: [
        "Hybrid Bonding (Wafer Bonding)",
        "Thermal Processes (Reflow, Heat Treatment)",
        "Packaging & Assembly (Coming Soon)",
        "Process Parameter Optimization",
        "What-if Scenario Analysis",
      ],
      description: "Specialized modules for manufacturing processes.",
      status: "Hybrid Bonding: Production Ready",
    },
    {
      name: "ConT Studio",
      subtitle: "Visual Evidence Platform",
      icon: "🎨",
      features: [
        "Interactive MPState Inspector",
        "What-if Comparison Dashboard",
        "Future Rollout Prediction",
        "Evidence & Validation Board",
        "PDF/PPTX Report Generation",
      ],
      description: "User-friendly interface for engineers and managers.",
      status: "Production Ready",
    },
  ];

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        Product Portfolio
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
        ConT's three-layer platform: Physics → Process → Interface
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
          marginBottom: "60px",
        }}
      >
        {products.map((product, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              padding: "30px",
              backgroundColor: "#fafafa",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>
              {product.icon}
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "5px" }}>
              {product.name}
            </h3>
            <div style={{ fontSize: "14px", color: "#0066cc", marginBottom: "15px" }}>
              {product.subtitle}
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
              {product.description}
            </p>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                Features:
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {product.features.map((feat, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      marginBottom: "6px",
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
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: "10px",
                backgroundColor: "#e6f2ff",
                borderRadius: "4px",
                fontSize: "13px",
                color: "#0066cc",
                fontWeight: "600",
              }}
            >
              {product.status}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Diagram */}
      <section style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px" }}>
          Architecture
        </h2>

        <div
          style={{
            padding: "30px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            ConT Platform Layers
          </div>

          {[
            { layer: "Interface", product: "ConT Studio", color: "#e6f2ff" },
            { layer: "Processes", product: "ConT Fabs", color: "#fff3e0" },
            { layer: "Physics", product: "ConT Physics", color: "#f3e5f5" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: item.color,
                borderRadius: "4px",
                borderLeft: "4px solid #0066cc",
              }}
            >
              <div style={{ fontWeight: "600" }}>{item.layer}</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                {item.product}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
          Roadmap
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            { quarter: "Q3 2026", items: ["Hybrid Bonding v1.0", "ConT Physics v1.0"] },
            { quarter: "Q4 2026", items: ["Thermal Processes", "Advanced What-if"] },
            { quarter: "Q1 2027", items: ["Packaging", "AI-powered Recommendations"] },
            { quarter: "Q2 2027", items: ["Full Assembly", "Multi-site Support"] },
          ].map((q, i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontWeight: "600", marginBottom: "10px" }}>
                {q.quarter}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {q.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      marginBottom: "6px",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f0f5ff",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "14px", color: "#0066cc", fontWeight: "600" }}>
          ⚠️ This is a public demo. Production features and timeline subject to
          change.
        </p>
      </div>
    </div>
  );
}
