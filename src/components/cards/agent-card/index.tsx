import { useActions, useTypedSelector } from '@/common/hooks';
import { Card } from '@/components/common/card';
import { AgentForm } from '@/components/forms';
import { IUserDataV2 } from '@/store/service-agent/contract/contract.interface';
import { Badge, List, Typography } from 'antd';
import { useEffect } from 'react';

interface IProps {
  data: IUserDataV2 | null;
}

export const AgentCard = ({ data }: IProps) => {
  const { getRoles, getAllAgentTariffCategory, getCompany } = useActions();
  useEffect(() => {
    getRoles({ callback() {}, pageNumber: 0, pageSize: 20 });
    getAllAgentTariffCategory({ callback() {} });
    getCompany({ page: 0, size: 20 });
  }, []);
  const { roles, agentTariff, company } = useTypedSelector((state) => state);

  return (
    <Badge.Ribbon
      text={
        data?.contractStatus === 'success'
          ? 'Tasdiqlangan'
          : data?.contractStatus === 'view'
            ? 'Kutilmoqda'
            : 'Rad etilgan'
      }
      color={
        data?.contractStatus === 'success'
          ? 'green'
          : data?.contractStatus === 'view'
            ? 'purple'
            : 'red'
      }
    >
      <Card width="600px">
        <List>
          <List.Item>
            <Typography.Text strong>
              {data?.firstName || ''} {data?.lastName || ''} {data?.middleName ?? ''}
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text strong>Fuqoroligi: </Typography.Text> {data?.citizenship}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{"Tug'ilgan sana"}: </Typography.Text> {data?.birthDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Manzil: </Typography.Text> {data?.address}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza qoldirgan sanasi: </Typography.Text> {data?.startDate}
          </List.Item>
          {/* <List.Item>
            <Typography.Text strong>Ariza holati: </Typography.Text>{' '}
            {data?.contractStatus === 'view'
              ? 'Tasdiqlanishi kutilmoqda'
              : data?.contractStatus === 'success'
                ? 'Tasdiqlangan'
                : null}
          </List.Item>
          {data?.userRoles[0]?.role && (
            <List.Item>
              <Typography.Text strong>Role: </Typography.Text>
              {data?.userRoles[0]?.role?.name}
            </List.Item>
          )}
          {data?.userTariffPermissions[0]?.userTariff && (
            <List.Item>
              <Typography.Text strong>Category: </Typography.Text>
              {data?.userTariffPermissions[0]?.userTariff?.tariffName}
            </List.Item>
          )}
          {data?.userPermissions[0]?.permission && (
            <List.Item>
              <Typography.Text strong>Permission: </Typography.Text>
              {data?.userPermissions[0]?.permission?.name}
            </List.Item>
          )}
          <List.Item>
            <Typography.Text strong>Company: </Typography.Text>
            Service-agent
          </List.Item> */}
        </List>

        <AgentForm
          userId={data?.userId as number}
          roles={roles.allRole}
          categories={agentTariff.tariffs}
          companies={company.companies}
          contractStatus={data?.contractStatus}
          userPermissions={data?.userRolePermissions}
        />
      </Card>
    </Badge.Ribbon>
  );
};
