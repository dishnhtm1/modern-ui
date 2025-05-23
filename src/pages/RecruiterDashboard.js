// src/pages/RecruiterDashboard.js
import React from "react";
import "../styles/Dashboard.css";

export default function RecruiterDashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="header-row">
        <h2>🧑‍💼 Recruiter Dashboard</h2>
      </div>

      <div className="metrics">
        <div className="metric">
          <h3>Open Positions</h3>
          <p>5</p>
        </div>
        <div className="metric">
          <h3>Time to Hire</h3>
          <p>30 days</p>
        </div>
        <div className="metric">
          <h3>Rejection Rate</h3>
          <p>12%</p>
        </div>
      </div>

      <div className="pipeline">
        <h3>Candidate Pipeline</h3>
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Applied</td><td>50</td></tr>
            <tr><td>Screening</td><td>30</td></tr>
            <tr><td>Interview</td><td>20</td></tr>
            <tr><td>Offer</td><td>10</td></tr>
            <tr><td>Hired</td><td>5</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
