import { BaseForm, Field } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { useEffect } from 'react';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { LanguageType } from '@/common/enum';

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
        lang: lang as LanguageType,
        body: {
          name,
        },
      });
    }
  };
  const langOptions = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  useEffect(() => {
    if (id && languageType) {
      getOneFacilityCategory({ id: Number(id), lang: languageType as LanguageType });
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
    <BaseForm form={form} onFinish={onFinish} loading={loading} save>
      <Field span={type === 'edit' ? 24 : 18} name="name" label="Facility name" isRequired />

      {type === 'edit' ? (
        <Field
          span={type === 'edit' ? 6 : 0}
          name="name"
          label="Facility name"
          options={langOptions}
          isRequired
        />
      ) : null}
    </BaseForm>
  );
};
