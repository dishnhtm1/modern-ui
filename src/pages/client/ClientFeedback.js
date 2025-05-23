import React from "react";
import "../../styles/client.css";


export default function ClientFeedback() {
  return (
    <div className="client-wrapper">
        <div className="pipeline">
            <h2>Interview Feedback</h2>
            <table>
            <thead>
                <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Rating</th>
                <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>John Smith</td>
                <td>Frontend Dev</td>
                <td>👍 Positive</td>
                <td>Strong JavaScript skills</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>

  );
}
