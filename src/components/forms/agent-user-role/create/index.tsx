import { BaseForm, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const AgentUserRoleCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { getRoles, getAllUsers, createAgentUserRole } = useActions();
  const { roles } = useTypedSelector((state) => state.roles);
  const { data } = useTypedSelector((state) => state.agent);
  const {
    loading: { post },
  } = useTypedSelector((state) => state.agentUserRole);

  const onFinish = ({ userId, roleId }: IValuesForm) => {
    createAgentUserRole({
      userId,
      roleId,
      callback() {
        addNotification('successfully created agent user role');
      },
    });
  };
  const selectOptionUserId = data?.map((user) => ({
    value: user.userId,
    label: `${user.userId}. ${user.firstName} ${user.lastName}`,
  }));
  const selectOptionRoleId = roles?.map((user: any) => ({
    label: user.name,
    value: user.id,
  }));

  useEffect(() => {
    getRoles({ callback() {} });
    getAllUsers({
      callback() {},
      statusName: 'success',
    });
  }, []);

  return (
    <BaseForm name="agentUserRoleCreateForm" form={form} layout="vertical" onFinish={onFinish}>
      <S.FormContent>
        <BaseForm.Item
          name="userId"
          label={'agent user'}
          rules={[{ required: true, message: 'agent user is required!' }]}
        >
          <Select placeholder="Select agent user?" options={selectOptionUserId} />
        </BaseForm.Item>
        <BaseForm.Item
          name="roleId"
          label={'role'}
          rules={[{ required: true, message: 'role is required!' }]}
        >
          <Select placeholder="Select role?" options={selectOptionRoleId} />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
