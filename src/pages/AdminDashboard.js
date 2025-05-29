import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/AdminDashboard.css";


const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/pending-users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const approveUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/admin/approve/${userId}`, {}, {

        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingUsers(pendingUsers.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const switchRole = (newRole) => {
    localStorage.setItem("previewRole", newRole);
    window.location.href = "/dashboard"; // or navigate programmatically
  };

  const exitPreview = () => {
    localStorage.removeItem("previewRole");
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>🔁 Preview Another Role</h3>
      <div style={{ marginBottom: "1rem" }}>
        {["candidate", "recruiter", "client"].map(role => (
          <button key={role} onClick={() => switchRole(role)} style={{ marginRight: "0.5rem" }}>
            View as {role}
          </button>
        ))}
        <button onClick={exitPreview} style={{ background: "#ccc" }}>Exit Preview</button>
      </div>

      <h3>🕒 Pending User Approvals</h3>
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul>
          {pendingUsers.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> ({user.email}) - Role: {user.role}
              <button onClick={() => approveUser(user._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
