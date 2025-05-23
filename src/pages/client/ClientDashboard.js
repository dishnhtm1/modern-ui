import React from "react";
import "../../styles/client.css";


export default function ClientDashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="header-row">
        <h2>📊 Client Dashboard</h2>
      </div>

      <div className="metrics">
        <div className="metric">
          <h3>Total Job Requests</h3>
          <p>12</p>
        </div>
        <div className="metric">
          <h3>Pending Interviews</h3>
          <p>5</p>
        </div>
        <div className="metric">
          <h3>Feedback Submitted</h3>
          <p>8</p>
        </div>
      </div>

      <div className="pipeline">
        <h3>Recent Job Submissions</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Status</th>
              <th>Candidates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frontend Developer</td>
              <td>Open</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Data Analyst</td>
              <td>Interviewing</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
