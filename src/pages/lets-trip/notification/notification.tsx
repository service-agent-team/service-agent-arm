import { NotificationType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { Fragment, useEffect, useState } from 'react';

export interface IValues {
  title: string;
  body: string;
  userIds: number[];
}

export const Notification = () => {
  const { getLetstripUsers, setSearch, sendNotification } = useActions();
  const [type, setType] = useState<NotificationType>();
  const { search } = useTypedSelector((state) => state.app);
  const { users, loading } = useTypedSelector((state) => state.letstripNotification);
  useEffect(() => {
    getLetstripUsers({ search });
  }, [search]);

  const handleSearch = (e: string) => {
    setSearch(e);
  };

  const onFinish = (values: IValues) => {
    const userIds = type === NotificationType.SELECTBLE ? values.userIds : users.map((el) => el.id);
    sendNotification({
      userIds,
      title: values.title,
      body: values.body,
      attributes: {},
      cb: () => {},
    });
  };

  const handleType = (type: NotificationType) => {
    setType(type);
  };

  const NotifyOpt = Object.keys(NotificationType).map((el) => ({ value: el }));

  const userOpt = users.map((el) => ({ value: el.id, label: el.firstName }));
  return (
    <Fragment>
      <Card>
        <Form onFinish={onFinish}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item name="title">
                <Input placeholder="title" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="body">
                <Input placeholder="message body" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Select
                onChange={(e) => handleType(e)}
                style={{ width: '100%' }}
                options={NotifyOpt}
                placeholder="select types"
              />
            </Col>
            {type === NotificationType.SELECTBLE && (
              <Col span={24}>
                <Form.Item name="userIds">
                  <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    options={userOpt}
                    placeholder="Select users"
                    onSearch={handleSearch}
                    loading={loading.get}
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Button htmlType="submit" style={{ width: '100%' }} type="primary">
                To All Users
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Fragment>
  );
};
