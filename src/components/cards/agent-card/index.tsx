import { useActions, useTypedSelector } from '@/common/hooks';
import { AgentForm } from '@/components/forms';
import { IUserDataV2 } from '@/store/service-agent/contract/contract.interface';
import { Badge } from 'antd';
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
      <AgentForm
        userId={data?.userId as number}
        roles={roles.allRole}
        categories={agentTariff.tariffs}
        companies={company.companies}
        contractStatus={data?.contractStatus}
        userPermissions={data?.userRolePermissions}
        data={data}
      />
    </Badge.Ribbon>
  );
};
