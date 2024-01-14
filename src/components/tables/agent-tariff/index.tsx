import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import React from 'react';
import { utils } from './utils';
import { ITaeiffData } from '@/store/agent/tariff/types';

export const AgenetTariffTable: React.FC = () => {
  const {
    tariffs,
    loading: { get },
  } = useTypedSelector((state) => state.agentTariff);
  const generateUserData = addKeyProp<ITaeiffData>(tariffs as ITaeiffData[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as ITaeiffData[]) : []}
      loading={get}
      bordered
    />
  );
};
