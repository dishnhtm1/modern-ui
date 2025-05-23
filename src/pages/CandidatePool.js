import React, { useState, useEffect } from "react";
import "../styles/candidate.css";

export default function CandidatePool() {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    name: "",
    skills: "",
    experience: "",
    status: "New",
    matchPercent: ""
  });
  const [resumeFile, setResumeFile] = useState(null);

  // 🔄 Fetch candidates
  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error("Failed to load candidates:", err));
  }, []);

  // 📝 Handle form submit
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || "Candidate added.");
  };

  // 📄 Handle resume upload
  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    const res = await fetch("http://localhost:5000/api/resumes/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert("✅ Resume uploaded: " + data.filePath);
  };

  return (
    <div className="candidate-wrapper">
      <h2>Candidates</h2>

      {/* ➕ Add Candidate Form */}
      <form className="form-box" onSubmit={handleAddCandidate}>
        <h3>Add New Candidate</h3>
        <input placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Skills (comma separated)" required onChange={e => setForm({ ...form, skills: e.target.value })} />
        <input placeholder="Experience" required onChange={e => setForm({ ...form, experience: e.target.value })} />
        <input placeholder="Match %" onChange={e => setForm({ ...form, matchPercent: e.target.value })} />
        <select onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>New</option>
          <option>In Progress</option>
          <option>Proposed</option>
          <option>Hired</option>
        </select>
        <button type="submit">Add Candidate</button>
      </form>

      {/* 📎 Upload Resume Form */}
      <form className="form-box" onSubmit={handleUploadResume}>
        <h3>Upload Resume</h3>
        <input type="file" onChange={e => setResumeFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {/* 🧪 Filters */}
      <div className="filters">
        <select><option>Skills</option></select>
        <select><option>Experience</option></select>
        <select><option>Status</option></select>
      </div>

      {/* 📋 Table */}
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
          {candidates.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.skills}</td>
              <td>{c.experience}</td>
              <td><span className={`status ${c.status.toLowerCase().replace(/\s+/g, '-')}`}>{c.status}</span></td>
              <td>{c.matchPercent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
