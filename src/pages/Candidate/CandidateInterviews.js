import React from "react";
import '../../styles/candidate.css';


export default function CandidateInterviews() {
  return (
    <div className="interview-wrapper">
      <h2>🧾 Interview Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Job</th>
            <th>Date</th>
            <th>Status</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UI/UX Designer</td>
            <td>May 28, 2025</td>
            <td>Scheduled</td>
            <td>Bring portfolio</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
