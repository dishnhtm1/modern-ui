// src/pages/recruiter/ReviewFeedback.js
import React from "react";
import "../../styles/recruiter.css";

export default function ReviewFeedback() {
  return (
    <div className="recruiter-wrapper">
      <h2>📝 Review Feedback</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Client</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anna White</td>
            <td>Alpha Tech</td>
            <td>Positive – Strong communication</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
