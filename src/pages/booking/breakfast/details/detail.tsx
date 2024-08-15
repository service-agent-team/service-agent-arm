import { history } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BreakfastDetail = () => {
  const { createBreakfast, findOneBreakfast, updateBreakfast } = useActions();
  const [form] = Form.useForm();
  const { id } = useParams();

  const { breakfast } = useTypedSelector((state) => state.bookingBreakfast);

  useEffect(() => {
    findOneBreakfast({ id, lang: 'EN' });
  }, [id]);

  useEffect(() => {
    form.setFieldValue('name', breakfast?.name);
  }, [breakfast]);

  const onFinish = ({ name }: { name: string }) => {
    function cb() {
      history.back();
    }

    if (id) {
      updateBreakfast({ name, lang: 'EN', id, cb });
    } else {
      createBreakfast({ name, cb });
    }
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row>
        <Col span={24}>
          <Form.Item name="name" label="Name" required>
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
