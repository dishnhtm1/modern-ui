import React from "react";
import "../styles/aiassistant.css";

export default function AIAssistant() {
  return (
    <div className="ai-wrapper">
      <div className="header-row">
        <h2>AI Assistant</h2>
      </div>

      <div className="recommendations">
        <div className="recommendation">
          <h3>John Smith</h3>
          <p>Skills: Python, Django</p>
          <p>Experience: 5 years</p>
          <p className="match-score">Match Score: 85%</p>
          <div className="analysis-summary">
            <h4>Analysis Summary</h4>
            <p>John has extensive experience in Python and Django, making him a strong candidate for backend development roles. His match score indicates a high suitability for the position.</p>
          </div>
        </div>

        <div className="recommendation">
          <h3>Anna Johnson</h3>
          <p>Skills: JavaScript, React</p>
          <p>Experience: 3 years</p>
          <p className="match-score">Match Score: 78%</p>
          <div className="analysis-summary">
            <h4>Analysis Summary</h4>
            <p>Anna has solid experience in JavaScript and React, making her a good fit for frontend development roles. Her match score indicates a good suitability for the position.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
