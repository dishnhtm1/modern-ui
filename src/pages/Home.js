import React from 'react';
import { Typography, Button } from 'antd';
import './Home.css'; // custom CSS for background

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <Title level={1} style={{ color: '#fff' }}>Welcome to SmartHire</Title>
        <Paragraph style={{ color: '#f0f0f0', fontSize: '18px' }}>
          Empower your recruitment process with AI-powered insights. 
          Upload CVs,  and get real-time feedback – all in one platform.
        </Paragraph>
        <Button type="primary" size="large" href="/login">
          Launch Smart hire
        </Button>
      </div>
    </div>
  );
}
