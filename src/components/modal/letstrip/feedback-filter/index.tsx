import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm } from '@/components/common';
import { Icon } from '@/components/common/icon';
import { Modal } from '@/components/common/modal';
import { Button, Col, Row, Select } from 'antd';
import { useEffect } from 'react';
import { PrimaryBtn } from '@/components/primary-btn';
import { FeedbackStateType, FeedbackType } from '@/store/lets-trip/feedback/types';

export const LestTripFeedbackFilterModal = () => {
  const { getAllFeedback, setFeedbackModal, setFeedbackType, setFeedbackState } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((s) => s.app);
  const {
    type,
    state,
    modal,
    loading: { get },
  } = useTypedSelector((s) => s.letsTripFeedback);
  const [form] = BaseForm.useForm();

  const typeOpt = Object.keys(FeedbackType).map((t) => ({ label: t, value: t }));
  const statusOpt = Object.keys(FeedbackStateType).map((t) => ({ label: t, value: t }));

  const onFinish = (values: any) => {
    setFeedbackType(values?.type);
    setFeedbackState(values?.status);
  };

  const handleReset = () => {
    form.resetFields();
    setFeedbackType('');
    setFeedbackState('');
  };

  const onClose = () => {
    setFeedbackModal({ name: 'filter', data: false });
  };

  useEffect(() => {
    form.setFieldsValue({
      type: type,
      status: state,
    });

    if (current) {
      getAllFeedback({ type, state, page: current - 1, size: pageSize });
    }
  }, [current, pageSize, type, state]);

  return (
    <Modal
      title="Filter Feedback"
      size="large"
      onCancel={onClose}
      open={modal.name === 'filter' && modal.data}
      footer={null}
    >
      <BaseForm form={form} onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <BaseForm.Item name="type" label={'Select project'}>
              <Select options={typeOpt} placeholder="Select project" />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseForm.Item name="status" style={{ width: '100%' }} label={'Select status'}>
              <Select options={statusOpt} placeholder="Select status" />
            </BaseForm.Item>
          </Col>
          <Col span={16}>
            <PrimaryBtn htmlType="submit" loading={get} icon={<Icon name="FilterOutlined" />}>
              Filter
            </PrimaryBtn>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: '100%' }}
              onClick={handleReset}
              type="dashed"
              color="red"
              icon={<Icon danger name="ClearOutlined" />}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </BaseForm>
    </Modal>
  );
};
