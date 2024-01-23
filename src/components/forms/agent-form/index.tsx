import { BaseForm, PrimaryBtn } from '@/components';
import { useTypedSelector } from '@/libs';
import { IRoles } from '@/store/agent/roles/types';
import { ITaeiffData } from '@/store/agent/tariff/types';
import { ICompany } from '@/store/company/types';
import { Select } from 'antd';
import React from 'react';
import * as S from './styles';
// import { IValuesForm } from './types';

interface IProps {
  userId: number | undefined;
  roles: IRoles[] | null;
  categories: ITaeiffData[] | null;
  companies: ICompany[] | null;
}

export const AgentForm: React.FC<IProps> = ({ roles, categories, companies }) => {
  const [form] = BaseForm.useForm();

  const { loading } = useTypedSelector((state) => state.users);

  const onFinish = (_: any) => {};

  const RoleSelectOptions = roles?.map((el) => ({ label: el.name, value: el.id }));
  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.tariffName,
    value: el.userTariffId,
  }));
  const CompanySelectOption = companies?.map((el) => ({ label: el.name, value: el.id }));
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
        <BaseForm.Item
          name="msmsTariffId"
          label={'Agent Company'}
          hasFeedback
          rules={[{ type: 'number', message: 'filed is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an option"
            options={CompanySelectOption}
          />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
