import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { Col, Input, Row, Select } from 'antd';
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
          navigate(ROUTES.bookingBedType);
        },
        name,
        description,
        size,
      });
    } else if (type === 'edit') {
      updateBedType({
        callback() {
          addNotification('Successfully edited facility');
          navigate(ROUTES.bookingBedType);
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

  const facilityLanguageTypeOptions = [
    { label: 'UZ', value: 'UZ' },
    { label: 'RU', value: 'RU' },
    { label: 'EN', value: 'EN' },
    { label: 'SP', value: 'SP' },
    { label: 'AR', value: 'AR' },
    { label: 'ZH', value: 'ZH' },
    { label: 'FR', value: 'FR' },
  ];

  useEffect(() => {
    if (type === 'edit' && bedType) {
      form.setFieldsValue({
        name: bedType?.name,
        description: bedType?.description,
        size: bedType?.size,
        lang: bedType?.lang,
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
        <Col span={type === 'edit' ? 8 : 12}>
          <BaseForm.Item name="name" label={'Bed type name'} rules={[{ required: true }]}>
            <Input placeholder="Enter bed type name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={type === 'edit' ? 8 : 12}>
          <BaseForm.Item name="size" label={'Bed type size'} rules={[{ required: true }]}>
            <Input placeholder="Enter bed type size ?" />
          </BaseForm.Item>
        </Col>
        {type === 'edit' ? (
          <Col span={type === 'edit' ? 8 : 0}>
            <BaseForm.Item name="lang" label={'Language type'} rules={[{ required: true }]}>
              <Select
                options={facilityLanguageTypeOptions}
                placeholder="Select bed type language type"
              />
            </BaseForm.Item>
          </Col>
        ) : null}

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
