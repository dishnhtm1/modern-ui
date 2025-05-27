import React from "react";
import CandidateDashboard from "./Candidate/CandidateDashboard";
import RecruiterDashboard from './recruiter/RecruiterDashboard';
import ClientDashboard from './client/ClientDashboard';

import AdminDashboard from "./AdminDashboard";

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

  const previewRole = localStorage.getItem("previewRole");
  const role = previewRole || user.role;

  // ✅ Debug logs
  console.log("user:", user);
  console.log("previewRole:", previewRole);
  console.log("resolved role:", role);

  switch (role) {
    case "candidate":
      return <CandidateDashboard />;
    case "recruiter":
      return <RecruiterDashboard />;
    case "client":
      return <ClientDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <p>Unknown role</p>;
  }
}
