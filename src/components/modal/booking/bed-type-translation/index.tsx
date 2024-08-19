import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, TextArea } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const BedTypeTranslationModal = () => {
  const { setModal, createBedTypeTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const {
    bedType,
    loading: { post },
  } = useTypedSelector((s) => s.bookingBedType);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, size, description, languageType }: IValues) => {
    if (bedType) {
      createBedTypeTranslation({
        callback() {
          addNotification('Successfully added facility translation');
          setModal(false);
        },
        body: {
          bedTypeId: bedType.id,
          name,
          size,
          description,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  return (
    <Modal
      title="Create bed type translation"
      size="large"
      onCancel={onClose}
      open={isModal}
      footer={null}
    >
      <BaseForm onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <BaseForm.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item name="size" label="Size" rules={[{ required: true }]}>
              <Input placeholder="Size" />
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
