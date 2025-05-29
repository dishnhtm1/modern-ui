import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/recruiter.css";

export default function ManageCandidates() {
  const [uploads, setUploads] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState({});
  const [jobsByClient, setJobsByClient] = useState({});
  const [selectedJobs, setSelectedJobs] = useState({});
  const [previews, setPreviews] = useState({});

  const token = localStorage.getItem("token");

  const fetchUploads = async () => {
    try {
      const res = await axios.get("/api/recruiter/uploads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(res.data);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("/api/admin/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchJobsForClient = async (clientId) => {
    try {
      const res = await axios.get(`/api/recruiter/client-jobs/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobsByClient((prev) => ({ ...prev, [clientId]: res.data }));
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const handleClientChange = async (candidateId, clientId) => {
    setSelectedClients((prev) => ({ ...prev, [candidateId]: clientId }));
    await fetchJobsForClient(clientId);
  };

  const handleJobChange = (candidateId, jobId) => {
    setSelectedJobs((prev) => ({ ...prev, [candidateId]: jobId }));
  };

  const handleAnalyze = async (item) => {
    const clientId = selectedClients[item._id];
    const jobId = selectedJobs[item._id];
    if (!clientId || !jobId) {
      alert("⚠️ Please select both client and job.");
      return;
    }

    try {
      const job = jobsByClient[clientId]?.find((j) => j._id === jobId);
      const jobTitle = job?.title || "Untitled";

      const res = await axios.post(
        "/api/recruiter/analyze-preview",
        { cvPath: item.cv, linkedin: item.linkedin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiSummary = res.data.summary || "No summary";
      const score = res.data.matchScore || 75;

      setPreviews((prev) => ({
        ...prev,
        [item._id]: {
          summary: aiSummary,
          matchScore: score,
          candidateId: item._id,
          candidateName: item.user?.email?.split("@")[0] || "Candidate",
          candidateEmail: item.user?.email,
          clientId,
          jobId,
          jobTitle,
        },
      }));
    } catch (err) {
      console.error("❌ Preview failed:", err);
      alert("❌ Preview failed.");
    }
  };

  const handleSubmitFeedback = async (candidateId) => {
    const preview = previews[candidateId];
    if (!preview) return;

    try {
      await axios.post("/api/recruiter/save-feedback", {

        candidateEmail: preview.candidateEmail,  // 👈 Make sure this is set correctly
        candidateName: preview.candidateName,
        summary: preview.summary,
        matchScore: preview.matchScore,
        clientId: preview.clientId,
        jobId: preview.jobId,
        jobTitle: preview.jobTitle,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Feedback submitted to client.");
      setPreviews((prev) => {
        const updated = { ...prev };
        delete updated[candidateId];
        return updated;
      });
      fetchUploads();
    } catch (err) {
      console.error("❌ Save feedback failed:", err);
      alert("❌ Save feedback failed.");
    }
  };

  useEffect(() => {
    fetchUploads();
    fetchClients();
  }, []);

  return (
    <div className="recruiter-wrapper">
      <h2>📄 Manage Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>CV</th>
            <th>LinkedIn</th>
            <th>Uploaded At</th>
            <th>Client</th>
            <th>Job</th>
            <th>Feedback</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((item) => (
            <React.Fragment key={item._id}>
              <tr>
                <td>{item.user?.email || "N/A"}</td>
                <td>
                  <a
                    href={`http://localhost:5000/${item.cv.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View CV
                  </a>
                </td>
                <td>
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Profile
                  </a>
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <select
                    value={selectedClients[item._id] || ""}
                    onChange={(e) =>
                      handleClientChange(item._id, e.target.value)
                    }
                  >
                    <option value="">-- Select Client --</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={selectedJobs[item._id] || ""}
                    onChange={(e) =>
                      handleJobChange(item._id, e.target.value)
                    }
                  >
                    <option value="">-- Select Job --</option>
                    {(jobsByClient[selectedClients[item._id]] || []).map(
                      (job) => (
                        <option key={job._id} value={job._id}>
                          {job.title}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td>{item.feedback || "Not yet analyzed"}</td>
                <td>{item.matchScore || "-"}</td>
                <td>
                  {item.finalStatus === "confirmed" ? "✅ Confirmed" : "Pending"}
                </td>
                <td>
                  {!item.feedback && (
                    <button onClick={() => handleAnalyze(item)}>Analyze</button>
                  )}
                </td>
              </tr>

              {/* 🔽 Inline feedback preview below the row */}
              {previews[item._id] && (
                <tr className="ai-feedback-row">
                  <td colSpan="10">
                    <div className="ai-preview-box">
                      <p><strong>AI Summary:</strong></p>
                      <textarea
                        value={previews[item._id].summary}
                        readOnly
                        rows={5}
                        style={{ width: "100%" }}
                      />
                      <p><strong>Score:</strong> {previews[item._id].matchScore}</p>
                      <button onClick={() => handleSubmitFeedback(item._id)}>
                        ✅ Confirm & Send to Client
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
