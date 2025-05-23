// src/layout/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <main style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
}
