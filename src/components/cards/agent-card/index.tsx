import { SimpleButton } from '@/components';
import { Card } from '@/components/common/card';
import { AgentForm } from '@/components/forms';
import { useActions, useTypedSelector } from '@/hooks';
import { IUserData } from '@/store/agent/contract/contract.interface';
import { Badge, List, Typography } from 'antd';
import { useEffect } from 'react';

interface IProps {
  data: IUserData | null;
}

export const AgentCard = ({ data }: IProps) => {
  const { getRoles, getCategory, getCompany } = useActions();
  useEffect(() => {
    getRoles({ callback() {} });
    getCategory({ callback() {} });
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
              {data?.firstName} {data?.lastName} {data?.middleName}
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text strong>Fuqoroligi: </Typography.Text> {data?.citizenship}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{"Tug'ulgan sana"}: </Typography.Text> {data?.birthDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Manzil: </Typography.Text> {data?.address}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza qoldirgan sanasi: </Typography.Text> {data?.startDate}
          </List.Item>
          <List.Item>
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
          </List.Item>
        </List>
        {data?.contractStatus !== 'success' && (
          <AgentForm
            userId={data?.userId as number}
            roles={roles.roles}
            categories={agentTariff.tariffs}
            companies={company.companies}
          />
        )}
        {data?.contractStatus !== 'view' && <SimpleButton color="--warning ">Update</SimpleButton>}
      </Card>
    </Badge.Ribbon>
  );
};
