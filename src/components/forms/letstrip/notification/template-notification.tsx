import { addNotification } from '@/common';
import { LanguageType, NotificationType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm } from '@/components/common';
import { Icon } from '@/components/common/icon';
import { Button, Card, Col, Input, Row, Select } from 'antd';
import { Fragment, useEffect, useState } from 'react';

interface IValues {
  templateId: number;
  languageCode: string;
  templateData: Record<string, any>;
  firebaseData: Record<string, any>;
  userIds: number[];
}

export const NotificationTemplateForm = () => {
  const {
    getLetstripUsers,
    setSearch,
    sendMultiTemplateNotification,
    getAllNotificationTemplates,
  } = useActions();
  const [type, setType] = useState<NotificationType>();
  const { search } = useTypedSelector((state) => state.app);
  const { users, loading, templates } = useTypedSelector((state) => state.letstripNotification);

  useEffect(() => {
    getLetstripUsers({ search });
    getAllNotificationTemplates({});
  }, [search]);

  const handleSearch = (e: string) => {
    setSearch(e);
  };

  const onFinish = (values: IValues) => {
    const userIds = type === NotificationType.SELECTBLE ? values.userIds : users.map((el) => el.id);

    const templateData = values.templateData?.reduce(
      (obj: any, item: { key: string; value: string }) => {
        obj[item.key] = item.value;
        return obj;
      },
      {},
    );

    const firebaseData = values.firebaseData?.reduce(
      (obj: any, item: { key: string; value: string }) => {
        obj[item.key] = item.value;
        return obj;
      },
      {},
    );

    sendMultiTemplateNotification({
      userIds,
      templateId: values.templateId,
      languageCode: values.languageCode,
      templateData,
      firebaseData,
      cb: () => {
        addNotification('Succuss');
      },
    });
  };

  const handleType = (type: NotificationType) => {
    setType(type);
  };

  const NotifyOpt = Object.keys(NotificationType).map((el) => ({ value: el }));
  const LangOpt = Object.keys(LanguageType).map((el) => ({ value: el }));
  const userOpt = users.map((el) => ({ value: el.id, label: `${el.firstName} -> ${el.login}` }));
  const templateOpt = templates?.map((el) => ({
    value: el.id,
    label: `${el.name} -> ${el.body.en}`,
  }));

  return (
    <Fragment>
      <Card loading={loading.post}>
        <BaseForm onFinish={onFinish}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <BaseForm.Item name="templateId" label="Select template" rules={[{ required: true }]}>
                <Select
                  style={{ width: '100%' }}
                  options={templateOpt}
                  placeholder="Select template"
                />
              </BaseForm.Item>
            </Col>
            <Col span={24}>
              <BaseForm.Item name="languageCode" label="Select language">
                <Select style={{ width: '100%' }} options={LangOpt} placeholder="Select language" />
              </BaseForm.Item>
            </Col>

            <Col span={24}>
              <BaseForm.List name="templateData">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card
                        key={key}
                        title={`${name + 1}. template data`}
                        extra={<Icon name="DeleteOutlined" onClick={() => remove(name)} />}
                      >
                        <Row gutter={[10, 10]}>
                          <Col span={12}>
                            <BaseForm.Item
                              {...restField}
                              name={[name, 'key']}
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Template data key" />
                            </BaseForm.Item>
                          </Col>
                          <Col span={12}>
                            <BaseForm.Item
                              {...restField}
                              name={[name, 'value']}
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Template data value" />
                            </BaseForm.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <BaseForm.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<Icon name="PlusOutlined" />}
                      >
                        Add template data
                      </Button>
                    </BaseForm.Item>
                  </>
                )}
              </BaseForm.List>
            </Col>

            <Col span={24}>
              <BaseForm.List name="firebaseDate">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card
                        key={key}
                        title={`${name + 1}. firebase data`}
                        extra={<Icon name="DeleteOutlined" onClick={() => remove(name)} />}
                      >
                        <Row gutter={[10, 10]}>
                          <Col span={12}>
                            <BaseForm.Item
                              {...restField}
                              name={[name, 'key']}
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Firebase data key" />
                            </BaseForm.Item>
                          </Col>
                          <Col span={12}>
                            <BaseForm.Item
                              {...restField}
                              name={[name, 'value']}
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Firebase data value" />
                            </BaseForm.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <BaseForm.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<Icon name="PlusOutlined" />}
                      >
                        Add firebase data
                      </Button>
                    </BaseForm.Item>
                  </>
                )}
              </BaseForm.List>
            </Col>

            <Col span={24}>
              <Select
                onChange={(e) => handleType(e)}
                style={{ width: '100%' }}
                options={NotifyOpt}
                placeholder="Select types"
              />
            </Col>
            {type === NotificationType.SELECTBLE && (
              <Col span={24}>
                <BaseForm.Item name="userIds" label="Select users" rules={[{ required: true }]}>
                  <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    options={userOpt}
                    placeholder="Select users"
                    onSearch={handleSearch}
                    loading={loading.get}
                  />
                </BaseForm.Item>
              </Col>
            )}
            <Col span={24}>
              <Button htmlType="submit" style={{ width: '100%' }} type="primary">
                Push
              </Button>
            </Col>
          </Row>
        </BaseForm>
      </Card>
    </Fragment>
  );
};
