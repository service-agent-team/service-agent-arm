import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, PrimaryBtn } from '@/components';
import { Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const {
    getAllLetsTripTransferCategory,
    updateLetsTripTransfer,
    updateI18LetsTripTransfer,
    getOneLetsTripTransfer,
  } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  form.setFieldValue('nameEn', transfer?.name?.en);
  form.setFieldValue('nameRu', transfer?.name?.ru);
  form.setFieldValue('nameUz', transfer?.name?.uz);
  form.setFieldValue('carCategoryId', transfer?.category?.id);
  form.setFieldValue('seats', transfer?.seats);
  form.setFieldValue('luggage', transfer?.luggage);
  form.setFieldValue('manufactureDate', dayjs(transfer?.manufactureDate));

  const onFinish = ({
    nameEn,
    nameRu,
    nameUz,
    carCategoryId,
    seats,
    luggage,
    manufactureDate,
  }: IValuesForm) => {
    if (
      nameEn !== transfer?.name?.en ||
      nameRu !== transfer?.name?.ru ||
      nameUz !== transfer?.name?.uz
    ) {
      updateI18LetsTripTransfer({
        callback() {
          navigate(ROUTES.letsTripTransfer);
        },
        body: { en: nameEn, ru: nameRu, uz: nameUz },
        id: transfer?.name.id as number,
      });
    }
    updateLetsTripTransfer({
      callback() {
        addNotification('successfully edited transfer');
        navigate(`${ROUTES.letsTripTransferCategory}/${transfer?.id}`);
      },
      body: {
        carCategoryId,
        luggage,
        seats,
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
    getAllLetsTripTransferCategory({ page: 0, size: 20, deleted: false });

    getOneLetsTripTransfer({
      callback() {},
      carId: Number(id),
    });
  }, []);

  return (
    <BaseForm
      name="letsTripTransferEditForm"
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
          </Col>
        </Row>
        <PrimaryBtn htmlType="submit" loading={loading.patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
