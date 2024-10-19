import { BaseForm, Field } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { useEffect } from 'react';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { LanguageType } from '@/common/enum';

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
        lang: languageType as LanguageType,
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
      getOneBedType({ id: Number(id), lang: languageType as LanguageType });
    }
  }, [id, languageType]);

  const langOptions = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

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
    <BaseForm form={form} onFinish={onFinish} loading={loading} save>
      <Field span={type === 'edit' ? 8 : 12} name="name" label="Bed type name" isRequired />

      <Field span={type === 'edit' ? 8 : 12} name="size" label="Bed type size" isRequired />

      {type === 'edit' ? (
        <Field
          span={type === 'edit' ? 8 : 0}
          name="lang"
          label="Language type"
          isRequired
          options={langOptions}
        />
      ) : null}

      <Field span={24} name="size" label="Bed type description" isRequired textarea />
    </BaseForm>
  );
};
