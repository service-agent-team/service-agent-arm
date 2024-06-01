import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, InputNumber, PrimaryBtn } from '@/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IValuesForm } from '../types';
import * as S from './styled';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';

export const LestTripTransferCategoryEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { loading, transferCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { updateLetsTripTransferCategory } = useActions();
  const navigate = useNavigate();

  const onFinish = ({ startingPrice, seats, luggage }: IValuesForm) => {
    updateLetsTripTransferCategory({
      callback() {
        addNotification('successfully edit transfer category');
        navigate(ROUTES.letsTripTransferCategory);
      },
      body: {
        startingPrice,
        luggage,
        seats,
      },
      categoryId: transferCategory?.id as number,
    });
  };

  return (
    <BaseForm
      name="letsTripTransferCategoryEditForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
      initialValues={{
        startingPrice: transferCategory?.startingPrice,
        luggage: transferCategory?.luggage,
        seats: transferCategory?.seats,
      }}
    >
      <S.FormContent>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="startingPrice"
          label={'starting price'}
          rules={[{ required: true, message: 'starting price is required?' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            width={'100%'}
            type="number"
            placeholder="Enter a starting price ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="seats"
          label={'seats'}
          rules={[{ required: true, message: 'seats is required?' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            width={'100%'}
            type="number"
            placeholder="Enter a seats ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="luggage"
          label={'luggage'}
          rules={[{ required: true, message: 'luggage is required?' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            width={'100%'}
            type="number"
            placeholder="Enter a luggage ?"
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={loading.patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
