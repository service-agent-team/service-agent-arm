import { addNotification } from '@/common/utils/addNotification';
import { dateFormatter } from '@/common/utils/format';
import { BaseForm, PrimaryBtn, Select, TextArea } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';

import { DatePicker, Space } from 'antd';
import React from 'react';
import { currencyOptions } from './constants';
import * as S from './styles';

export const ProductCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { addProduct } = useActions();

  const { loading } = useTypedSelector((state) => state.permission);

  const onFinish = (value: any) => {
    const opt = {
      ...value,
      startingPrice: +value.startingPrice,
      sellingPrice: +value.sellingPrice,
      discountPrice: +value.discountPrice,
      categoryId: 6,
      companyId: 5,
      releaseDate: dateFormatter(value.releaseDate.$d),
      attributes: {
        msmsTariffId: String(value.msmsTariffId),
      },
    };
    addProduct({
      body: opt,
      callback: () => {
        addNotification('Product successfully created');
        history.back();
      },
    });
  };

  return (
    <BaseForm
      name="ProductForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Space direction="vertical" style={{ width: 500 }}>
          <BaseForm.Item
            name="name"
            label={'Product name'}
            rules={[
              { required: true, type: 'string', message: 'filed is required' },
              {
                type: 'string',
                message: 'name is string',
              },
            ]}
          >
            <S.Text placeholder="Enter permissionName ?" />
          </BaseForm.Item>

          <BaseForm.Item
            name="msmsTariffId"
            label={'Msms tariff'}
            hasFeedback
            rules={[{ required: true, type: 'number', message: 'filed is required' }]}
          >
            <Select
              style={{ height: 50 }}
              placeholder="Select an option"
              options={[{ label: 'tariff', value: 611 }]}
            />
          </BaseForm.Item>

          <BaseForm.Item
            name="currency"
            label={'currency'}
            hasFeedback
            rules={[{ required: true, type: 'string', message: 'filed is required' }]}
          >
            <Select
              style={{ height: 50 }}
              size="large"
              placeholder="Select an option"
              options={currencyOptions}
            />
          </BaseForm.Item>

          <BaseForm.Item
            name="startingPrice"
            label={'Product Start price'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <S.Text placeholder="Enter price" />
          </BaseForm.Item>

          <BaseForm.Item
            name="sellingPrice"
            label={'Product Selling price'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <S.Text placeholder="Enter price" />
          </BaseForm.Item>
        </Space>
        <Space direction="vertical" style={{ width: 500 }}>
          <BaseForm.Item
            name="discountPrice"
            label={'Product Discounting price'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <S.Text placeholder="Enter price" />
          </BaseForm.Item>

          <BaseForm.Item
            name="description"
            label={'Product description'}
            rules={[{ required: true, message: 'permissionDescription is required?' }]}
          >
            <TextArea rows={4} placeholder="Enter short description" />
          </BaseForm.Item>

          <BaseForm.Item label="Release Date" name="releaseDate">
            <DatePicker style={{ height: 50 }} />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={loading.post} style={{ height: 50 }}>
            create
          </PrimaryBtn>
        </Space>
      </S.FormContent>
    </BaseForm>
  );
};
