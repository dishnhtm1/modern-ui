import React from "react";
import "../styles/candidate.css";

export default function CandidatePool() {
  return (
    <div className="candidate-wrapper">
      <div className="header-row">
        <h2>Candidates</h2>
        <div className="actions">
          <button>Add Candidate</button>
          <button>Upload Resume</button>
        </div>
      </div>

      <div className="filters">
        <select>
          <option>Skills</option>
          <option>JavaScript</option>
          <option>Python</option>
        </select>
        <select>
          <option>Experience</option>
          <option>1-3 years</option>
          <option>3-5 years</option>
        </select>
        <select>
          <option>Status</option>
          <option>New</option>
          <option>In Progress</option>
          <option>Proposed</option>
          <option>Hired</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Match (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Python, Django</td>
            <td>5 years</td>
            <td><span className="status new">New</span></td>
            <td>85%</td>
          </tr>
          <tr>
            <td>Anna Johnson</td>
            <td>JavaScript, React</td>
            <td>3 years</td>
            <td><span className="status in-progress">In Progress</span></td>
            <td>78%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
