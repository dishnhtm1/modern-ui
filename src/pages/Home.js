import React from 'react';
import { Typography, Button } from 'antd';
import './Home.css';
import bgImage from '../assets/cover.png';
import logo from '../assets/logo.png';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* Top Logo Left */}
      <div className="top-logo-bar">
        <img src={logo} alt="SmartHire Logo" className="logo" />

        <div className="top-right-buttons">
          <Button type="primary" href="/login">
            Login
          </Button>
        </div>
      </div>

      {/* Hero Section with full background image */}
      <div
        className="hero-bg-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay">
          <Title className="big-title">AI HIRING THAT’S SMART & SIMPLE</Title>
          <Paragraph className="hero-description">
            SmartHire connects companies with top candidates through AI-powered interviews,
            resume scanning, and instant feedback.
          </Paragraph>
          
        </div>
      </div>


      {/* Advertisement Banners */}
      <div className="ad-banner">
        <div className="ad-image">
          <img src="/images/ad1.jpg" alt="InterviewMate" />
        </div>
        <div className="ad-content">
          <h2>🎯 InterviewMate</h2>
          <p>
            Practice interviews with AI-powered experience. Simulate real scenarios, get instant feedback,
            and boost your confidence.
          </p>
          <Button type="primary" href="https://interviewmate.ai" target="_blank">
            Visit InterviewMate
          </Button>
        </div>
      </div>

      <div className="ad-banner reverse">
        <div className="ad-image">
          <img src="/images/ad2.jpg" alt="CV Scanner" />
        </div>
        <div className="ad-content">
          <h2>🧠 CV Scanner</h2>
          <p>
            Upload your CV and job title. Get real-time AI feedback on how well your CV matches the role.
          </p>
          <Button type="primary">
            Try CV Scanner
          </Button>
        </div>
      </div>

      <div className="ad-banner">
        <div className="ad-image">
          <img src="/images/ad3.jpg" alt="Forum Academy" />
        </div>
        <div className="ad-content">
          <h2>🎓 Forum Academy</h2>
          <p>
            Forum Academy provides hands-on training in Full Stack Development and Cloud Engineering.
            Graduated professionals are showcased here for companies to discover and hire industry-ready talent.
          </p>
          <Button type="primary" href="https://forumacademy.example.com" target="_blank">
            Explore Academy
          </Button>
        </div>
      </div>
    </div>
  );
}
