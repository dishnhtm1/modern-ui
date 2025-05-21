import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sidebar">
      <h2>Smart Hire</h2>
      <Link to="/feedback">AI Assistant</Link>
      <Link to="/candidates">Candidates</Link>
      <Link to="/">Dashboard</Link>
      <Link to="/interview">Interviews</Link>
      <Link to="/jobs">Job Requests</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
