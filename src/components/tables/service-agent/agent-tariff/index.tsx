import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import React from 'react';
import { utils } from './utils';

export const AgentTariffTable: React.FC = () => {
  const {
    tariffs,
    loading: { get },
  } = useTypedSelector((state) => state.agentTariff);
  const generateUserData = addKeyProp<IAgentTariffV2>(tariffs as IAgentTariffV2[] | []);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IAgentTariffV2[]) : []}
      loading={get}
      bordered
    />
  );
};
