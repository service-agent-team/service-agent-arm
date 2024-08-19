import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, TextArea } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const FacilityTranslationModal = () => {
  const { setModal, createFacilityTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const {
    facility,
    loading: { post },
  } = useTypedSelector((s) => s.bookingFacility);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, description, languageType }: IValues) => {
    if (facility) {
      createFacilityTranslation({
        callback() {
          addNotification('Successfully added facility translation');
          setModal(false);
        },
        body: {
          facilityId: facility.id,
          name,
          description,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  return (
    <Modal
      title="Create facility translation"
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
            Save
          </PrimaryBtn>
        </Row>
      </BaseForm>
    </Modal>
  );
};
