import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Icon, PrimaryBtn, SimpleButton, VideoCard } from '@/components';
import { ICompany } from '@/store/service-agent/company/types';
import { IRolesV2 } from '@/store/service-agent/roles/types';
import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import { Col, Collapse, Input, List, Row, Select, Switch, Tag, TreeSelect, Typography } from 'antd';
import React, { useEffect } from 'react';
import { IParam } from './types';
import { IUserDataV2, RolePermission } from '@/store/service-agent/contract/contract.interface';
import { dateFormatDayJs } from '@/common/utils/format';
import { Card } from '@/components/common/card';

interface IProps {
  userId: number;
  roles: IRolesV2[] | null;
  categories: IAgentTariffV2[] | null;
  companies: ICompany[] | null;
  contractStatus: string | undefined;
  userPermissions: RolePermission[] | undefined;
  data: IUserDataV2 | null;
}

export const AgentForm: React.FC<IProps> = ({
  userId,
  roles,
  categories,
  companies,
  contractStatus,
  data,
}) => {
  const [form] = BaseForm.useForm();
  const {
    acceptAgent,
    rejectAgent,
    getAgentPermissions,
    getAllAgentProject,
    updateCanPaymentAgent,
    setAgentCanPayment,
    updateAgentRolePermission,
    updateAgentTariffPermission,
    updateAgentProjectPermission,
  } = useActions();

  const { permissions } = useTypedSelector((state) => state.agentPermission);
  const { agentProjects } = useTypedSelector((state) => state.agentProject);
  const { tariffs } = useTypedSelector((state) => state.agentTariff);
  const { agent, loading } = useTypedSelector((state) => state.agent);

  const onFinish = (value: IParam) => {
    if (contractStatus === 'VIEW') {
      acceptAgent({
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
    // const rolePermissions = value.rolePerm.map((rolePerm) => {
    //   return {
    //     userId: Number(userId),
    //     roleId: rolePerm.roleId,
    //     permissionIds: rolePerm.rolePermissions.reduce((acc: number[], perm) => {
    //       if (perm.rolePermIsActive) {
    //         acc.push(perm.rolePermId);
    //       }

    //       return acc;
    //     }, []),
    //   };
    // });
    // const tariffPermissions = value.tariffPerm.map((tariffPerm) => {
    //   return {
    //     userId: Number(userId),
    //     tariffId: tariffPerm.tariffId,
    //     permissionIds: tariffPerm.tariffPermissions.reduce((acc: number[], perm) => {
    //       if (perm.tariffPermIsActive) {
    //         acc.push(perm.tariffPermId);
    //       }

    //       return acc;
    //     }, []),
    //   };
    // });
    // const projectPermissions = value.projectPerm.map((projPerm) => {
    //   return {
    //     userId: Number(userId),
    //     projectId: projPerm.projectId,
    //     permissionIds: projPerm.projectPermissions.reduce((acc: number[], perm) => {
    //       if (perm.projPermIsActive) {
    //         acc.push(perm.projPermId);
    //       }

    //       return acc;
    //     }, []),
    //   };
    // });

    // rolePermissions.forEach(({ userId, roleId, permissionIds }) => {
    //   updateAgentRolePermission({
    //     callback() {
    //       addNotification('successfully updated role permissions');
    //     },
    //     userId,
    //     roleId,
    //     permissionIds,
    //   });
    // });

    // tariffPermissions.forEach(({ userId, tariffId, permissionIds }) => {
    //   updateAgentTariffPermission({
    //     callback() {
    //       addNotification('successfully updated tariff permissions');
    //     },
    //     userId,
    //     tariffId,
    //     permissionIds,
    //   });
    // });

    // projectPermissions.forEach(({ userId, projectId, permissionIds }) => {
    //   updateAgentProjectPermission({
    //     callback() {
    //       addNotification('successfully updated project permissions');
    //     },
    //     userId,
    //     projectId,
    //     permissionIds,
    //   });
    // });
  };

  const handleReject = () => {
    rejectAgent({
      callback() {
        addNotification('Agent rad etildi');
        history.back();
      },
      userId: Number(userId),
    });
  };

  const projectPerms = permissions?.filter((el) => el.type === 'FOR_USER_PROJECT');
  const rolePerms = permissions?.filter((el) => el.type === 'FOR_USER_ROLE');
  const tariffPerms = permissions?.filter((el) => el.type === 'FOR_USER_TARIFF');

  const CategorySelectedOptions = categories?.map((el) => ({
    label: el.name,
    value: el.tariffId,
  }));
  const CompanySelectOption = companies?.map((el) => ({ label: el.name, value: el.id }));

  useEffect(() => {
    form.setFieldsValue({
      rolePerm: roles?.map((role) => ({
        roleId: role.roleId,
        rolePermissions: rolePerms?.map((rol) => ({
          rolePermId: rol.permissionId,
          rolePermIsActive: agent?.userRolePermissions.find((item) => {
            if (item.role?.roleId === role.roleId) {
              return item.permissions.find((item) => item.permissionId === rol.permissionId);
            }
          })
            ? true
            : false,
        })),
      })),
      tariffPerm: tariffs?.map((tariff) => ({
        tariffId: tariff.tariffId,
        tariffPermissions: tariffPerms?.map((t) => ({
          rolePermId: t.permissionId,
          rolePermIsActive: agent?.userTariffPermissions.find((item) => {
            if (item?.tariff?.tariffId === tariff.tariffId) {
              return item.permissions?.find((item) => item.permissionId === t.permissionId);
            }
          })
            ? true
            : false,
        })),
      })),
      projectPerm: agentProjects?.map((proj) => ({
        projectId: proj.projectId,
        projectPermissions: projectPerms?.map((per) => ({
          projPermId: per.permissionId,
          projPermIsActive: agent?.userProjectPermissions.find((item) => {
            if (item.project?.projectId === proj.projectId) {
              return item.permissions.find((item) => item.permissionId === per.permissionId);
            }
          })
            ? true
            : false,
        })),
      })),
      canPayment: agent?.isCanPayment,
    });
  }, [roles, agentProjects, tariffs]);

  useEffect(() => {
    getAgentPermissions({ callback() {} });
    getAllAgentProject({ callback() {}, pageNumber: 0, pageSize: 20 });
  }, []);

  return (
    <BaseForm
      name="agentForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Card width="100%">
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <VideoCard />
              </Col>
              <Col span={24}>
                <BaseForm.Item label="Project Permissions">
                  <BaseForm.List
                    name="projectPerm"
                    // rules={
                    //   [
                    // {
                    // validator(_, value) {
                    // console.log(value);
                    // },
                    // },
                    //   ]
                    // }
                  >
                    {(fields) => (
                      <Collapse
                        items={fields?.map((field) => ({
                          key: field.key,
                          label: agentProjects?.[field.name].name,
                          children: (
                            <>
                              <BaseForm.Item
                                name={[field.key, 'projectId']}
                                rules={[{ type: 'number' }]}
                              >
                                <Input style={{ display: 'none' }} />
                              </BaseForm.Item>
                              <BaseForm.List name={[field.key, 'projectPermissions']}>
                                {(subFields, __, ___) =>
                                  subFields?.map((subField) => (
                                    <Row justify={'space-between'} key={subField.key}>
                                      <Col>
                                        <BaseForm.Item name={[subField.key, 'projPermId']}>
                                          <Tag color="green">
                                            {projectPerms?.[subField.name].name}
                                          </Tag>
                                        </BaseForm.Item>
                                      </Col>
                                      <Col>
                                        <BaseForm.Item name={[subField.key, 'projPermIsActive']}>
                                          <Switch loading={loading.post} />
                                        </BaseForm.Item>
                                      </Col>
                                      <Col style={{ display: 'none' }}>
                                        <BaseForm.Item
                                          name={[subField.key, 'projPermId']}
                                          rules={[{ type: 'number' }]}
                                        >
                                          <Input />
                                        </BaseForm.Item>
                                      </Col>
                                    </Row>
                                  ))
                                }
                              </BaseForm.List>
                            </>
                          ),
                        }))}
                      />
                    )}
                  </BaseForm.List>
                </BaseForm.Item>
              </Col>
              <Col span={24}>
                <BaseForm.Item label="Tariff Permissions">
                  <BaseForm.List name="tariffPerm">
                    {(fields) => (
                      <Collapse
                        items={fields?.map((field) => ({
                          key: field.key,
                          label: tariffs?.[field.name]?.name,
                          children: (
                            <>
                              <BaseForm.Item
                                name={[field.key, 'tariffId']}
                                rules={[{ type: 'number' }]}
                              >
                                <Input style={{ display: 'none' }} />
                              </BaseForm.Item>
                              <BaseForm.List name={[field.key, 'tariffPermissions']}>
                                {(subFields, __, ___) =>
                                  subFields?.map((subField) => (
                                    <Row justify={'space-between'} key={subField.key}>
                                      <Col>
                                        <BaseForm.Item name={[subField.key, 'tariffPermId']}>
                                          <Tag color="green">
                                            {tariffPerms?.[subField.name].name}
                                          </Tag>
                                        </BaseForm.Item>
                                      </Col>
                                      <Col>
                                        <BaseForm.Item name={[subField.key, 'tariffPermIsActive']}>
                                          <Switch loading={loading.post} />
                                        </BaseForm.Item>
                                      </Col>
                                      <Col style={{ display: 'none' }}>
                                        <BaseForm.Item
                                          name={[subField.key, 'tariffPermId']}
                                          rules={[{ type: 'number' }]}
                                        >
                                          <Input />
                                        </BaseForm.Item>
                                      </Col>
                                    </Row>
                                  ))
                                }
                              </BaseForm.List>
                            </>
                          ),
                        }))}
                      />
                    )}
                  </BaseForm.List>
                </BaseForm.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card width="100%">
            <List>
              <List.Item>
                <Typography.Text strong>
                  {data?.firstName || ''} {data?.lastName || ''} {data?.middleName || ''}
                </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text strong>Fuqoroligi: </Typography.Text> {data?.citizenship}
              </List.Item>
              <List.Item>
                <Typography.Text strong>{"Tug'ilgan sana"}: </Typography.Text>{' '}
                {dateFormatDayJs(data?.birthDate as string)}
              </List.Item>
              <List.Item>
                <Typography.Text strong>Manzil: </Typography.Text> {data?.address}
              </List.Item>
              <List.Item>
                <Typography.Text strong>Ariza qoldirgan sanasi: </Typography.Text> {data?.startDate}
              </List.Item>
              <List.Item>
                <Typography.Text strong>Jinsi: </Typography.Text> {data?.gender}
              </List.Item>
            </List>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
              <BaseForm.Item label="Role Permissions">
                <BaseForm.List name="rolePerm">
                  {(fields) => (
                    <Collapse
                      items={fields?.map((field) => ({
                        key: field.key,
                        label: roles?.[field.name]?.name,
                        children: (
                          <>
                            <BaseForm.Item
                              name={[field.key, 'roleId']}
                              rules={[{ type: 'number' }]}
                            >
                              <Input style={{ display: 'none' }} />
                            </BaseForm.Item>
                            <BaseForm.List name={[field.key, 'rolePermissions']}>
                              {(subFields, __, ___) =>
                                subFields?.map((subField) => (
                                  <Row justify={'space-between'} key={subField.key}>
                                    <Col>
                                      <BaseForm.Item name={[subField.key, 'rolePermId']}>
                                        <Tag color="green">
                                          {projectPerms?.[subField.name].name}
                                        </Tag>
                                      </BaseForm.Item>
                                    </Col>
                                    <Col>
                                      <BaseForm.Item name={[subField.key, 'rolePermIsActive']}>
                                        <Switch loading={loading.post} />
                                      </BaseForm.Item>
                                    </Col>
                                    <Col style={{ display: 'none' }}>
                                      <BaseForm.Item
                                        name={[subField.key, 'rolePermId']}
                                        rules={[{ type: 'number' }]}
                                      >
                                        <Input />
                                      </BaseForm.Item>
                                    </Col>
                                  </Row>
                                ))
                              }
                            </BaseForm.List>
                          </>
                        ),
                      }))}
                    />
                  )}
                </BaseForm.List>
              </BaseForm.Item>
            </Col>
            <Col span={24}>
              <Row justify={'space-between'}>
                <Col span={12}>
                  <BaseForm.Item
                    name="multipe_account"
                    label={'Multiple Account Is Active'}
                    hasFeedback
                    rules={[{ type: 'boolean', message: 'field is required' }]}
                  >
                    <Switch defaultValue={false} />
                  </BaseForm.Item>
                </Col>
                <Col span={12}>
                  <BaseForm.Item
                    name="canPayment"
                    label={'Is Can Payment'}
                    hasFeedback
                    rules={[{ type: 'boolean', message: 'field is required' }]}
                  >
                    <Switch
                      onChange={() => {
                        updateCanPaymentAgent({
                          callback() {
                            addNotification('can payment changed');
                            setAgentCanPayment(!agent?.isCanPayment);
                          },
                          userId: agent?.userId as number,
                          canPayment: !agent?.isCanPayment,
                        });
                      }}
                      defaultValue={agent?.isCanPayment}
                    />
                  </BaseForm.Item>
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
        <Col span={24}>
          {contractStatus !== 'SUCCESS' && (
            <Row gutter={24} justify="space-around">
              <Col span={12}>
                <SimpleButton click={handleReject} color="--negative">
                  Rad etish
                </SimpleButton>
              </Col>
              <Col span={12}>
                <PrimaryBtn htmlType="submit" loading={loading.post}>
                  Tasdiqlash
                </PrimaryBtn>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={24}>
          {contractStatus === 'SUCCESS' && (
            <PrimaryBtn htmlType="submit" loading={loading.post} color="warning">
              Update
            </PrimaryBtn>
          )}
        </Col>
      </Row>
    </BaseForm>
  );
};
