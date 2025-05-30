// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Col>
        <Card bordered style={{ padding: "2rem", textAlign: "center", width: 350 }}>
          <Title level={2}>Welcome to SmartHire</Title>
          <Paragraph>Please login or register to continue.</Paragraph>
          <Button type="primary" block style={{ marginBottom: "1rem" }}>
            <Link to="/login">Login</Link>
          </Button>
          <Button type="default" block>
            <Link to="/register">Register</Link>
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
