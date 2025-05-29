import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/candidate.css";

export default function MyInterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const token = localStorage.getItem("token");

  const fetchInterviews = async () => {
    try {
      const res = await axios.get("/api/candidate/interviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews(res.data);
      console.log("✅ Interview Data:", res.data);
    } catch (err) {
      console.error("❌ Failed to load interviews:", err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="interview-wrapper">
      <h2>🎯 My Interviews</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Job</th>
            <th>Interview Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {interviews && interviews.length > 0 ? (
            interviews.map((item) => (
              <tr key={item._id}>
                <td>{item.clientName || "N/A"}</td>
                <td>{item.jobTitle || "Unspecified"}</td>
                <td>{item.interviewType || "-"}</td>
                <td>
                  {item.interviewDate
                    ? new Date(item.interviewDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {item.status?.toLowerCase() === "accepted"
                    ? "✅ Scheduled"
                    : item.status?.toLowerCase() === "rejected"
                    ? "❌ Rejected"
                    : "Pending"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No interviews scheduled yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      
    </div>
  );
}
