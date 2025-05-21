import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import AIAssistant from "./pages/AIAssistant";
import CandidatePool from "./pages/CandidatePool";
import Dashboard from "./pages/Dashboard";
import InterviewSchedule from "./pages/InterviewSchedule";
import JobList from "./pages/JobList";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/feedback" element={<AIAssistant />} />
          <Route path="/candidates" element={<CandidatePool />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/interview" element={<InterviewSchedule />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
