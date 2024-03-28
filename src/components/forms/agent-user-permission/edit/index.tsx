import { AutoComplete, BaseForm, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const AgentUserPermissionEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { getCompany, getAgentPermissions, getAllUsers, createAgentUserPermission } = useActions();
  const { permissions } = useTypedSelector((state) => state.agentPermission);
  const { data } = useTypedSelector((state) => state.agent);
  const { companies } = useTypedSelector((state) => state.company);

  const onFinish = ({ permissionId, projectId, userId }: IValuesForm) => {
    createAgentUserPermission({
      callback() {
        addNotification('successfully created agent user permission');
      },
      permissionId,
      projectId,
      userId: +userId.split('-')[0],
    });
  };
  const selectOptionPermission = permissions?.map((permission) => ({
    value: permission.id,
    label: permission.name,
  }));
  const selectOptionUserId = data?.map((user) => ({
    label: `${user.userId}. ${user.firstName} ${user.lastName}`,
    value: `${user.userId}-${Math.random() * 100}`,
    // value: user.userId,
  }));
  const selectOptionCompanyId = companies?.map((company) => ({
    label: company.name,
    value: company.id,
  }));

  useEffect(() => {
    getCompany({ page: 0, size: 20 });
    getAgentPermissions({
      callback() {
        addNotification('get all agent permissions');
      },
    });
    getAllUsers({
      callback() {
        addNotification('get all users');
      },
      statusName: 'success',
    });
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
          name="projectId"
          label={'project'}
          rules={[{ required: true, message: 'project is required!' }]}
        >
          <Select placeholder="Project company?" options={selectOptionCompanyId} />
        </BaseForm.Item>
        <BaseForm.Item
          name="permissionId"
          label={'permission'}
          rules={[{ required: true, message: 'permission is required!' }]}
        >
          <Select placeholder="Select role?" options={selectOptionPermission} />
        </BaseForm.Item>
        <BaseForm.Item
          name="userId"
          label={'user'}
          rules={[{ required: true, message: 'user is required!' }]}
        >
          <AutoComplete
            filterOption={(inputValue, option) =>
              option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            }
            placeholder="Select agent user?"
            options={selectOptionUserId}
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit">create</PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
