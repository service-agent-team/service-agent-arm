import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { IPermissionCreatePayload } from '@/store';
import { Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

export const PermisionsForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { createPermission } = useActions();
  const navigate = useNavigate();

  const { loading } = useTypedSelector((state) => state.permission);

  const onFinish = (value: IPermissionCreatePayload) => {
    createPermission({
      permissionName: value.permissionName,
      permissionDescription: value.permissionDescription,
      callback: () => {
        addNotification('permission created');
        navigate('/global/permissions');
      },
    });
  };

  return (
    <BaseForm
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
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
