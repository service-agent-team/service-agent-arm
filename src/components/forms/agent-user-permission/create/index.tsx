import { BaseForm, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';

export const AgentUserPermissionCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const [userId, setUserId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const { roles } = useTypedSelector((state) => state.roles);
  // const { getAllUsers } = useTypedSelector((state) => state.agent);
  const { getCompany } = useActions();

  const onFinish = (_: IValuesForm) => {};
  const selectOptionUserId = roles?.map((role) => ({
    value: role.id,
    label: role.name,
  }));
  const selectOptionRoleId = []?.map((user: any) => ({
    label: user.name,
    value: user.id,
  }));
  const changeUserId = (value: any) => {
    return setUserId(value);
  };
  const changeRoleId = (value: any) => {
    setRoleId(value);
  };

  useEffect(() => {
    getCompany({ page: 0, size: 20 });
  }, []);

  return (
    <BaseForm
      name="letsTripCreateForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <BaseForm.Item
          name="userId"
          label={'userId'}
          rules={[{ required: true, message: 'agent user is required!' }]}
        >
          <Select
            onChange={changeUserId}
            placeholder="Select agent user?"
            options={selectOptionUserId}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="roleId"
          label={'roleId'}
          rules={[{ required: true, message: 'role is required!' }]}
        >
          <Select onChange={changeRoleId} placeholder="Select role?" options={selectOptionRoleId} />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit">create</PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
