import { useActions, useTypedSelector } from '@/common/hooks';
import { dateFormatDayJs } from '@/common/utils/format';
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
    getRoles({ callback() {}, pageNumber: 0, pageSize: 30 });
    getAllAgentTariffCategory({ callback() {} });
    getCompany({ page: 0, size: 30 });
  }, []);
  const { roles, agentTariff, company } = useTypedSelector((state) => state);

  return (
    <Badge.Ribbon
      text={
        data?.contractStatus === 'SUCCESS'
          ? 'Tasdiqlangan'
          : data?.contractStatus === 'VIEW'
            ? 'Kutilmoqda'
            : data?.contractStatus === 'REJECT'
              ? 'Rad etilgan'
              : 'Anonim'
      }
      color={
        data?.contractStatus === 'SUCCESS'
          ? 'green'
          : data?.contractStatus === 'VIEW'
            ? 'purple'
            : data?.contractStatus === 'REJECT'
              ? 'red'
              : 'cyan'
      }
    >
      <Card width="600px">
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
