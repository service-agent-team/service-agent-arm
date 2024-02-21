import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, InputPassword, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';
import { IValuesForm } from './types';

export const UsersForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { createUser } = useActions();
  const navigate = useNavigate();

  const { loading } = useTypedSelector((state) => state.users);

  const onFinish = (value: IValuesForm) => {
    createUser({
      userName: value.username,
      email: value.email,
      password: value.password,
      callback: () => {
        addNotification('user created');
        navigate('/global/users');
      },
    });
  };

  return (
    <BaseForm
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
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
