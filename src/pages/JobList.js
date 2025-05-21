import React from "react";
import "../styles/joblist.css";

export default function JobList() {
  return (
    <div className="joblist-wrapper">
      <div className="header-row">
        <h2>Job Requests</h2>
        <div className="actions">
          <button>Create New Request</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Department</th>
            <th>Assigned Recruiter</th>
            <th>Status</th>
            <th>Candidates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frontend Developer</td>
            <td>Engineering</td>
            <td>Emily Clark</td>
            <td><span className="status open">Open</span></td>
            <td>12</td>
          </tr>
          <tr>
            <td>Data Analyst</td>
            <td>Analytics</td>
            <td>Michael Lee</td>
            <td><span className="status in-progress">In Progress</span></td>
            <td>8</td>
          </tr>
          <tr>
            <td>HR Manager</td>
            <td>Human Resources</td>
            <td>Sarah Kim</td>
            <td><span className="status closed">Closed</span></td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
