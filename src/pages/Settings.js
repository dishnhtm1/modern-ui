import React from "react";
import "../styles/settings.css";

export default function Settings() {
  return (
    <div className="settings-wrapper">
      <div className="header-row">
        <h2>Settings / Admin</h2>
      </div>

      <div className="section">
        <h3>Role Management</h3>
        <div className="roles">
          <div className="role">
            <span>Recruiter</span>
            <button>Edit</button>
          </div>
          <div className="role">
            <span>Client</span>
            <button>Edit</button>
          </div>
          <div className="role">
            <span>Candidate</span>
            <button>Edit</button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Two-Factor Authentication</h3>
        <div className="two-factor">
          <span>Enable Two-Factor Authentication</span>
          <button>Enable</button>
        </div>
      </div>
    </div>
  );
}
