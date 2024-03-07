import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, SimpleButton } from '@/components';
import { ICompany } from '@/store/service-agent/company/types';
import { IRoles } from '@/store/service-agent/roles/types';
import { ITaeiffData } from '@/store/service-agent/tariff/types';
import { Flex, Select } from 'antd';
import React from 'react';
import * as S from './styles';
import { IParam } from './types';

// import { IValuesForm } from './types';

interface IProps {
  userId: number;
  roles: IRoles[] | null;
  categories: ITaeiffData[] | null;
  companies: ICompany[] | null;
}

export const AgentForm: React.FC<IProps> = ({ userId, roles, categories, companies }) => {
  const [form] = BaseForm.useForm();
  const { acceptAgnet, rejectAgnet, addTariffPermission, createAgentRoles } = useActions();

  const { loading } = useTypedSelector((state) => state.users);

  const onFinish = (value: IParam) => {
    acceptAgnet({
      userId: Number(userId),
      companyId: value.companyId,
      currency: value.currency,
      callback() {
        addNotification('Agent tasdiqlandi');
        history.back();
      },
    });
    if (value.categoryId) {
      addTariffPermission({
        callback() {},
        permissionId: 1,
        userTariffId: value.categoryId,
        userId,
      });
    }
    if (value.roleId) {
      createAgentRoles({ callback() {}, roleId: value.roleId, userId });
    }
  };

  const handleReject = () => {
    rejectAgnet({
      callback() {
        addNotification('Agent rad etildi');
        history.back();
      },
      userId: Number(userId),
    });
  };

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
          name="roleId"
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
          name="categoryId"
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
          name="companyId"
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
        <BaseForm.Item
          name="currency"
          label={'Agent currency'}
          hasFeedback
          rules={[{ type: 'string', message: 'filed is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an option"
            options={[
              { label: 'UZS', value: 'UZS' },
              { label: 'USD', value: 'USD' },
            ]}
          />
        </BaseForm.Item>
        <Flex gap="large" justify="space-around">
          <SimpleButton click={handleReject} color="--negative">
            Rad etish
          </SimpleButton>
          <PrimaryBtn htmlType="submit" loading={loading.post}>
            Tasdiqlash
          </PrimaryBtn>
        </Flex>
      </S.FormContent>
    </BaseForm>
  );
};
