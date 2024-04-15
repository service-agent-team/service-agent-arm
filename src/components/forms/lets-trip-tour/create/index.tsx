import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { Flex, Input, Select, Typography, Upload } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styled';
import { IValuesForm } from '../types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { companies } = useTypedSelector((state) => state.company);
  const { loading, categories } = useTypedSelector((state) => state.letsTripTour);
  const { getCompany, createLetsTripTour, getAllCategory } = useActions();
  const navigate = useNavigate();

  const onFinish = ({
    nameUz,
    nameRu,
    nameEn,
    categoryId,
    companyId,
    descriptionEn,
    descriptionRu,
    descriptionUz,
    countryCode,
    currency,
    longitude,
    latitude,
    upTo2,
    upTo6,
    upTo10,
    upTo20,
    attributes,
  }: IValuesForm) => {
    createLetsTripTour({
      callback() {
        addNotification('successfully added tour');
        navigate(ROUTES.letsTripTour);
      },
      names: { uz: nameEn, en: nameUz, ru: nameRu },
      categoryId,
      companyId,
      descriptions: { uz: descriptionEn, en: descriptionUz, ru: descriptionRu },
      upTo2,
      upTo6,
      upTo10,
      upTo20,
      pictures: ['image1.png', 'image2.png'],
      currency,
      countryCode,
      longitude,
      latitude,
      attributes,
    });
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

  useEffect(() => {
    getCompany({ page: 0, size: 20 });
    getAllCategory({ callback() {} });
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
            name="nameUz"
            label={'name uz'}
            rules={[
              { required: true, message: 'name uz is required?' },
              {
                type: 'string',
                message: 'Enter name uz name ?',
              },
            ]}
          >
            <Input name="nameUz" type="string" placeholder="Enter a uz name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameEn"
            label={'name en'}
            rules={[
              { required: true, message: 'name en is required?' },
              {
                type: 'string',
                message: 'Enter en name ?',
              },
            ]}
          >
            <Input name="nameEn" type="string" placeholder="Enter a en name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name ru'}
            rules={[
              { required: true, message: 'name ru is required?' },
              {
                type: 'string',
                message: 'Enter ru name ?',
              },
            ]}
          >
            <Input name="nameRu" type="string" placeholder="Enter a ru name ? " />
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
            name="longitude"
            label={'longitude'}
            rules={[{ required: true, message: 'longitude is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="longitude"
              type="number"
              placeholder="Enter a longitude ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="latitude"
            label={'latitude'}
            rules={[{ required: true, message: 'latitude is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="latitude"
              type="number"
              placeholder="Enter a latitude ?"
            />
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
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo2"
            label={'along with 2 person'}
            rules={[{ required: true, message: 'upTo2 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo2"
              type="number"
              placeholder="Enter along 2 person price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo6"
            label={'along with 6 person'}
            rules={[{ required: true, message: 'upTo6 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo6"
              type="number"
              placeholder="Enter along 6 person price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo10"
            label={'along with 10 person'}
            rules={[{ required: true, message: 'upTo10 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo10"
              type="number"
              placeholder="Enter along 10 person price ? "
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo20"
            label={'along with 20 person'}
            rules={[{ required: true, message: 'upTo20 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo20"
              type="number"
              placeholder="Enter along 20 person price ? "
            />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionUz"
          label={'description uz'}
          rules={[
            { required: true, message: 'description uz is required?' },
            {
              type: 'string',
              message: 'Enter uz description ?',
            },
          ]}
        >
          <TextArea name="descriptionUz" placeholder="Enter a uz description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionEn"
          label={'description en'}
          rules={[
            { required: true, message: 'description en is required?' },
            {
              type: 'string',
              message: 'Enter en description ?',
            },
          ]}
        >
          <TextArea name="descriptionEn" placeholder="Enter a en description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionRu"
          label={'description ru'}
          rules={[
            { required: true, message: 'description ru is required?' },
            {
              type: 'string',
              message: 'Enter ru description ?',
            },
          ]}
        >
          <TextArea name="descriptionRu" placeholder="Enter a ru description ? " />
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
          <Upload.Dragger name="pictures" multiple={true} /*action={`${BASE_URL}/file`} */>
            <Flex align="center" wrap="wrap" justify="center">
              <Typography.Text>Click or drag file to this area to upload</Typography.Text>
              <Icon fontSize="20" color="blue" name="InboxOutlined" />
            </Flex>
          </Upload.Dragger>
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
