import { addNotification } from '@/common';
import { LanguageType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { ROUTES } from '@/constants';
import { Col, Input, Row, Select, Switch } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';

export const BookingFacilityForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { facility, loading } = useTypedSelector((s) => s.bookingFacility);
  const { createFacility, editFacility, getAllFacilityCategory, getOneFacility } = useActions();
  const navigate = useNavigate();
  const { facilityCategories } = useTypedSelector((s) => s.bookingFacilityCategory);
  const { id, languageType } = useParams();

  const onFinish = ({ name, description, facilityType, isCommon, categoryId, lang }: IValues) => {
    if (type === 'create') {
      createFacility({
        callback() {
          addNotification('Successfully added facility');
          navigate(ROUTES.bookingFacility);
        },
        name,
        description,
        facilityType,
        isCommon,
        categoryId,
      });
    } else if (type === 'edit') {
      editFacility({
        callback() {
          addNotification('Successfully edited facility');
          navigate(ROUTES.bookingFacility);
        },
        id: Number(id),
        lang: lang as LanguageType,
        body: {
          name,
          description,
          facilityType,
          isCommon,
          categoryId,
        },
      });
    }
  };

  const facilityTypeOptions = [
    { label: 'PROPERTY', value: 'PROPERTY' },
    { label: 'ROOM', value: 'ROOM' },
    { label: 'UNKNOWN', value: 'UNKNOWN' },
  ];

  const facilityCategoryOptions = facilityCategories?.map((f) => ({
    value: f.id,
    label: f.name,
  }));

  const LanguageTypeOptions = Object.keys(LanguageType).map((el) => ({
    value: el,
    label: el,
  }));

  useEffect(() => {
    if (type === 'create') {
      getAllFacilityCategory({ page: 0, size: 300 });
    }
    if (id) {
      getAllFacilityCategory({ page: 0, size: 300 });
      getOneFacility({ id: Number(id), lang: languageType as LanguageType });
    }
  }, [id]);

  useEffect(() => {
    form.setFieldValue('isCommon', true);

    if (type === 'edit' && facility) {
      form.setFieldsValue({
        name: facility?.name,
        description: facility?.description,
        facilityType: facility?.facilityType,
        categoryId: facility?.category.id,
        isCommon: facility?.common,
        lang: facility?.languageType,
      });
    }
  }, [facility]);

  return (
    <BaseForm
      name="facilityForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <BaseForm.Item name="name" label={'Facility name'} rules={[{ required: true }]}>
            <Input placeholder="Enter facility name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={type === 'edit' ? 7 : 10}>
          <BaseForm.Item name="facilityType" label={'Facility type'} rules={[{ required: true }]}>
            <Select options={facilityTypeOptions} placeholder="Select facility type" />
          </BaseForm.Item>
        </Col>

        <Col span={type === 'edit' ? 7 : 10}>
          <BaseForm.Item name="categoryId" label={'Facility category'} rules={[{ required: true }]}>
            <Select options={facilityCategoryOptions} placeholder="Select facility category?" />
          </BaseForm.Item>
        </Col>
        {type === 'edit' ? (
          <Col span={type === 'edit' ? 7 : 6}>
            <BaseForm.Item name="lang" label={'Language type'} rules={[{ required: true }]}>
              <Select options={LanguageTypeOptions} placeholder="Select facility language type" />
            </BaseForm.Item>
          </Col>
        ) : null}
        <Col span={type === 'edit' ? 3 : 4}>
          <BaseForm.Item name="isCommon" label={'Is Common'} rules={[{ required: true }]}>
            <Switch />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <BaseForm.Item
            name="description"
            label="Facility description"
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
