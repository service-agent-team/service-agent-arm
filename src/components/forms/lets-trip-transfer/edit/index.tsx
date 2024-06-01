import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn } from '@/components';
import { DatePicker, Flex, GetProp, Image, Input, Select, Upload, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IValuesForm } from '../types';
import * as S from './styled';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { dateFormatDayJs } from '@/common/utils/format';
import dayjs from 'dayjs';

export const LestTripTransferEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { transferCategories } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { loading, transfer } = useTypedSelector((state) => state.letsTripTransfer);
  const { getAllLetsTripTransferCategory, updateLetsTripTransfer } = useActions();
  const navigate = useNavigate();

  const onFinish = ({ carCategoryId, pricePerKM, hourlyPrice, manufactureDate }: IValuesForm) => {
    updateLetsTripTransfer({
      callback() {
        addNotification('successfully edited transfer');
        navigate(ROUTES.letsTripTransfer);
      },
      body: {
        carCategoryId,
        hourlyPrice,
        pricePerKM,
        manufactureDate: dateFormatDayJs(manufactureDate),
      },
      carId: transfer?.id as number,
    });
  };

  const selectOptionTransferCategory = transferCategories?.map((category) => ({
    label: category.name.en,
    value: category.id,
  }));

  useEffect(() => {
    getAllLetsTripTransferCategory({ page: 0, size: 20, deleted: false, callback() {} });
  }, []);

  return (
    <BaseForm
      name="letsTripTransferEditForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
      initialValues={{
        carCategoryId: transfer?.category.id,
        hourlyPrice: transfer?.hourlyPrice,
        pricePerKM: transfer?.pricePerKM,
        manufactureDate: dayjs(transfer?.manufactureDate),
      }}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="carCategoryId"
            style={{ width: '100%' }}
            label={'transfer category'}
            rules={[{ required: true, message: 'transfer category is required!' }]}
          >
            <Select
              placeholder="Select transfer category?"
              options={selectOptionTransferCategory}
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="manufactureDate"
            label={'manufacture date'}
            rules={[{ required: true, message: 'manufacture date is required ?' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format={'YYYY-MM-DD'}
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="hourlyPrice"
            label={'hourly price'}
            rules={[{ required: true, message: 'hourly price is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a hourly price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="pricePerKM"
            label={'price per KM'}
            rules={[{ required: true, message: 'price per KM is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a price per KM ?"
            />
          </BaseForm.Item>
        </Flex>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
