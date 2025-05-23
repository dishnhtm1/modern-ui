// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <h2>Smart Hire</h2>

      <div className="nav-links">
        {role === "candidate" && (
          <>
            <Link to="/dashboard">My Dashboard</Link>
            <Link to="/dashboard/interviews">My Interviews</Link>
            <Link to="/dashboard/feedback">Feedback</Link>
            <Link to="/dashboard/candidate/upload">Upload CV</Link>
          </>
        )}

        {role === "client" && (
          <>
            <Link to="/dashboard/client">Client Dashboard</Link>
            <Link to="/dashboard/client-jobs">My Job Requests</Link>
            <Link to="/dashboard/client-feedback">Feedback</Link>
          </>
        )}

        {role === "recruiter" && (
          <>
            <Link to="/dashboard/recruiter">Recruiter Dashboard</Link>
            <Link to="/dashboard/manage-candidates">Manage Candidates</Link>
            <Link to="/dashboard/assigned-jobs">Assigned Jobs</Link>
            <Link to="/dashboard/schedule-interviews">Schedule Interviews</Link>
            <Link to="/dashboard/review-feedback">Review Feedback</Link>
          </>
        )}

        {!role && (
          <>
            <Link to="/">Home</Link>
          </>
        )}
      </div>

      {role && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}
