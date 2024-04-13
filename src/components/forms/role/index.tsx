import { BaseForm, Input, PrimaryBtn } from '@/components';
import { IValues } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const RoleForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createRole, updateRole } = useActions();
  const { role, loading } = useTypedSelector((state) => state.role);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = ({ roleName, roleDescription }: IValues) => {
    if (type === 'create') {
      createRole({
        roleName,
        roleDescription,
        callback() {
          addNotification('successfully create role !');
          navigate(ROUTES.roles);
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      updateRole({
        id: Number(id),
        roleName,
        roleDescription,
        callback() {
          addNotification('successfully update role !');
          navigate(ROUTES.roles);
        },
      });
      form.resetFields();
    }
  };

  return (
    <BaseForm
      initialValues={
        type === 'edit'
          ? {
              roleName: role?.role_name,
              roleDescription: role?.description,
            }
          : {}
      }
      name="roleForms"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <BaseForm.Item
        name="roleName"
        label={'role name'}
        rules={[
          { required: true, type: 'string', message: 'role name field is required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('role name filed is required'));
              }
              if (getFieldValue('roleName') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('error from role name !'));
            },
          }),
        ]}
      >
        <Input placeholder="Enter role name ?" />
      </BaseForm.Item>

      <BaseForm.Item
        name="roleDescription"
        label={'role description'}
        rules={[
          { required: true, type: 'string', message: 'filed is required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('role description filed is required'));
              }
              if (getFieldValue('roleDescription') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('error from role description!'));
            },
          }),
        ]}
      >
        <Input placeholder="Enter role description ?" />
      </BaseForm.Item>
      <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
        {type === 'create' ? 'create' : 'edit'}
      </PrimaryBtn>
    </BaseForm>
  );
};
