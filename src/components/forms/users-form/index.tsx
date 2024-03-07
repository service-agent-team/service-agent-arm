import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, InputPassword, PrimaryBtn } from '@/components';
import { Input } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styled';
import { IValuesForm } from './types';

export const UsersForm: React.FC<{ type: 'create' | 'edit' }> = ({ type }) => {
  const [form] = BaseForm.useForm();
  const { createUser, editUser } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, loading } = useTypedSelector((state) => state.users);

  const onFinish = (value: IValuesForm) => {
    if (type === 'create') {
      createUser({
        payload: {
          userName: value.username,
          email: value.email,
          password: value.password,
          role: value.role,
        },
        callback: () => {
          addNotification('created');
          navigate('/global/users');
        },
      });
    } else {
      editUser({
        id: id as string,
        payload: { email: value.email, userName: value.username },
        callback: () => {
          addNotification('edited');
          navigate('/global/users');
        },
      });
    }
  };

  return (
    <BaseForm
      initialValues={
        type === 'edit'
          ? {
              username: user?.user_name,
              email: user?.email,
            }
          : {}
      }
      name="usersForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <BaseForm.Item
          name="username"
          label={'username'}
          rules={[
            { required: true, message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('username') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from form!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter username ?" />
        </BaseForm.Item>

        <BaseForm.Item
          name="email"
          label={'email'}
          rules={[
            { required: true, message: 'email is required?' },
            {
              type: 'email',
              message: 'Enter email the user ?',
            },
          ]}
        >
          <Input placeholder="Enter an email ?" />
        </BaseForm.Item>
        {type === 'create' ? (
          <>
            <BaseForm.Item
              name="password"
              label={'password'}
              dependencies={['password']}
              rules={[
                { required: true, message: 'missing..' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('error from form!'));
                  },
                }),
              ]}
            >
              <InputPassword placeholder="Enter a password ?" />
            </BaseForm.Item>

            <BaseForm.Item
              name={'role'}
              label={'role'}
              rules={[{ required: true, message: 'this is required field' }]}
            >
              <Input placeholder="Enter a role ?" />
            </BaseForm.Item>
          </>
        ) : null}

        <PrimaryBtn htmlType="submit" loading={loading.post || loading.put}>
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
