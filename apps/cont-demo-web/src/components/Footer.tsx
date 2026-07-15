import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
        padding: "40px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>Product</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  ConT Physics
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  ConT Fabs
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  ConT Studio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  About
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  License
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Security
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "20px",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          <p>
            © 2026 Conception Co., Ltd. All Rights Reserved.{" "}
            <strong>This is a public demo with synthetic data.</strong>
          </p>
          <p style={{ marginTop: "8px" }}>
            For production use: <a href="mailto:sales@conception.ai" style={{ color: "#0066cc" }}>sales@conception.ai</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
