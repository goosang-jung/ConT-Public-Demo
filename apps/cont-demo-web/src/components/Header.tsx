import React from "react";

type Page = "landing" | "demo" | "portfolio" | "inspector" | "evidence";

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const navStyle = (page: Page) => ({
    cursor: "pointer",
    padding: "8px 16px",
    borderBottom: currentPage === page ? "3px solid #0066cc" : "none",
    color: currentPage === page ? "#0066cc" : "#333",
    fontWeight: currentPage === page ? "600" : "400",
  });

  return (
    <header
      style={{
        borderBottom: "1px solid #e0e0e0",
        padding: "20px",
        backgroundColor: "#f9f9f9",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}
          >
            ConT Public Demo
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            ⚠️ Synthetic Data Only • Not for Production
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "0",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
          }}
        >
          <div
            onClick={() => onNavigate("landing")}
            style={navStyle("landing")}
          >
            Home
          </div>
          <div onClick={() => onNavigate("demo")} style={navStyle("demo")}>
            Demo
          </div>
          <div
            onClick={() => onNavigate("portfolio")}
            style={navStyle("portfolio")}
          >
            Products
          </div>
          <div
            onClick={() => onNavigate("inspector")}
            style={navStyle("inspector")}
          >
            Inspector
          </div>
          <div
            onClick={() => onNavigate("evidence")}
            style={navStyle("evidence")}
          >
            Evidence
          </div>
        </nav>
      </div>
    </header>
  );
}
