import React, { useState } from "react";
import "../styles/joblist.css";

export default function JobList() {
  const [form, setForm] = useState({
    position: "",
    department: "",
    recruiter: "",
    status: "Open",
    candidates: 0
  });

  const [jobs, setJobs] = useState([
    {
      position: "Frontend Developer",
      department: "Engineering",
      recruiter: "Emily Clark",
      status: "Open",
      candidates: 12,
    },
    {
      position: "Data Analyst",
      department: "Analytics",
      recruiter: "Michael Lee",
      status: "In Progress",
      candidates: 8,
    },
    {
      position: "HR Manager",
      department: "Human Resources",
      recruiter: "Sarah Kim",
      status: "Closed",
      candidates: 5,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, form]);
    alert("✅ Job request created!");
    setForm({
      position: "",
      department: "",
      recruiter: "",
      status: "Open",
      candidates: 0
    });
  };

  return (
    <div className="joblist-wrapper">
      <div className="header-row">
        <h2>Create New Job Request</h2>
      </div>

      {/* 🔹 Form */}
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          placeholder="Position Title"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <input
          placeholder="Assigned Recruiter"
          value={form.recruiter}
          onChange={(e) => setForm({ ...form, recruiter: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <input
          type="number"
          placeholder="Candidates"
          value={form.candidates}
          onChange={(e) => setForm({ ...form, candidates: parseInt(e.target.value) })}
        />
        <button type="submit">Create Request</button>
      </form>

      {/* 🔹 Job List */}
      <div className="header-row">
        <h2>Job Requests</h2>
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
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.position}</td>
              <td>{job.department}</td>
              <td>{job.recruiter}</td>
              <td>
                <span className={`status ${job.status.toLowerCase().replace(/\s/g, '-')}`}>
                  {job.status}
                </span>
              </td>
              <td>{job.candidates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
