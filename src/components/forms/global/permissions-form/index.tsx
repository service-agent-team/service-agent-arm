import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { IPermissionCreatePayload } from '@/store';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styled';
import { ROUTES } from '@/constants';

export const PermisionsForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { loading } = useTypedSelector((state) => state.permission);
  const { createPermission, updatePermission } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const { permission } = useTypedSelector((state) => state.permission);

  const onFinish = (value: IPermissionCreatePayload) => {
    if (type === 'create') {
      createPermission({
        permissionName: value.permissionName,
        permissionDescription: value.permissionDescription,
        callback: () => {
          addNotification('permission created');
          navigate(ROUTES.permissions);
        },
      });
    } else if (type === 'edit') {
      updatePermission({
        id: Number(id),
        permissionName: value.permissionName,
        permissionDescription: value.permissionDescription,
        callback() {
          addNotification('successfully permission update !');
          navigate(ROUTES.permissions);
        },
      });
    }
  };

  return (
    <BaseForm
      initialValues={
        type === 'edit'
          ? {
              permissionName: permission?.permission_name,
              permissionDescription: permission?.permission_name,
            }
          : {}
      }
      name="permissionsForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <BaseForm.Item
          name="permissionName"
          label={'permissionName'}
          rules={[
            { required: true, message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('permissionName') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from form!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter permissionName ?" />
        </BaseForm.Item>

        <BaseForm.Item
          name="permissionDescription"
          label={'permissionDescription'}
          rules={[
            { required: true, message: 'permissionDescription is required?' },
            {
              type: 'string',
              message: 'Enter permissionDescription  ?',
            },
          ]}
        >
          <TextArea rows={4} placeholder="Enter short description" />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
