import React from "react";
import { Table, Typography, Layout } from "antd";
import { PushpinOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const columns = [
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Client",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
  },
  {
    title: "Candidates",
    dataIndex: "candidates",
    key: "candidates",
  },
];

const data = [
  {
    key: "1",
    position: "Backend Developer",
    client: "XYZ Corp",
    deadline: "2025-06-10",
    candidates: 4,
  },
  // You can add more jobs here dynamically from backend
];

export default function AssignedJobs() {
  return (
    <Content style={{ padding: "24px", minHeight: "100vh", background: "#fff" }}>
      <Title level={3}>
        <PushpinOutlined /> Assigned Job Requests
      </Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Content>
  );
}
