import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { ITariffData } from '@/store/service-agent/tariff/types';
import React from 'react';
import { utils } from './utils';

export const AgentTariffTable: React.FC = () => {
  const {
    tariffs,
    loading: { get },
  } = useTypedSelector((state) => state.agentTariff);
  const generateUserData = addKeyProp<ITariffData>(tariffs as ITariffData[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as ITariffData[]) : []}
      loading={get}
      bordered
    />
  );
};
