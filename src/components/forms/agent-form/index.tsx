import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Icon, PrimaryBtn, SimpleButton } from '@/components';
import { ICompany } from '@/store/service-agent/company/types';
import { IRolesV2 } from '@/store/service-agent/roles/types';
import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import { Button, Flex, Select, Switch, TreeSelect } from 'antd';
import React, { useEffect } from 'react';
import * as S from './styles';
import { IParam, IProjectPermissions } from './types';
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
    getAgentPermissions,
    getAllAgentProject,
    agentAddRole,
    agentAddRolePermission,
    agentRemoveRole,
    agentRemoveRolePermission,
    setAgentRolePermissions,
    agentAddProjectToUser,
    agentAddPermissionToUserProject,
    setAgentProjectPermissions,
    agentRemoveProject,
  } = useActions();

  const { permissions } = useTypedSelector((state) => state.agentPermission);
  const { agentProjects } = useTypedSelector((state) => state.agentProject);
  const { agent, loading } = useTypedSelector((state) => state.agent);
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
    if (value.rolePerm) {
      const [roleId, permissionId] = value.rolePerm.split('-');
      const defaultRoleId = agent?.userRolePermissions[0]?.role?.roleId;

      if (defaultRoleId) {
        agentRemoveRolePermission({
          callback() {
            agentRemoveRole({
              callback() {
                setAgentRolePermissions([]);
                agentAddRole({
                  callback() {
                    agentAddRolePermission({
                      callback() {
                        addNotification('add role permission to agent');
                        const role = roles?.find((role) => role.roleId === +roleId);
                        const permission = rolePerms?.find(
                          (perm) => perm.permissionId === +permissionId,
                        );
                        setAgentRolePermissions([{ role, permissions: [permission] }]);
                      },
                      userId: Number(id),
                      roleId: +roleId,
                      permissionId: +permissionId,
                    });
                  },
                  userId: Number(id),
                  roleId: +roleId,
                });
              },
              userId: Number(id),
              roleId: +defaultRoleId,
            });
          },
          userId: Number(id),
          roleId: +defaultRoleId,
          permissionId: +permissionId,
        });
      } else {
        agentAddRole({
          callback() {
            agentAddRolePermission({
              callback() {
                addNotification('add role permission to agent');
                const role = roles?.find((role) => role.roleId === +roleId);
                const permission = rolePerms?.find((perm) => perm.permissionId === +permissionId);
                setAgentRolePermissions([{ role, permissions: [permission] }]);
              },
              userId: Number(id),
              roleId: +roleId,
              permissionId: +permissionId,
            });
          },
          userId: Number(id),
          roleId: +roleId,
        });
      }
    }
    if (value.projectPerm) {
      value.projectPerm.map((el: string) => {
        const [projectId, permissionId] = el.split('-');

        const found = agent?.userProjectPermissions?.find(
          (p) => p.project?.projectId === +projectId,
        );
        if (!found && agent && agentProjects) {
          agentAddProjectToUser({
            callback() {
              setAgentProjectPermissions([
                ...agent.userProjectPermissions,
                { project: agentProjects.find((p) => p.projectId === +projectId), permissions: [] },
              ]);
              agentAddPermissionToUserProject({
                callback() {
                  addNotification('successfully add project permission');
                },
                userId: Number(id),
                projectId: +projectId,
                permissionId: +permissionId,
              });
            },
            userId: Number(id),
            projectId: +projectId,
          });
        } else {
          agentAddPermissionToUserProject({
            callback() {
              addNotification('successfully add project permission');
            },
            userId: Number(id),
            projectId: +projectId,
            permissionId: +permissionId,
          });
        }
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

  const handleRoleRemove = () => {
    const defaultRoleId = agent?.userRolePermissions[0]?.role?.roleId;

    if (defaultRoleId) {
      agentRemoveRole({
        callback() {
          addNotification('successfully remove role permission');
          setAgentRolePermissions([]);
        },
        userId: Number(id),
        roleId: defaultRoleId,
      });
    }
  };

  const handleProjectRemove = () => {
    if (agent) {
      agent.userProjectPermissions.map((p) => {
        if (p.project?.projectId)
          agentRemoveProject({
            callback() {
              addNotification('successfully remove project permission');
              setAgentProjectPermissions([]);
            },
            userId: Number(id),
            projectId: p.project?.projectId,
          });
      });
    }
  };

  useEffect(() => {
    getAgentPermissions({ callback() {} });
    getAllAgentProject({ callback() {}, pageNumber: 0, pageSize: 20 });
  }, []);

  const projectPerms = permissions?.filter((el) => el.type === 'FOR_USER_PROJECT');
  const rolePerms = permissions?.filter((el) => el.type === 'FOR_USER_ROLE');

  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.name,
    value: el.tariffId,
  }));
  const CompanySelectOption = companies?.map((el) => ({ label: el.name, value: el.id }));
  const defaultRolePerms = agent?.userRolePermissions.flatMap((el) => {
    return el.permissions.map((per) => {
      const found = rolePerms?.find((role) => role.permissionId === per.permissionId);
      if (found) return `${el.role.roleId}-${per.permissionId}`;
    });
  });

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
          name="rolePerm"
          label={'Agent role permission'}
          hasFeedback
          rules={[{ type: 'string', message: 'field is required' }]}
        >
          <TreeSelect
            multiple={false}
            treeCheckable={false}
            defaultValue={agent?.userRolePermissions.length ? defaultRolePerms : []}
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            autoClearSearchValue={false}
            suffixIcon={
              agent?.userRolePermissions.length ? (
                <Icon
                  name="DeleteOutlined"
                  type="primary"
                  color="red"
                  onClick={() => handleRoleRemove()}
                />
              ) : null
            }
            treeData={roles?.map((el) => {
              return {
                key: el?.roleId,
                label: el?.name,
                value: el?.roleId,
                children: rolePerms?.map((item) => {
                  return {
                    key: `${el.roleId}-${item.permissionId}`,
                    label: `${item.name}`,
                    value: `${el.roleId}-${item.permissionId}`,
                  };
                }),
              };
            })}
            placeholder="Role permission"
          />
        </BaseForm.Item>
        <BaseForm.Item
          name="categoryId"
          label={'Agent tariff category'}
          hasFeedback
          rules={[{ type: 'number', message: 'field is required' }]}
        >
          <Select
            style={{ height: 50 }}
            placeholder="Select a tariff category option"
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
            placeholder="Select a company option"
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
            placeholder="Select a currency option"
            options={[
              { label: 'UZS', value: 'UZS' },
              { label: 'USD', value: 'USD' },
            ]}
          />
        </BaseForm.Item>
        <BaseForm.Item name="projectPerm" label="Projects permissions" rules={[{ type: 'array' }]}>
          <TreeSelect
            treeDefaultExpandAll
            multiple={true}
            treeCheckable={true}
            defaultValue={agent?.userProjectPermissions?.flatMap((el) => {
              return el?.permissions?.map((per) => {
                const found = projectPerms?.find(
                  (item) => item?.permissionId === per?.permissionId,
                );
                if (found) return `${el.project?.projectId}-${per.permissionId}`;
              });
            })}
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            suffixIcon={
              <Icon name="DeleteOutlined" color="red" onClick={() => handleProjectRemove()} />
            }
            treeData={agentProjects?.map((el) => {
              return {
                key: el.projectId,
                label: el?.name,
                value: el?.projectId,
                children: projectPerms?.map((item) => {
                  return {
                    key: `${el.projectId}-${item.permissionId}`,
                    label: item.name,
                    value: `${el.projectId}-${item.permissionId}`,
                  };
                }),
              };
            })}
            placeholder="Project permissions"
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
        {contractStatus !== 'SUCCESS' && (
          <S.CustomFlex gap="large" justify="space-around">
            <SimpleButton click={handleReject} color="--negative">
              Rad etish
            </SimpleButton>
            <PrimaryBtn htmlType="submit" loading={loading.post}>
              Tasdiqlash
            </PrimaryBtn>
          </S.CustomFlex>
        )}
        {contractStatus === 'SUCCESS' && (
          <PrimaryBtn htmlType="submit" loading={loading.post} color="warning">
            Update
          </PrimaryBtn>
        )}
      </S.FormContent>
    </BaseForm>
  );
};
