import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <main style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {children}
      </main>
    </div>
  );
}
