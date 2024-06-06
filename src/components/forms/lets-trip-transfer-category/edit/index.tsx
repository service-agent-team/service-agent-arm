import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, InputNumber, PrimaryBtn } from '@/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IValuesForm } from '../types';
import * as S from './styled';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { Flex, Input } from 'antd';

export const LestTripTransferCategoryEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { loading, transferCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { updateLetsTripTransferCategory, updateI18LetsTripTransfer } = useActions();
  const navigate = useNavigate();

  const onFinish = ({ nameEn, nameRu, nameUz, startingPrice, seats, luggage }: IValuesForm) => {
    if (
      nameEn !== transferCategory?.name.en ||
      nameRu !== transferCategory?.name.ru ||
      nameUz !== transferCategory?.name.uz
    ) {
      updateI18LetsTripTransfer({
        callback() {
          navigate(ROUTES.letsTripTransfer);
        },
        body: { en: nameEn, ru: nameRu, uz: nameUz },
        id: transferCategory?.name.id as number,
      });
    }

    updateLetsTripTransferCategory({
      callback() {
        addNotification('successfully edit transfer category');
        navigate(ROUTES.letsTripTransferCategory);
      },
      body: {
        startingPrice: startingPrice * 100,
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
        nameEn: transferCategory?.name.en,
        nameRu: transferCategory?.name.ru,
        nameUz: transferCategory?.name.uz,
        startingPrice: transferCategory?.startingPrice && transferCategory?.startingPrice / 100,
        luggage: transferCategory?.luggage,
        seats: transferCategory?.seats,
      }}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameEn"
            label={'name english'}
            rules={[{ required: true, message: 'name english is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a english name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name russian'}
            rules={[{ required: true, message: 'name russian is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a russian name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameUz"
            label={'name uzbek'}
            rules={[{ required: true, message: 'name uzbek is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a uzbek name ?" />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
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
        </Flex>
        <PrimaryBtn htmlType="submit" loading={loading.patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
