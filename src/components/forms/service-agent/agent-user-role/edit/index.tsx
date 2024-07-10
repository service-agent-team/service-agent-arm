import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { AutoComplete, BaseForm, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IValuesForm } from '../types';
import * as S from './styled';

export const AgentUserRoleEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { updateAgentUserRole, getRoles, getAllUsers } = useActions();
  const { loading, agentUserOneRole } = useTypedSelector((state) => state.agentUserRole);
  const { roles } = useTypedSelector((state) => state.roles);
  const { data } = useTypedSelector((state) => state.agent);
  const { id } = useParams();

  const defaultUser = data?.find((user) => user.userId == agentUserOneRole?.userId);
  const defaultRole = roles?.find((role) => role.id === agentUserOneRole?.roleId);

  const onFinish = ({ userId, roleId }: IValuesForm) => {
    userId = userId.split('-')[0];
    updateAgentUserRole({
      id: Number(id),
      userId: +userId,
      roleId,
      callback() {
        addNotification('successfully updated agent user role');
      },
    });
  };
  const selectOptionUserId = data?.map((user) => ({
    value: `${user.userId}-${Math.random() * 100}`,
    label: `${user.userId}. ${user.firstName} ${user.lastName}`,
  }));
  const selectOptionRoleId = roles?.map((user: any) => ({
    label: user.name,
    value: user.id,
  }));
  useEffect(() => {
    getRoles({
      callback() {
        addNotification('get all user roles');
      },
    });
    getAllUsers({
      callback() {
        addNotification('get all agent users');
      },
      statusName: 'success',
    });
  }, []);

  return (
    <BaseForm name="agentUserRoleEditForm" form={form} layout="vertical" onFinish={onFinish}>
      <S.FormContent>
        <BaseForm.Item
          name="userId"
          label={'agent user'}
          rules={[{ required: true, message: 'agent user is required!' }]}
        >
          <AutoComplete
            defaultValue={{
              label: `${defaultUser?.userId}. ${defaultUser?.firstName} ${defaultUser?.lastName} `,
              value: `${defaultUser?.userId}-${Math.random() * 100}`,
            }}
            filterOption={(inputValue, option) =>
              option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            }
            placeholder="Select agent user?"
            options={selectOptionUserId}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="roleId"
          label={'role'}
          rules={[{ required: true, message: 'role is required!' }]}
        >
          <Select
            defaultValue={{ label: defaultRole?.name, value: defaultRole?.id }}
            placeholder="Select role?"
            options={selectOptionRoleId}
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
