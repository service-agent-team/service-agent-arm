import { BaseForm, Input, PrimaryBtn } from '@/components';
import React from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const AgentProjectCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const {
    loading: { post },
  } = useTypedSelector((state) => state.agentUserRole);
  const { createAgentProject } = useActions();

  const onFinish = ({ name, description }: IValuesForm) => {
    createAgentProject({
      name,
      description,
      callback() {
        addNotification('successfully created agent project');
      },
    });
  };

  return (
    <BaseForm name="agentProjectCreateForm" form={form} layout="vertical" onFinish={onFinish}>
      <S.FormContent>
        <BaseForm.Item
          name="name"
          label={'name'}
          rules={[{ required: true, message: 'name is required!' }]}
        >
          <Input placeholder="Enter project name" />
        </BaseForm.Item>
        <BaseForm.Item
          name="description"
          label={'description'}
          rules={[{ required: true, message: 'description is required!' }]}
        >
          <Input placeholder="Enter project description" />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
