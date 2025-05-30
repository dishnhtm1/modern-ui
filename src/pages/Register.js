// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Card,
  Row,
  Col,
  message,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data.message || "Registration failed");
        return;
      }

      message.success("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Register error:", err);
      message.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Col>
        <Card style={{ padding: "2rem", width: 380 }}>
          <Title level={3} style={{ textAlign: "center" }}>📝 Register</Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              initialValue="candidate"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select>
                <Option value="candidate">Candidate</Option>
                <Option value="recruiter">Recruiter</Option>
                <Option value="client">Client</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <span>Already have an account? </span>
              <a href="/login">Login</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
