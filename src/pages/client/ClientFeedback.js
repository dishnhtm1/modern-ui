import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/client.css";

export default function ClientFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [responseInputs, setResponseInputs] = useState({});

  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/api/client/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch feedbacks:", error);
    }
  };

  const handleResponseChange = (id, field, value) => {
    setResponseInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (id, status) => {
    const { interviewDate, type } = responseInputs[id] || {};

    if (status === "accepted" && (!interviewDate || !type)) {
      alert("Please provide interview date and type before submitting.");
      return;
    }

    try {
      await axios.post(
        `/api/client/respond-feedback`,
        {
          feedbackId: id,
          status,
          interviewDate,
          interviewType: type,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`✅ Feedback ${status}`);
      fetchFeedbacks();
      setResponseInputs((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("❌ Failed to update feedback:", err);
      alert("❌ Error updating feedback.");
    }
  };

  const submitFinalDecision = async (id) => {
    const decision = responseInputs[id]?.finalDecision;
    const message = responseInputs[id]?.finalMessage || "";

    if (!decision) {
      alert("Please select a final decision.");
      return;
    }

    try {
      await axios.patch(
        `/api/client/final-decision/${id}`,
        { status: decision, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Final decision submitted.");
      fetchFeedbacks();
    } catch (err) {
      console.error("❌ Final decision error:", err);
      alert("Failed to submit final decision.");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="client-wrapper">
      <div className="pipeline">
        <h2>🧠 AI Analyzed Candidates - Review & Final Decision</h2>
        <p className="feedback-description">
          Review AI-analyzed candidates, schedule interviews, and submit your final hiring decision to the recruiter.
        </p>
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job</th>
              <th>Score</th>
              <th>Summary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => (
                <React.Fragment key={item._id}>
                  <tr>
                    <td>{item.candidateName || "N/A"}</td>
                    <td>{item.jobTitle || "Unspecified"}</td>
                    <td>{item.matchScore || "N/A"}</td>
                    <td>{item.summary || "Not analyzed yet"}</td>
                    <td>{item.status || "Awaiting Response"}</td>
                    <td>
                      {!item.status || item.status === "pending" ? (
                        <button
                          onClick={() =>
                            handleResponseChange(item._id, "open", true)
                          }
                        >
                          Respond
                        </button>
                      ) : item.status === "accepted" ? (
                        <span>✅ Accepted</span>
                      ) : (
                        <span>❌ Rejected</span>
                      )}
                    </td>
                  </tr>

                  {/* 🔽 Inline row for response */}
                  {responseInputs[item._id]?.open && (
                    <tr>
                      <td colSpan="6">
                        <div className="response-box">
                          <label>
                            Interview Date:
                            <input
                              type="date"
                              value={
                                responseInputs[item._id]?.interviewDate || ""
                              }
                              onChange={(e) =>
                                handleResponseChange(
                                  item._id,
                                  "interviewDate",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                          <label>
                            Interview Type:
                            <input
                              type="text"
                              placeholder="e.g. Online / Onsite"
                              value={responseInputs[item._id]?.type || ""}
                              onChange={(e) =>
                                handleResponseChange(
                                  item._id,
                                  "type",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                          <button
                            onClick={() => handleSubmit(item._id, "accepted")}
                          >
                            ✅ Accept & Schedule
                          </button>
                          <button
                            onClick={() => handleSubmit(item._id, "rejected")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* ✅ Final Decision Section */}
                  {item.status === "accepted" && (
                    <tr>
                      <td colSpan="6">
                        <div className="final-decision-section">
                          <label>
                            Final Decision:
                            <select
                              value={responseInputs[item._id]?.finalDecision || ""}
                              onChange={(e) =>
                                handleResponseChange(
                                  item._id,
                                  "finalDecision",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">-- Select --</option>
                              <option value="confirmed">✅ Confirmed</option>
                              <option value="rejected">❌ Rejected</option>
                            </select>
                          </label>

                          <label style={{ marginLeft: "10px" }}>
                            Message:
                            <textarea
                              placeholder="Enter final message to recruiter..."
                              value={responseInputs[item._id]?.finalMessage || ""}
                              onChange={(e) =>
                                handleResponseChange(
                                  item._id,
                                  "finalMessage",
                                  e.target.value
                                )
                              }
                              style={{ width: "250px", marginLeft: "5px" }}
                            />
                          </label>

                          <button
                            onClick={() => submitFinalDecision(item._id)}
                            style={{ marginLeft: "10px" }}
                          >
                            Submit Final Decision
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6">No feedback available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
