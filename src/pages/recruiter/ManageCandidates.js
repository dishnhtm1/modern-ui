import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/recruiter.css";

export default function ManageCandidates() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/recruiter/uploads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploads(res.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };

    fetchUploads();
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
          </tr>
        </thead>
        <tbody>
          {uploads.map((item) => (
            <tr key={item._id}>
              <td>{item.user.email}</td>
              <td>
                <a href={`/${item.cv}`} target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              </td>
              <td>
                <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
