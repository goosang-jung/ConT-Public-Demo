import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import HybridBondingDemo from "./pages/HybridBondingDemo";
import ProductPortfolio from "./pages/ProductPortfolio";
import MPStateInspector from "./pages/MPStateInspector";
import WhatIfAnalysis from "./pages/WhatIfAnalysis";
import Evidence from "./pages/Evidence";

type Page = "landing" | "demo" | "portfolio" | "inspector" | "evidence";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const renderPage = () => {
    switch (currentPage) {
      case "demo":
        return <HybridBondingDemo />;
      case "portfolio":
        return <ProductPortfolio />;
      case "inspector":
        return <MPStateInspector />;
      case "evidence":
        return <Evidence />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: 1.6,
      }}
    >
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main
        style={{
          flex: 1,
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
