import React from "react";
import '../../styles/candidate.css';



export default function CandidateDashboard() {
  return (
    <div className="dashboard-wrapper">
      <h2>🎯 My Applications</h2>
      <ul>
        <li>Frontend Developer - Status: In Review</li>
        <li>Data Analyst - Status: Interview Scheduled</li>
      </ul>

      <h2>📅 Upcoming Interviews</h2>
      <ul>
        <li>May 25, 2025 – 10:00 AM with Acme Corp</li>
      </ul>

      <h2>📝 Feedback / Status</h2>
      <ul>
        <li>“Strong React skills” – from Beta Inc</li>
      </ul>
    </div>
  );
}
