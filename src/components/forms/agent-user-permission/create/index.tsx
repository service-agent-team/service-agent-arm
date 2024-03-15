import { BaseForm, Icon, InputPassword, PrimaryBtn, TextArea } from '@/components';
import { Flex, Input, Select, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';

export const AgentUserPermissionCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const [companyId, setCompanyId] = useState(null);
  const [currency, setCurrency] = useState(null);
  const { companies } = useTypedSelector((state) => state.company);
  const { getCompany } = useActions();

  const onFinish = (_: IValuesForm) => {};
  const selectOptionCompany = companies?.map((company) => ({
    label: company.name,
    value: company.id,
  }));
  const selectOptionCurrency = [
    {
      label: 'UZS',
      value: 'UZS',
    },
    {
      label: 'USD',
      value: 'USD',
    },
  ];
  const changeCompany = (value: any) => {
    return setCompanyId(value);
  };
  const changeCurrency = (value: any) => {
    setCurrency(value);
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
          name="name"
          label={'name'}
          rules={[
            { required: true, message: 'field is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('field is required'));
                }
                if (getFieldValue('name') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from form!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter tour name ?" />
        </BaseForm.Item>
        <BaseForm.Item
          name="company"
          label={'company'}
          rules={[{ required: true, message: 'company is required!' }]}
        >
          <Select
            onChange={changeCompany}
            placeholder="Select company?"
            options={selectOptionCompany}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="currency"
          label={'currency'}
          rules={[{ required: true, message: 'currency is required!' }]}
        >
          <Select
            onChange={changeCurrency}
            placeholder="Select currency?"
            options={selectOptionCurrency}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="password"
          label={'password'}
          dependencies={['password']}
          rules={[
            { required: true, message: 'password required!' },
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

        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="location"
            label={'location'}
            rules={[
              { required: true, message: 'location is required?' },
              {
                type: 'string',
                message: 'Enter location ?',
              },
            ]}
          >
            <Input name="location" type="number" placeholder="Enter a longitude ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="latitude"
            label={'latitude'}
            rules={[
              { required: true, message: 'latitude is required?' },
              {
                type: 'string',
                message: 'Enter latitude ?',
              },
            ]}
          >
            <Input name="latitude" type="number" placeholder="Enter a latitude ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="countryCode"
            label={'country code'}
            rules={[
              { required: true, message: 'countryCode is required?' },
              {
                type: 'string',
                message: 'Enter countryCode ?',
              },
            ]}
          >
            <Input name="countryCode" type="string" placeholder="Enter a country code ? : UZ" />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          name="description"
          label={'description'}
          rules={[
            { required: true, message: 'field is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('field is required'));
                }
                if (getFieldValue('description') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from form!'));
              },
            }),
          ]}
        >
          <TextArea placeholder="Enter tour description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          name="pictures"
          label={'pictures'}
          rules={[
            { required: true, message: 'pictures is required?' },
            {
              type: 'object',
              message: 'Enter pictures ?',
            },
          ]}
        >
          <Upload.Dragger name="pictures" multiple={true} fileList={[]}>
            <Flex align="center" wrap="wrap" justify="center">
              <Typography.Text>Click or drag file to this area to upload</Typography.Text>
              <Icon fontSize="20" color="blue" name="InboxOutlined" />
            </Flex>
          </Upload.Dragger>
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit">create</PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
