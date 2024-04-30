import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn } from '@/components';
import { Button, DatePicker, Flex, Input, Select, Space, Typography, Upload } from 'antd';
import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IValuesForm } from '../types';
import * as S from './styled';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomDatePicker } from '@/components/common/date-picker';

export const LestTripTransferCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { companies } = useTypedSelector((state) => state.company);
  const { loading, categories } = useTypedSelector((state) => state.letsTripTour);
  const { getCompany } = useActions();
  // const navigate = useNavigate();

  const onFinish = () => {
    // createLetsTripTransfer({
    //   callback() {
    //     addNotification('successfully added transfer');z
    //     navigate(ROUTES.letsTripTransfer);
    //   },
    //   name,
    //   categoryId,
    //   companyId,
    //   hourly,
    //   transfer,
    //   mediaLinks,
    //   currency,
    //   releaseDate,
    //   attributes,
    //   countryCode,
    // });
  };

  const selectOptionCategory = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));
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
  const selectCountryCode = [
    { label: 'AE', value: 'AE' },
    { label: 'UZ', value: 'UZ' },
    { label: 'TR', value: 'TR' },
  ];

  useEffect(() => {
    getCompany({ page: 0, size: 20 });
  }, []);

  return (
    <BaseForm
      name="letsTripTourCreateForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="name"
            label={'name'}
            rules={[{ required: true, message: 'name is required?' }]}
          >
            <Input name="name" type="string" placeholder="Enter a name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="releaseDate"
            label={'release date'}
            rules={[
              {
                required: false,
                message: 'releaseDate is required?',
                whitespace: true,
                type: 'object',
              },
            ]}
          >
            <S.Block>
              <CustomDatePicker />
            </S.Block>
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="categoryId"
            style={{ width: '100%' }}
            label={'category'}
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select placeholder="Select category?" options={selectOptionCategory} />
          </BaseForm.Item>
          <BaseForm.Item
            name="companyId"
            style={{ width: '100%' }}
            label={'company'}
            rules={[{ required: true, message: 'company is required!' }]}
          >
            <Select placeholder="Select company?" options={selectOptionCompany} />
          </BaseForm.Item>
          <BaseForm.Item
            name="currency"
            style={{ width: '100%' }}
            label={'currency'}
            rules={[{ required: true, message: 'currency is required!' }]}
          >
            <Select placeholder="Select currency?" options={selectOptionCurrency} />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="hourly"
            label={'hourly'}
            rules={[{ required: true, message: 'hourly is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="hourly"
              type="number"
              placeholder="Enter a hourly ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transfer"
            label={'transfer'}
            rules={[{ required: true, message: 'transfer is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="transfer"
              type="number"
              placeholder="Enter a transfer ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="countryCode"
            label={'country code'}
            rules={[{ required: true, message: 'country code is required?' }]}
          >
            <Select placeholder="Select country?" options={selectCountryCode} />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          name="pictures"
          label={'pictures'}
          rules={[{ required: true, message: 'pictures is required?' }]}
        >
          <Upload.Dragger name="pictures" multiple={true} /*action={`${BASE_URL}/file`} */>
            <Flex align="center" wrap="wrap" justify="center">
              <Typography.Text>Click or drag file to this area to upload</Typography.Text>
              <Icon fontSize="20" color="blue" name="InboxOutlined" />
            </Flex>
          </Upload.Dragger>
        </BaseForm.Item>
        <BaseForm.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <BaseForm.Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: 'Missing key' }]}
                  >
                    <Input placeholder={`Additional property key ${key + 1}`} />
                  </BaseForm.Item>
                  <BaseForm.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder={`Additional property value ${key + 1}`} />
                  </BaseForm.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <BaseForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </BaseForm.Item>
            </>
          )}
        </BaseForm.List>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
