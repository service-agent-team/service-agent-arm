import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, SimpleButton } from '@/components';
import { ICompany } from '@/store/service-agent/company/types';
import { IRolesV2 } from '@/store/service-agent/roles/types';
import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import { Flex, Select, Switch } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styles';
import { IParam } from './types';
import { RolePermission } from '@/store/service-agent/contract/contract.interface';
import { useParams } from 'react-router-dom';

interface IProps {
  userId: number;
  roles: IRolesV2[] | null;
  categories: IAgentTariffV2[] | null;
  companies: ICompany[] | null;
  contractStatus: string | undefined;
  userPermissions: RolePermission[] | undefined;
}

export const AgentForm: React.FC<IProps> = ({
  userId,
  roles,
  categories,
  companies,
  contractStatus,
  userPermissions,
}) => {
  const [form] = BaseForm.useForm();
  const {
    acceptAgnet,
    rejectAgnet,
    addTariffPermission,
    // createAgentRoles,
    getAgentPermissions,
    getAllAgentProject,
    agentAddRolePermission,
  } = useActions();

  const { loading } = useTypedSelector((state) => state.users);
  const { permissions } = useTypedSelector((state) => state.agentPermission);
  const { agentProjects } = useTypedSelector((state) => state.agentProject);
  const { agent } = useTypedSelector((state) => state.agent);
  const { id } = useParams();

  const onFinish = (value: IParam) => {
    if (contractStatus !== 'SUCCESS') {
      acceptAgnet({
        userId: Number(userId),
        companyId: value.companyId,
        currency: value.currency,
        multipe_account: value.multipe_account,
        callback() {
          addNotification('Agent tasdiqlandi');
          history.back();
        },
      });
    }
    if (value.categoryId) {
      addTariffPermission({
        callback() {
          addNotification('Agentga tarif ruxsat berildi');
        },
        permissionId: 1,
        userTariffId: value.categoryId,
        userId,
      });
    }
    // if (value.roleId) {
    //   createAgentRoles({ callback() {}, roleId: value.roleId, userId });
    // }
    if (value.roleId && value.permissionId) {
      agentAddRolePermission({
        callback() {
          addNotification('add role permission');
        },
        userId: Number(id),
        roleId: value.roleId,
        permissionId: value.permissionId,
      });
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
    getAgentPermissions({ callback() {} });
    getAllAgentProject({ callback() {}, pageNumber: 0, pageSize: 20 });
  }, []);

  const RoleSelectOptions = roles?.map((el) => ({ label: el.name, value: el.roleId }));
  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.name,
    value: el.tariffId,
  }));
  const CompanySelectOption = companies?.map((el) => ({ label: el.name, value: el.id }));
  const UserPermissionSelectOption =
    permissions?.map((el) => ({ label: el.name, value: el.permissionId })) || [];
  const ProjectSelectOption = agentProjects?.map((el) => {
    if (userPermissions) {
      const isChecked = agent?.userProjectPermissions?.some(
        (projectPermission) => projectPermission.project?.projectId === el.projectId,
      );
      if (isChecked)
        return {
          label: el.name,
          value: el.projectId,
          disabled: isChecked,
        };
    }
    return {
      label: el.name,
      value: el.projectId,
    };
  });

  return (
    <BaseForm
      name="agentForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
      // initialValues={{
      //   roleId: (roles?.length && roles[0].roleId) || null,
      //   permissionId:
      //     (userPermissions?.length &&
      //       userPermissions[0].permissions?.length &&
      //       userPermissions[0].permissions[0].permissionId) ||
      //     null,
      //   categoryId: (categories?.length && categories[0].tariffId) || null,
      // }}
    >
      <S.FormContent>
        <BaseForm.Item
          name="roleId"
          label={'Agent Roles'}
          hasFeedback
          rules={[{ type: 'number', message: 'field is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an agent role option"
            options={RoleSelectOptions}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="permissionId"
          label={'User permission'}
          hasFeedback
          rules={[{ type: 'number', message: 'field is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select an user permission option"
            options={UserPermissionSelectOption}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="categoryId"
          label={'Agent Category'}
          hasFeedback
          rules={[{ type: 'number', message: 'field is required' }]}
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
          rules={[{ type: 'number', message: 'field is required' }]}
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
          rules={[{ type: 'string', message: 'field is required' }]}
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
          name="projectId"
          label={'Project'}
          hasFeedback
          rules={[{ type: 'array', message: 'field is required' }]}
        >
          <Select
            mode="multiple"
            style={{ height: 50 }}
            placeholder="Select an project option"
            options={ProjectSelectOption}
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="multipe_account"
          label={'Multiple Account Is Active'}
          hasFeedback
          rules={[{ type: 'boolean', message: 'field is required' }]}
        >
          <Switch defaultValue={false} />
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
