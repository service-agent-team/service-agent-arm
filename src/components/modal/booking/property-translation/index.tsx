import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, TextArea } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Form, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const PropertyTranslationModal = () => {
  const { setModal, createPropertyTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const [form] = Form.useForm();

  const {
    property,
    loading: { post },
  } = useTypedSelector((s) => s.bookingProperty);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, description, address, languageType }: IValues) => {
    if (property) {
      createPropertyTranslation({
        cb() {
          addNotification('Successfully added property translation');
          setModal(false);
          form.resetFields();
        },
        body: {
          name,
          propertyId: property.id || 2,
          address,
          description,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({
    value: el,
    label: el,
    disabled: !!property?.translations?.find((t) => t.languageType === el),
  }));

  return (
    <Modal
      title="Create property translation"
      size="large"
      onCancel={onClose}
      open={isModal}
      footer={null}
    >
      <BaseForm form={form} onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <BaseForm.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item name="languageType" label="Language Type" rules={[{ required: true }]}>
              <Select options={lang} placeholder="Select language type" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item name="address" rules={[{ required: true }]}>
              <TextArea placeholder="Address" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item name="description" rules={[{ required: true }]}>
              <TextArea placeholder="Description" />
            </BaseForm.Item>
          </Col>
          <PrimaryBtn htmlType="submit" loading={post}>
            Create
          </PrimaryBtn>
        </Row>
      </BaseForm>
    </Modal>
  );
};
