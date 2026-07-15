import React from "react";

type Page = "landing" | "demo" | "portfolio" | "inspector" | "evidence";

interface LandingProps {
  onNavigate: (page: Page) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "80px",
          paddingBottom: "40px",
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#0066cc",
            marginBottom: "20px",
          }}
        >
          ConT
        </h1>
        <h2 style={{ fontSize: "32px", color: "#333", marginBottom: "20px" }}>
          Manufacturing Physical AI Platform
        </h2>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
          Reconstruct Hidden Physics.<br />
          Predict Future Manufacturing States.<br />
          Validate Every Decision with Evidence.
        </p>
        <button
          onClick={() => onNavigate("demo")}
          style={{
            padding: "16px 40px",
            fontSize: "18px",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Start Demo →
        </button>
      </section>

      {/* What is ConT */}
      <section style={{ marginBottom: "60px" }}>
        <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
          What is ConT?
        </h3>
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#555" }}>
          ConT is <strong>not</strong> another dashboard or solver. It is a{" "}
          <strong>Manufacturing Physics Control & Evidence Layer</strong> that
          connects factory observations, physical models, AI models, commercial
          solvers, measurements, validation rules, and human approval.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#555", marginTop: "15px" }}>
          ConT reconstructs <strong>hidden physics</strong> from observations,
          builds <strong>canonical physical states</strong> (MPState), predicts{" "}
          <strong>future manufacturing outcomes</strong>, and generates{" "}
          <strong>production-grade evidence</strong> for every decision.
        </p>
      </section>

      {/* Product Suite */}
      <section style={{ marginBottom: "60px" }}>
        <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px" }}>
          Product Suite
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              title: "ConT Physics",
              desc: "Inverse physics reconstruction engine. Reconstructs hidden fields from observations.",
            },
            {
              title: "ConT Fabs",
              desc: "Manufacturing process control. Hybrid Bonding, Thermal Processes, Packaging.",
            },
            {
              title: "ConT Studio",
              desc: "Visual evidence platform. What-if analysis, predictions, evidence generation.",
            },
          ].map((product) => (
            <div
              key={product.title}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
                {product.title}
              </h4>
              <p style={{ fontSize: "14px", color: "#666" }}>{product.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Workflow */}
      <section style={{ marginBottom: "60px" }}>
        <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px" }}>
          Core Workflow
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "15px",
            padding: "30px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
          }}
        >
          {[
            "Observe",
            "Reconstruct",
            "Predict",
            "Validate",
            "Approve",
          ].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#0066cc",
                  color: "white",
                  borderRadius: "50%",
                  fontWeight: "600",
                  minWidth: "40px",
                  textAlign: "center",
                }}
              >
                {step[0]}
              </div>
              {i < 4 && (
                <div style={{ margin: "0 10px", fontSize: "20px" }}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Demo Highlights */}
      <section style={{ marginBottom: "60px" }}>
        <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
          Hybrid Bonding Demo
        </h3>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          See how ConT analyzes wafer bonding processes: from observation through
          hidden physics reconstruction to production decision.
        </p>
        <button
          onClick={() => onNavigate("demo")}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Try Demo
        </button>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "40px",
          backgroundColor: "#f0f5ff",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
          Ready to Learn More?
        </h3>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          For production use, commercial licensing, or integration questions:
        </p>
        <a
          href="mailto:contact@conception.ai"
          style={{
            display: "inline-block",
            padding: "12px 30px",
            backgroundColor: "#0066cc",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "600",
          }}
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
