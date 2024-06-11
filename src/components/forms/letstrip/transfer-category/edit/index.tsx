import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, InputNumber, PrimaryBtn } from '@/components';
import { ROUTES } from '@/constants';
import { Col, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IValuesForm } from '../types';
import * as S from './styled';

export const LestTripTransferCategoryEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { loading, transferCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const {
    updateLetsTripTransferCategory,
    updateI18LetsTripTransfer,
    getOneLetsTripTransferCategory,
  } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  form.setFieldValue('nameEn', transferCategory?.name.en);
  form.setFieldValue('nameRu', transferCategory?.name.ru);
  form.setFieldValue('nameUz', transferCategory?.name.uz);
  form.setFieldValue('startingPrice', Number(transferCategory?.startingPrice) / 100);
  form.setFieldValue('seats', transferCategory?.seats);
  form.setFieldValue('luggage', transferCategory?.luggage);
  form.setFieldValue('priority', transferCategory?.priority);

  const onFinish = ({
    nameEn,
    nameRu,
    nameUz,
    startingPrice,
    seats,
    luggage,
    priority,
  }: IValuesForm) => {
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
        priority,
      },
      categoryId: transferCategory?.id as number,
    });
  };

  useEffect(() => {
    getOneLetsTripTransferCategory({
      callback() {},
      categoryId: Number(id),
    });
  }, [id]);

  return (
    <BaseForm
      name="letsTripTransferCategoryEditForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Row gutter={12}>
          <Col span={8}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="nameEn"
              label={'name english'}
              rules={[{ required: true, message: 'name english is required?', type: 'string' }]}
            >
              <Input type="string" placeholder="Enter a english name ?" />
            </BaseForm.Item>
          </Col>
          <Col span={8}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="nameRu"
              label={'name russian'}
              rules={[{ required: true, message: 'name russian is required?', type: 'string' }]}
            >
              <Input type="string" placeholder="Enter a russian name ?" />
            </BaseForm.Item>
          </Col>
          <Col span={8}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="nameUz"
              label={'name uzbek'}
              rules={[{ required: true, message: 'name uzbek is required?', type: 'string' }]}
            >
              <Input type="string" placeholder="Enter a uzbek name ?" />
            </BaseForm.Item>
          </Col>
          <Col span={6}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="startingPrice"
              label={'starting price ($)'}
              rules={[{ required: true, message: 'starting price is required?' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                width={'100%'}
                type="number"
                placeholder="Enter a starting price ?"
                prefix="$"
              />
            </BaseForm.Item>
          </Col>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="priority"
              label={'priority'}
              rules={[{ required: true, message: 'priority is required?' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                width={'100%'}
                type="number"
                placeholder="Enter a priority ?"
              />
            </BaseForm.Item>
          </Col>
        </Row>
        <PrimaryBtn htmlType="submit" loading={loading.patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
