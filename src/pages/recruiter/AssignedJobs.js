// src/pages/recruiter/AssignedJobs.js
import React from "react";
import "../../styles/recruiter.css";

export default function AssignedJobs() {
  return (
    <div className="recruiter-wrapper">
      <h2>📌 Assigned Job Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Client</th>
            <th>Deadline</th>
            <th>Candidates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Backend Developer</td>
            <td>XYZ Corp</td>
            <td>2025-06-10</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
