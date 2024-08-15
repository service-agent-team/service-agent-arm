import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { Col, Input, Row } from 'antd';
import { useEffect } from 'react';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { FacilityLanguageType } from '@/store/booking/facility/types';

export const BookingBedTypeForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { bedType, loading } = useTypedSelector((s) => s.bookingBedType);
  const { createBedType, updateBedType, getOneBedType } = useActions();
  const navigate = useNavigate();
  const { id, languageType } = useParams();

  const onFinish = ({ name, description, size }: IValues) => {
    if (type === 'create') {
      createBedType({
        callback() {
          addNotification('Successfully added facility');
          navigate(ROUTES.bookingFacility);
        },
        name,
        description,
        size,
      });
    } else if (type === 'edit') {
      updateBedType({
        callback() {
          addNotification('Successfully edited facility');
          navigate(ROUTES.bookingFacility);
        },
        id: Number(id),
        lang: languageType as FacilityLanguageType,
        body: {
          name,
          description,
          size,
        },
      });
    }
  };

  useEffect(() => {
    if (id && languageType) {
      getOneBedType({ id: Number(id), lang: languageType as FacilityLanguageType });
    }
  }, [id, languageType]);

  useEffect(() => {
    if (type === 'edit' && bedType) {
      form.setFieldsValue({
        name: bedType?.name,
        description: bedType?.description,
        size: bedType?.size,
      });
    }
  }, [bedType]);

  return (
    <BaseForm
      name="facilityForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <BaseForm.Item name="name" label={'Bed type name'} rules={[{ required: true }]}>
            <Input placeholder="Enter bed type name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item name="size" label={'Bed type size'} rules={[{ required: true }]}>
            <Input placeholder="Enter bed type size ?" />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <BaseForm.Item
            name="description"
            label="Bed type description"
            rules={[{ required: true }]}
          >
            <TextArea placeholder="Description" />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </Col>
      </Row>
    </BaseForm>
  );
};
