import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, Select } from '@/components';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ICreateRolesValues } from './types';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';

export const UserRoleForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createUserRole, getUsers, getAllRole, updateUserRole } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const { roles } = useTypedSelector((state) => state.role);
  const { users } = useTypedSelector((state) => state.users);
  const { userRole, loading } = useTypedSelector((state) => state.userRole);

  const onFinish = (value: ICreateRolesValues) => {
    if (type === 'create') {
      createUserRole({
        userId: +value.userId,
        roleId: +value.roleId,
        userRoleName: value.userRoleName,
        userRoleDescription: value.userRoleDescription,
        callback: () => {
          addNotification('successfully created');
          navigate(ROUTES.userRoles);
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      updateUserRole({
        id: Number(id),
        roleId: +value.roleId,
        userId: +value.userId,
        userRoleName: value.userRoleName,
        userRoleDescription: value.userRoleDescription,
        callback: () => {
          addNotification('successfully edited');
          navigate(ROUTES.userRoles);
        },
      });
      form.resetFields();
    }
  };
  const UserIdOptions = users?.map((user) => ({
    label: user.email,
    value: user.user_id,
  }));
  const RoleIdOptions = roles?.map((role) => ({
    label: role.role_name,
    value: role.role_id,
  }));

  useEffect(() => {
    getUsers({
      callback: () => {},
      id: 0,
    });
    getAllRole({ callback() {} });
  }, []);

  return (
    <>
      <BaseForm
        initialValues={
          type === 'edit'
            ? {
                userRoleName: userRole?.user_role_name,
                userRoleDescription: userRole?.user_role_description,
              }
            : {}
        }
        name="userRole"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <BaseForm.Item
          name="userRoleName"
          label={'user role name'}
          rules={[
            { required: true, message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('userRoleName') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from userRoleName!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter user role name ?" />
        </BaseForm.Item>

        <BaseForm.Item
          name="userRoleDescription"
          label={'user role description'}
          rules={[
            { required: true, type: 'string', message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('userRoleDescription') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from userRoleDescription!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter user role description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          name="userId"
          label={'user'}
          rules={[{ required: true, message: 'filed is required' }]}
        >
          <Select
            defaultValue={{ label: userRole?.user_id?.email, value: userRole?.user_id?.user_id }}
            placeholder={'Select user'}
            options={UserIdOptions}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="roleId"
          label={'role'}
          rules={[{ required: true, message: 'filed is required' }]}
        >
          <Select
            defaultValue={{
              label: userRole?.role_id?.role_name,
              value: userRole?.role_id?.role_id,
            }}
            placeholder={'Select role'}
            options={RoleIdOptions}
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </BaseForm>
    </>
  );
};
