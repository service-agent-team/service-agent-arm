import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { Col, Input, Row, Select } from 'antd';
import { useEffect } from 'react';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { FacilityLanguageType } from '@/store/booking/facility/types';

export const BookingFacilityCategoryForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { facilityCategory, loading } = useTypedSelector((s) => s.bookingFacilityCategory);
  const { createFacilityCategory, updateFacilityCategory, getOneFacilityCategory } = useActions();
  const navigate = useNavigate();
  const { id, languageType } = useParams();

  const onFinish = ({ name, lang }: IValues) => {
    if (type === 'create') {
      createFacilityCategory({
        callback() {
          addNotification('Successfully added facility');
          navigate(ROUTES.bookingFacilityCategory);
        },
        name,
      });
    } else if (type === 'edit') {
      updateFacilityCategory({
        callback() {
          addNotification('Successfully edited facility category');
          navigate(ROUTES.bookingFacilityCategory);
        },
        id: Number(id),
        lang: lang as FacilityLanguageType,
        body: {
          name,
        },
      });
    }
  };

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
    if (id && languageType) {
      getOneFacilityCategory({ id: Number(id), lang: languageType as FacilityLanguageType });
    }
  }, [id, languageType]);

  useEffect(() => {
    if (type === 'edit' && facilityCategory) {
      form.setFieldsValue({
        name: facilityCategory?.name,
        lang: facilityCategory?.languageType,
      });
    }
  }, [facilityCategory]);

  return (
    <BaseForm
      name="facilityCategoryForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <Row gutter={[12, 12]}>
        <Col span={type === 'create' ? 24 : 18}>
          <BaseForm.Item name="name" label={'Facility name'} rules={[{ required: true }]}>
            <Input placeholder="Enter facility category name ?" />
          </BaseForm.Item>
        </Col>

        {type === 'edit' ? (
          <Col span={type === 'edit' ? 6 : 0}>
            <BaseForm.Item name="lang" label={'Language type'} rules={[{ required: true }]}>
              <Select
                options={facilityLanguageTypeOptions}
                placeholder="Select facility language type"
              />
            </BaseForm.Item>
          </Col>
        ) : null}

        <Col span={24}>
          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </Col>
      </Row>
    </BaseForm>
  );
};
