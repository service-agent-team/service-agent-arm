import { history } from '@/common';
import { useActions } from '@/common/hooks';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BreakfastDetail = () => {
  const { createBreakfast } = useActions();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {}, [id]);

  const onFinish = ({ name }: { name: string }) => {
    function cb() {
      history.back();
    }
    createBreakfast({ name, cb });
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Row>
        <Col span={24}>
          <Form.Item label="Name" required>
            <Input placeholder="Enter name..." />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button style={{ width: '100%' }} htmlType="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
