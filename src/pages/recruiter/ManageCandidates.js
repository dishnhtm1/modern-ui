import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Select,
  Button,
  Tag,
  Modal,
  Typography,
  message,
} from "antd";
import moment from "moment";
import "../../styles/recruiter.css";

const { Option } = Select;
const { Paragraph } = Typography;

export default function ManageCandidates() {
  const [uploads, setUploads] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState({});
  const [jobsByClient, setJobsByClient] = useState({});
  const [selectedJobs, setSelectedJobs] = useState({});
  const [previews, setPreviews] = useState({});
  const [previewModal, setPreviewModal] = useState({ visible: false, data: null });
  const [selectedClientForBulk, setSelectedClientForBulk] = useState(null);
  const [topNResults, setTopNResults] = useState([]);
  const [customTopN, setCustomTopN] = useState(3); // 👈 user-defined number of candidates

  const token = localStorage.getItem("token");

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

  const fetchUploads = async () => {
    try {
      const res = await axios.get("/api/recruiter/uploads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(res.data);
      const preselected = {};
      res.data.forEach((item) => {
        if (item.clientId) {
          preselected[item._id] = item.clientId._id;
        }
      });
      setSelectedClients(preselected);
    } catch (err) {
      console.error("Error fetching uploads:", err);
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
    const clientId = selectedClients[item._id] || item.clientId?._id;
    const jobId = selectedJobs[item._id];
    if (!clientId || !jobId) {
      message.warning("Please select both client and job.");
      return;
    }

    try {
      const job = jobsByClient[clientId]?.find((j) => j._id === jobId);
      const jobTitle = job?.title || "Untitled";

      const res = await axios.post(
        "/api/recruiter/analyze-summary",
        {
          cvPath: item.cv,
          linkedinText: item.linkedin,
          jobTitle,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiSummary = res.data.summary || "No summary";
      const score = res.data.matchScore || 75;

      const previewData = {
        summary: aiSummary,
        matchScore: score,
        candidateId: item._id,
        candidateName: item.user?.email?.split("@")[0] || "Candidate",
        candidateEmail: item.user?.email,
        clientId,
        jobId,
        jobTitle,
      };

      setPreviews((prev) => ({ ...prev, [item._id]: previewData }));
      setPreviewModal({ visible: true, data: previewData });
    } catch (err) {
      console.error("❌ AI Analysis failed:", err);
      message.error("❌ AI Analysis failed.");
    }
  };

  const handleSubmitFeedback = async (candidateId) => {
  const preview = previews[candidateId];
  if (!preview) return;

  try {
    await axios.post(
      "/api/recruiter/save-feedback",
      {
        candidateEmail: preview.candidateEmail,
        candidateName: preview.candidateName,
        summary: preview.summary,
        matchScore: preview.matchScore,
        clientId: preview.clientId,
        jobId: preview.jobId,
        jobTitle: preview.jobTitle,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    message.success("✅ Feedback submitted to client.");
    setPreviews((prev) => {
      const updated = { ...prev };
      delete updated[candidateId];
      return updated;
    });
    fetchUploads();
  } catch (err) {
    console.error("❌ Save feedback failed:", err);
    message.error("❌ Save feedback failed.");
  }
};


  const handleSendAllFeedbacks = async () => {
  if (topNResults.length === 0) {
    return message.warning("No analyzed candidates to send");
  }

  try {
    const payload = topNResults.map((item) => ({
      candidateEmail: item.candidateEmail,
      candidateName: item.candidateName,
      summary: item.summary,
      matchScore: item.matchScore,
      clientId: item.clientId,
      jobId: selectedJobs[item._id] || null,
      jobTitle: "Bulk Analyzed", // or assign dynamically
    }));

    await axios.post("/api/recruiter/save-bulk-feedback", { feedbacks: payload }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.success("✅ All feedbacks sent to client");
    fetchUploads();
  } catch (err) {
    console.error("❌ Bulk feedback error:", err);
    message.error("Failed to send bulk feedback");
  }
};



  const handleBulkAnalyze = async (topN = 3) => {
  if (!selectedClientForBulk) {
    message.error("Please select a client.");
    return;
  }

  try {
    const res = await axios.post(
      "/api/recruiter/analyze-top-candidates",
      { clientId: selectedClientForBulk, topN },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTopNResults(res.data);
    message.success(`Top ${topN} candidates analyzed successfully.`);

    // 👇 Automatically prepare feedback previews
    const newPreviews = {};
    res.data.forEach((candidate) => {
      newPreviews[candidate.candidateId] = {
        summary: candidate.summary,
        matchScore: candidate.matchScore,
        candidateId: candidate.candidateId,
        candidateName: candidate.candidateName,
        candidateEmail: candidate.candidateEmail,
        clientId: candidate.clientId,
        jobId: candidate.jobId,
        jobTitle: candidate.jobTitle,
      };
    });

    setPreviews((prev) => ({ ...prev, ...newPreviews }));
  } catch (err) {
    console.error("Bulk analysis failed:", err);
    message.error("Failed to analyze candidates.");
  }
};


  useEffect(() => {
    fetchClients();
    fetchUploads();
  }, []);

  useEffect(() => {
    uploads.forEach((item) => {
      const clientId = item.clientId?._id;
      if (clientId && !jobsByClient[clientId]) {
        fetchJobsForClient(clientId);
      }
    });
  }, [uploads]);

  const columns = [
    {
      title: "Email",
      dataIndex: ["user", "email"],
    },
    {
      title: "Referral Client",
      render: (_, item) => item.clientId?.email || "-",
    },
    {
      title: "CV",
      render: (_, item) => (
        <a
          href={`http://localhost:5000/${item.cv.replace(/\\/g, "/")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View CV
        </a>
      ),
    },
    {
      title: "LinkedIn",
      render: (_, item) => (
        <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
          Profile
        </a>
      ),
    },
    {
      title: "Uploaded",
      render: (_, item) => moment(item.createdAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Client",
      render: (_, item) => (
        <Select
          placeholder="Select Client"
          style={{ width: 150 }}
          value={selectedClients[item._id] || item.clientId?._id || undefined}
          onChange={(val) => handleClientChange(item._id, val)}
        >
          {clients.map((client) => (
            <Option key={client._id} value={client._id}>
              {client.email}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Job",
      render: (_, item) => (
        <Select
          placeholder="Select Job"
          style={{ width: 150 }}
          value={selectedJobs[item._id] || undefined}
          onChange={(val) => handleJobChange(item._id, val)}
        >
          {(jobsByClient[selectedClients[item._id] || item.clientId?._id] || []).map((job) => (
            <Option key={job._id} value={job._id}>
              {job.title}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      render: (_, item) => (
        <Button onClick={() => handleAnalyze(item)} type="primary">
          Analyze
        </Button>
      ),
    },
  ];

  return (
    <>
      <h2>📄 Manage Candidates</h2>

      <div style={{ marginBottom: 20 }}>
        <Button
          type="default"
          onClick={handleSendAllFeedbacks}
          disabled={Object.keys(previews).length === 0}
          style={{ marginLeft: 10 }}
        >
          📨 Send All AI Feedbacks
        </Button>
        <Select
          placeholder="🔍 Select Client for Bulk Analysis"
          onChange={(val) => setSelectedClientForBulk(val)}
          style={{ width: 300, marginRight: 10 }}
        >
          {clients.map((client) => (
            <Option key={client._id} value={client._id}>
              {client.email}
            </Option>
          ))}
        </Select>

        <input
          type="number"
          min={1}
          value={customTopN}
          onChange={(e) => setCustomTopN(Number(e.target.value))}
          style={{ width: 150, marginRight: 10 }}
          placeholder="Top N Candidates"
        />

        <Button type="primary" onClick={() => handleBulkAnalyze(customTopN)}>
          🎯 Analyze Top {customTopN} Candidates
        </Button>
      </div>

      <Table
        rowKey="_id"
        dataSource={uploads}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {topNResults.length > 0 && (
        <>
          <h3 style={{ marginTop: 32 }}>⭐ Top AI Candidates</h3>
          <Table
            rowKey="_id"
            dataSource={topNResults}
            columns={[
              { title: "Name", dataIndex: "candidateName" },
              { title: "Score", dataIndex: "matchScore" },
              { title: "Summary", dataIndex: "summary" },
            ]}
            pagination={false}
          />
        </>
      )}

      <Modal
        title="AI Feedback Preview"
        visible={previewModal.visible}
        onCancel={() => setPreviewModal({ visible: false, data: null })}
        onOk={() => {
          handleSubmitFeedback(previewModal.data.candidateId);
          setPreviewModal({ visible: false, data: null });
        }}
        okText="✅ Confirm & Send"
        cancelText="Cancel"
      >
        {previewModal.data && (
          <div>
            <Paragraph>
              <strong>Candidate:</strong> {previewModal.data.candidateName}
            </Paragraph>
            <Paragraph>
              <strong>Job:</strong> {previewModal.data.jobTitle}
            </Paragraph>
            <Paragraph>
              <strong>Match Score:</strong> {previewModal.data.matchScore}
            </Paragraph>
            <Paragraph>
              <strong>Summary:</strong>
              <br />
              <textarea
                value={previewModal.data.summary}
                readOnly
                rows={5}
                style={{ width: "100%" }}
              />
            </Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
}
