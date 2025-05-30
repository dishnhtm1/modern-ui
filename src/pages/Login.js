// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message
} from "antd";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data.message || "Login failed");
        return;
      }

      // Store user and token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      message.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Col>
        <Card style={{ padding: "2rem", width: 350 }}>
          <Title level={3} style={{ textAlign: "center" }}>🔐 Login</Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <span>Don't have an account? </span>
              <a href="/register">Register</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
