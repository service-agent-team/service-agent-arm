import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { ITaeiffData } from '@/store/service-agent/tariff/types';
import React from 'react';
import { utils } from './utils';

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
