import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/candidate.css";

export default function CandidateFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/candidate/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const visibleFeedbacks = res.data.filter(f => f.sentFinalFeedbackToCandidate);
        setFeedbacks(visibleFeedbacks);
      } catch (err) {
        console.error("❌ Failed to fetch candidate feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-wrapper">
      <h2>📩 Interview Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul>
          {feedbacks.map((item) => (
            <li key={item._id} className="feedback-card">
              <p><strong>Job Title:</strong> {item.jobTitle || "N/A"}</p>
              <p><strong>Status:</strong> {item.status === "accepted" ? "✅ Accepted" : item.status === "rejected" ? "❌ Rejected" : "⏳ Pending"}</p>

              {/* ✅ Final feedback - shown only if recruiter sent it */}
              {item.finalDecision && item.sentFinalFeedbackToCandidate && (
                <div className="candidate-final-box">
                  <p><strong>🎯 Final Decision:</strong> {item.finalDecision === "confirmed" ? "✅ Selected" : "❌ Not Selected"}</p>
                  <p><strong>📝 Message from Client:</strong> {item.finalMessage || "No message provided."}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
