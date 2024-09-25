import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, TextArea } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Form, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const RoomTranslationModal = () => {
  const { setModal, createRoomTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const [form] = Form.useForm();

  const {
    room,
    loading: { post },
  } = useTypedSelector((s) => s.bookingRoom);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, description, languageType }: IValues) => {
    if (room) {
      createRoomTranslation({
        cb() {
          addNotification('Successfully added room translation');
          setModal(false);
          form.resetFields();
        },
        body: {
          name,
          roomId: room.id,
          description,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({
    value: el,
    label: el,
    disabled:
      el === LanguageType.EN ? true : !!room?.translations?.find((t) => t.languageType === el),
  }));

  return (
    <Modal
      title="Create room translation"
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
