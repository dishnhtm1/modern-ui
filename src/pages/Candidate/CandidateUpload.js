import React, { useState } from 'react';
import '../../styles/candidate.css';

import axios from 'axios';

const CandidateUpload = () => {
  const [cv, setCv] = useState(null);
  const [linkedin, setLinkedin] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('linkedin', linkedin);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/candidate/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload CV & LinkedIn</h2>
      <input type="file" onChange={e => setCv(e.target.files[0])} required />
      <input
        type="url"
        placeholder="LinkedIn Profile URL"
        value={linkedin}
        onChange={e => setLinkedin(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CandidateUpload;
