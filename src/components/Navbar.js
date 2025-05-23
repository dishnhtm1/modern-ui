import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const previewRole = localStorage.getItem("previewRole");
  const role = previewRole || user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("previewRole"); // ✅ clear preview mode too
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

        {role === "admin" && (
          <>
            <Link to="/dashboard/admin">Admin Dashboard</Link>
            <Link to="/dashboard/admin/approvals">Approve Users</Link>
          </>
        )}
      </div>

      {/* 🔁 Exit Preview Mode */}
      {previewRole && (
        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#999" }}>
          <em>Previewing as: {previewRole}</em>
          <button onClick={() => {
            localStorage.removeItem("previewRole");
            window.location.reload();
          }} style={{ marginLeft: "10px", fontSize: "0.8rem" }}>
            Exit Preview
          </button>
        </div>
      )}

      {role && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}
