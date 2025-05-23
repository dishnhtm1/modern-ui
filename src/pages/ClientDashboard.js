// src/pages/ClientDashboard.js
import React from "react";
import "../styles/Dashboard.css";

export default function ClientDashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="header-row">
        <h2>🏢 Client Dashboard</h2>
      </div>

      <div className="metrics">
        <div className="metric">
          <h3>Active Requests</h3>
          <p>3</p>
        </div>
        <div className="metric">
          <h3>Open Interviews</h3>
          <p>4</p>
        </div>
        <div className="metric">
          <h3>Hires</h3>
          <p>2</p>
        </div>
      </div>

      <div className="pipeline">
        <h3>Job Status</h3>
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Status</th>
              <th>Candidates</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Backend Developer</td><td>Open</td><td>10</td></tr>
            <tr><td>QA Analyst</td><td>In Progress</td><td>5</td></tr>
            <tr><td>Project Manager</td><td>Hired</td><td>1</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
