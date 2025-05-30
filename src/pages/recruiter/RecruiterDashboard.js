import React from "react";
import { Card, Col, Row } from "antd";
import { SolutionOutlined, UsergroupAddOutlined, CalendarOutlined } from "@ant-design/icons";

export default function RecruiterDashboard() {
  const metrics = [
    { title: "Open Jobs", value: 5, icon: <SolutionOutlined style={{ fontSize: 24 }} /> },
    { title: "Assigned Candidates", value: 18, icon: <UsergroupAddOutlined style={{ fontSize: 24 }} /> },
    { title: "Interviews This Week", value: 3, icon: <CalendarOutlined style={{ fontSize: 24 }} /> },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>👤 Recruiter Dashboard</h2>
      <Row gutter={16}>
        {metrics.map((metric, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              title={metric.title}
              bordered={false}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: 36 }}>{metric.value}</div>
              <div style={{ marginTop: 10 }}>{metric.icon}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
