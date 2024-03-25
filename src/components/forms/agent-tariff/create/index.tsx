import { BaseForm, Input, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const AgentTariffCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { createCategory } = useActions();
  const { roles } = useTypedSelector((state) => state.roles);
  const {
    loading: { post },
  } = useTypedSelector((state) => state.agentUserRole);

  const onFinish = ({ tariffName, categoryId }: IValuesForm) => {
    createCategory({
      tariffName,
      categoryId,
      callback() {
        addNotification('tariff successfully created');
      },
    });
  };
  const selectOptionCategory = roles?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {}, []);

  return (
    <BaseForm name="agentTariffCreateForm" form={form} layout="vertical" onFinish={onFinish}>
      <S.FormContent>
        <BaseForm.Item
          name="tariffName"
          label={'tariff name'}
          rules={[{ required: true, message: 'tariff name is required!' }]}
        >
          <Input placeholder="Enter tariff name" />
        </BaseForm.Item>
        <BaseForm.Item
          name="categoryId"
          label={'category'}
          rules={[{ required: true, message: 'category is required!' }]}
        >
          <Select placeholder="Select category?" options={selectOptionCategory} />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
