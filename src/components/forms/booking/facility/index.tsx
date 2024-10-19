import { addNotification } from '@/common';
import { LanguageType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Field, Loading } from '@/components';
import { ROUTES } from '@/constants';
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

  if (loading.get) {
    return <Loading />;
  }

  return (
    <BaseForm form={form} onFinish={onFinish} loading={loading} save>
      <Field span={24} name="name" label="Facility name" isRequired />

      <Field
        span={type === 'edit' ? 7 : 10}
        name="facilityType"
        label="Facility type"
        isRequired
        options={facilityTypeOptions}
      />

      <Field
        span={type === 'edit' ? 7 : 10}
        name="categoryId"
        label="Facility category"
        isRequired
        options={facilityCategoryOptions}
      />

      {type === 'edit' ? (
        <Field
          span={type === 'edit' ? 7 : 6}
          name="lang"
          label={'Language type'}
          isRequired
          options={LanguageTypeOptions}
        />
      ) : null}

      <Field span={type === 'edit' ? 3 : 4} name="isCommon" label="Is Common" isRequired isSwitch />

      <Field span={24} name="description" label="Facility description" isRequired textarea />
    </BaseForm>
  );
};
