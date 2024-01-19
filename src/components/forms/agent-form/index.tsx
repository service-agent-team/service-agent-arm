import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { Input, Select } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { IRoles } from '@/store/agent/roles/types';
import { ITaeiffData } from '@/store/agent/tariff/types';
// import { IValuesForm } from './types';

interface IProps {
  userId: number | undefined;
  roles: IRoles[] | null;
  categories: ITaeiffData[] | null;
}

export const AgentForm: React.FC<IProps> = ({ userId, roles, categories }) => {
  const [form] = BaseForm.useForm();
  const { createUser } = useActions();
  const navigate = useNavigate();

  const { loading } = useTypedSelector((state) => state.users);

  const onFinish = (value: any) => {};

  const RoleSelectOptions = roles?.map((el) => ({ label: el.name, value: el.id }));
  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.tariffName,
    value: el.userTariffId,
  }));
  return (
    <BaseForm
      name="agentForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <BaseForm.Item
          name="msmsTariffId"
          label={'Agent Roles'}
          hasFeedback
          rules={[{ type: 'number', message: 'filed is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an option"
            options={RoleSelectOptions}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="msmsTariffId"
          label={'Agent Category'}
          hasFeedback
          rules={[{ type: 'number', message: 'filed is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an option"
            options={CategorySelectedOptions}
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
