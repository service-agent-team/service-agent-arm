import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, SimpleButton } from '@/components';
import { ICompany } from '@/store/service-agent/company/types';
import { IRoles } from '@/store/service-agent/roles/types';
import { ITaeiffData } from '@/store/service-agent/tariff/types';
import { Flex, Select } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styles';
import { IParam } from './types';

// import { IValuesForm } from './types';

interface IProps {
  userId: number;
  roles: IRoles[] | null;
  categories: ITaeiffData[] | null;
  companies: ICompany[] | null;
  contractStatus: string | undefined;
}

export const AgentForm: React.FC<IProps> = ({
  userId,
  roles,
  categories,
  companies,
  contractStatus,
}) => {
  const [form] = BaseForm.useForm();
  const { acceptAgnet, rejectAgnet, addTariffPermission, createAgentRoles, getPermisions } =
    useActions();

  const { loading } = useTypedSelector((state) => state.users);
  const { permissions } = useTypedSelector((state) => state.permission);

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

  useEffect(() => {
    getPermisions({ callback() {} });
  }, []);

  const RoleSelectOptions = roles?.map((el) => ({ label: el.name, value: el.id }));
  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.tariffName,
    value: el.userTariffId,
  }));
  const CompanySelectOption = companies?.map((el) => ({ label: el.name, value: el.id }));
  const UserPermissionSelectOption =
    permissions?.map((el) => ({ label: el.permission_name, value: el.permission_id })) || [];
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
            placeholder="Select an agent role option"
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
            placeholder="Select an category option"
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
            placeholder="Select an company option"
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
            placeholder="Select an currency option"
            options={[
              { label: 'UZS', value: 'UZS' },
              { label: 'USD', value: 'USD' },
            ]}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="userPermission"
          label={'User permission'}
          hasFeedback
          rules={[{ type: 'number', message: 'filed is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an user permission option"
            options={UserPermissionSelectOption}
          />
        </BaseForm.Item>
        {contractStatus !== 'success' && (
          <Flex gap="large" justify="space-around">
            <SimpleButton click={handleReject} color="--negative">
              Rad etish
            </SimpleButton>
            <PrimaryBtn htmlType="submit" loading={loading.post}>
              Tasdiqlash
            </PrimaryBtn>
          </Flex>
        )}
        {contractStatus === 'success' && (
          <PrimaryBtn htmlType="submit" loading={loading.post} color="warning">
            Update
          </PrimaryBtn>
        )}
      </S.FormContent>
    </BaseForm>
  );
};
