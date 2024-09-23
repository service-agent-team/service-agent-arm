import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm } from '@/components/common';
import { Modal } from '@/components/common/modal';
import { Col, Input, Row, Select } from 'antd';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { LanguageType } from '@/common/enum';
import { addNotification } from '@/common';

export const TaxesTranslationModal = () => {
  const { setModal, createTaxeTranslation } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const {
    taxe,
    loading: { post },
  } = useTypedSelector((s) => s.bookingTaxes);

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ name, languageType }: IValues) => {
    if (taxe) {
      createTaxeTranslation({
        callback() {
          addNotification('Successfully added taxes translation');
          setModal(false);
        },
        body: {
          taxId: taxe.id,
          name,
          languageType,
        },
      });
    }
  };

  const lang = Object.keys(LanguageType).map((el) => ({
    value: el,
    label: el,
    disabled: el === LanguageType.EN || !!taxe?.translations?.find((t) => t.languageType === el),
  }));

  return (
    <Modal
      title="Create taxes translation"
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
