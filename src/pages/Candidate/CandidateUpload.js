import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Upload,
  Button,
  message,
  Space,
} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { Dragger } = Upload;

export default function CandidateUpload() {
  const [cv, setCv] = useState(null);
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!cv || !linkedin) {
      message.warning('Please upload your CV and enter LinkedIn URL');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('linkedin', linkedin);

    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/candidate/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('✅ CV uploaded successfully!');
      setCv(null);
      setLinkedin('');
    } catch (err) {
      console.error('❌ Upload failed:', err);
      message.error('❌ Failed to upload CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card
        title="📤 Upload Resume & LinkedIn"
        bordered={false}
        style={{ width: 600, boxShadow: '0 0 12px rgba(0,0,0,0.1)', borderRadius: 12 }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Form layout="vertical" onFinish={handleUpload}>
            <Form.Item label="Upload CV" required>
              <Dragger
                name="cv"
                multiple={false}
                beforeUpload={(file) => {
                  setCv(file);
                  return false;
                }}
                fileList={cv ? [cv] : []}
                maxCount={1}
                accept=".pdf,.doc,.docx"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag your CV here</p>
                <p className="ant-upload-hint">Only PDF/DOC/DOCX files supported</p>
              </Dragger>
            </Form.Item>

            <Form.Item
              label="LinkedIn Profile URL"
              required
              rules={[{ type: 'url', message: 'Enter a valid URL' }]}
            >
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<UploadOutlined />}
                block
              >
                {loading ? 'Uploading...' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>

          {cv && (
            <div style={{ textAlign: 'center' }}>
              <Text type="success">✅ Selected file: {cv.name}</Text>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
}
