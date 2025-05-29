import React, { useState } from 'react';
import '../../styles/candidate.css';
import axios from 'axios';

const CandidateUpload = () => {
  const [cv, setCv] = useState(null);
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('linkedin', linkedin);

    const token = localStorage.getItem('token');
    console.log("🔐 Token being sent:", token);


    try {
      const response = await axios.post('http://localhost:5000/api/candidate/upload', formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      alert('Uploaded successfully');
      setCv(null);
      setLinkedin('');
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error.message);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <h2>Upload CV & LinkedIn</h2>
      <input
        type="file"
        onChange={e => setCv(e.target.files[0])}
        accept=".pdf,.doc,.docx"
        required
      />
      <input
        type="url"
        placeholder="LinkedIn Profile URL"
        value={linkedin}
        onChange={e => setLinkedin(e.target.value)}
        required
      />
      {cv && <p>Selected file: {cv.name}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default CandidateUpload;
