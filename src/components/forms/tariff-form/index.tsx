import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { Flex, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../users-form/styled';
import { ICreateTariffValues } from './types';

export const TariffForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { createTariff } = useActions();
  const navigate = useNavigate();

  const { loading } = useTypedSelector((state) => state.tariff);

  const onFinish = (value: ICreateTariffValues) => {
    createTariff({
      price: value.price,
      minimumDuration: value.minimumDuration,
      nameRu: value.nameRu,
      nameUz: value.nameUz,
      callback: () => {
        addNotification('successfully created tariff');
        navigate('/transfer/tariff');
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
          name="nameUz"
          label={'nameUz'}
          rules={[
            { required: true, message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('nameUz') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from NameUz!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter NameUz ?" />
        </BaseForm.Item>

        <BaseForm.Item
          name="nameRu"
          label={'nameRu'}
          rules={[
            { required: true, type: 'string', message: 'filed is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('filed is required'));
                }
                if (getFieldValue('nameRu') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('error from NameUz!'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter NameRu ?" />
        </BaseForm.Item>

        <Flex justify="space-between" gap={'10px'}>
          <BaseForm.Item
            style={{ width: '50%' }}
            name="price"
            label={'price'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter price ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '50%' }}
            name="minimumDuration"
            label={'minimumDuration'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter minimumDuration ?" />
          </BaseForm.Item>
        </Flex>

        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
