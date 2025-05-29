import React, { useState } from "react";
import axios from "axios";

export default function ClientJobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/client/jobs", { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Job posted successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("❌ Failed to post job:", err);
      alert("Error posting job.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>📝 Post a New Job</h3>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Post Job</button>
    </form>
  );
}
