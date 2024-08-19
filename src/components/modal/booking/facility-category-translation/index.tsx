import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const FacilityCategoryTranslationModal = () => {
  const { setModal, createFacilityCategoryTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const {
    facilityCategory,
    loading: { post },
  } = useTypedSelector((s) => s.bookingFacilityCategory);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, languageType }: IValues) => {
    if (facilityCategory) {
      createFacilityCategoryTranslation({
        callback() {
          addNotification('Successfully added facility category translation');
          setModal(false);
        },
        body: {
          categoryId: facilityCategory.id,
          name,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  return (
    <Modal
      title="Create facility category translation"
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
          <PrimaryBtn htmlType="submit" loading={post}>
            Save
          </PrimaryBtn>
        </Row>
      </BaseForm>
    </Modal>
  );
};
