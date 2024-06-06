import { addNotification } from '@/common/utils/addNotification';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, PrimaryBtn, Select } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';
import { IUserPermissionValues } from './types';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';
import { IProject } from '@/store/global/project/types';

export const UserPermissionForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createUserPermission, getUsers, getPermisions, updateUserPermission, getAllProject } =
    useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useTypedSelector((state) => state.users);
  const { permissions } = useTypedSelector((state) => state.permission);
  const { projects } = useTypedSelector((state) => state.project);
  const { loading, userPermission } = useTypedSelector((state) => state.userPermission);

  const onFinish = (value: IUserPermissionValues) => {
    if (type === 'create') {
      createUserPermission({
        permissionId: value.permissionId,
        userId: value.userId,
        projectId: value.projectId,
        callback: () => {
          addNotification('successfully created');
          navigate(ROUTES.userPermission);
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      updateUserPermission({
        id: Number(id),
        userId: value.userId,
        projectId: value.projectId,
        permissionId: value.permissionId,
        callback: () => {
          addNotification('successfully edited');
          navigate(ROUTES.userPermission);
        },
      });
      form.resetFields();
    }
  };
  const UserIdOptions = users?.map((user) => ({
    label: user.email,
    value: user.user_id,
  }));
  const PermissionIdOptions = permissions?.map((role) => ({
    label: role.permission_name,
    value: role.permission_id,
  }));
  const ProjectIdOptions = projects?.map((project: IProject) => ({
    label: project.project_name,
    value: project.project_id,
  }));

  useEffect(() => {
    getUsers({
      callback: () => {},
      id: 0,
    });
    getPermisions({ callback() {} });
    getAllProject({ callback() {} });
  }, []);

  return (
    <>
      <BaseForm
        name="userPermission"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={
          type === 'edit'
            ? {
                userId: userPermission?.user_id?.user_id,
                permissionId: userPermission?.permission_id?.permission_id,
                projectId: userPermission?.project_id?.project_id,
              }
            : {}
        }
      >
        <BaseForm.Item
          name="userId"
          label={'user'}
          rules={[
            { required: true, message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('userId') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from userId!'));
              },
            }),
          ]}
        >
          <Select placeholder={'Select user'} options={UserIdOptions} />
        </BaseForm.Item>

        <BaseForm.Item
          name="permissionId"
          label={'permission'}
          rules={[
            { required: true, type: 'number', message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('permissionId') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from permission!'));
              },
            }),
          ]}
        >
          <Select placeholder="Select permission ?" options={PermissionIdOptions} />
        </BaseForm.Item>
        <BaseForm.Item
          name="projectId"
          label={'project'}
          rules={[
            { required: true, type: 'number', message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('projectId') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from project!'));
              },
            }),
          ]}
        >
          <Select placeholder="Select permission ?" options={ProjectIdOptions} />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </BaseForm>
    </>
  );
};
