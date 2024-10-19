import { BaseForm, Field } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';
import { Col, Input } from 'antd';
import { useEffect } from 'react';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { LanguageType } from '@/common/enum';

export const BookingTaxesForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { taxe, loading } = useTypedSelector((s) => s.bookingTaxes);
  const { createTaxe, updateTaxe, getOneTaxe } = useActions();
  const navigate = useNavigate();
  const { id, languageType } = useParams();

  const onFinish = ({ name }: IValues) => {
    if (type === 'create') {
      createTaxe({
        callback() {
          addNotification('Successfully added taxes');
          navigate(ROUTES.bookingTaxes);
        },
        name,
      });
    } else if (type === 'edit') {
      updateTaxe({
        callback() {
          addNotification('Successfully edited taxes');
          navigate(ROUTES.bookingTaxes);
        },
        id: Number(id),
        lang: languageType as LanguageType,
        body: {
          name,
        },
      });
    }
  };

  useEffect(() => {
    if (id && languageType) {
      getOneTaxe({ id: Number(id), lang: languageType as LanguageType });
    }
  }, [id, languageType]);

  const langOptions = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  useEffect(() => {
    if (type === 'edit' && taxe) {
      form.setFieldsValue({
        name: taxe?.name,
        lang: taxe?.languageType,
      });
    }
  }, [taxe]);

  return (
    <BaseForm form={form} layout="vertical" onFinish={onFinish} loading={loading} save>
      <Field span={24} name="name" label="Taxes name" isRequired />

      {type === 'edit' ? (
        <Field
          span={type === 'edit' ? 24 : 0}
          name="lang"
          label="Language type"
          options={langOptions}
        />
      ) : null}
    </BaseForm>
  );
};
