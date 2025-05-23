// src/pages/recruiter/RecruiterDashboard.js
import React from "react";
import "../../styles/recruiter.css";

export default function RecruiterDashboard() {
  return (
    <div className="recruiter-wrapper">
      <h2>👤 Recruiter Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>Open Jobs</h3>
          <p>5</p>
        </div>
        <div className="metric">
          <h3>Assigned Candidates</h3>
          <p>18</p>
        </div>
        <div className="metric">
          <h3>Interviews This Week</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
