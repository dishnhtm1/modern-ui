// src/pages/Dashboard.js
import React from "react";
import CandidateDashboard from "./Candidate/CandidateDashboard";
import RecruiterDashboard from "./RecruiterDashboard";
import ClientDashboard from "./ClientDashboard";

export default function Dashboard() {
  let user = null;

  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("❌ Invalid user JSON:", err);
    localStorage.removeItem("user");
  }

  if (!user) return <p>Please login</p>;

  switch (user.role) {
    case "candidate":
      return <CandidateDashboard />;
    case "recruiter":
      return <RecruiterDashboard />;
    case "client":
      return <ClientDashboard />;
    default:
      return <p>Unknown role</p>;
  }
}
