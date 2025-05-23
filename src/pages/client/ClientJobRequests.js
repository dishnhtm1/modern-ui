import React from "react";
import "../../styles/client.css";


export default function ClientJobRequests() {
  return (
    <div className="client-wrapper">
        <div className="header-row">
            <h2>My Job Requests</h2>
            <button>Create New Request</button>
        </div>

        <div className="pipeline">
            <table>
            <thead>
                <tr>
                <th>Position</th>
                <th>Status</th>
                <th>Submitted</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>React Developer</td>
                <td><span className="status open">Open</span></td>
                <td>2025-05-21</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>

  );
}
