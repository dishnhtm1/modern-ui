import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/recruiter.css";

export default function ReviewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/api/recruiter/review-feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch review feedback:", error);
    }
  };

  const handleSendFinalFeedback = async (id) => {
    try {
      await axios.post(`/api/recruiter/send-final-feedback/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Final feedback sent.");
      fetchFeedbacks();
    } catch (err) {
      console.error("❌ Failed to send final feedback:", err);
      alert("❌ Error sending final feedback.");
    }
  };


  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="recruiter-wrapper">
      <h2>📝 Review Client Feedback</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Client</th>
            <th>Status</th>
            <th>Interview Type</th>
            <th>Interview Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((item) => (
              <React.Fragment key={item._id}>
                <tr
                  className={
                    item.finalDecision === "confirmed"
                      ? "highlight-final"
                      : item.status === "accepted"
                      ? "highlight-accepted"
                      : ""
                  }
                >
                  <td>{item.candidateName || "N/A"}</td>
                  <td>{item.clientName || "N/A"}</td>
                  <td>
                    {item.status === "accepted"
                      ? "✅ Accepted"
                      : item.status === "rejected"
                      ? "❌ Rejected"
                      : "Pending"}
                  </td>
                  <td>{item.interviewType || "-"}</td>
                  <td>
                    {item.interviewDate
                      ? new Date(item.interviewDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {item.status === "accepted" ? (
                      item.sentToCandidate ? (
                        <span>✅ Sent</span>
                      ) : (
                        <button onClick={() => handleSendToCandidate(item._id)}>
                          📤 Send to Candidate
                        </button>
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>

                {/* ✅ Final Decision & Send Final Feedback */}
                {item.finalDecision && (
                  <tr>
                    <td colSpan="6">
                      <div className="final-feedback-box">
                        <p><strong>Client Final Decision:</strong> {item.finalDecision === "confirmed" ? "✅ Confirmed" : "❌ Rejected"}</p>
                        <p><strong>Message:</strong> {item.finalMessage || "No message provided."}</p>
                        {!item.sentFinalFeedbackToCandidate ? (
                          <button onClick={() => handleSendFinalFeedback(item._id)}>
                            📤 Send Final Feedback to Candidate
                          </button>
                        ) : (
                          <span>✅ Final feedback sent</span>
                        )}
                      </div>
                    </td>
                  </tr>

                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No feedback to review.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
