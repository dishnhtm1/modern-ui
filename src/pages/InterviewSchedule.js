import React from "react";
import "../styles/interview.css";

export default function InterviewSchedule() {
  return (
    <div className="interview-wrapper">
      <div className="header-row">
        <h2>Interviews</h2>
        <div className="actions">
          <button>Schedule Interview</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Client</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Acme Corp</td>
            <td>May 22, 2025 – 10:00 AM</td>
            <td><span className="status scheduled">Scheduled</span></td>
            <td>—</td>
          </tr>
          <tr>
            <td>Anna Johnson</td>
            <td>Beta Inc</td>
            <td>May 18, 2025 – 2:00 PM</td>
            <td><span className="status completed">Completed</span></td>
            <td>Positive</td>
          </tr>
          <tr>
            <td>Michael Lee</td>
            <td>Delta Group</td>
            <td>May 20, 2025 – 11:30 AM</td>
            <td><span className="status feedback">Awaiting Feedback</span></td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
