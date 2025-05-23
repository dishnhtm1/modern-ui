// src/pages/recruiter/ScheduleInterviews.js
import React from "react";
import "../../styles/recruiter.css";

export default function ScheduleInterviews() {
  return (
    <div className="recruiter-wrapper">
      <h2>📅 Schedule Interviews</h2>
      <form className="form">
        <input type="text" placeholder="Candidate Name" required />
        <input type="text" placeholder="Client Company" required />
        <input type="datetime-local" required />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

