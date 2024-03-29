import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const AgentOrderTable: React.FC = () => {
  const { getAgentOrders } = useActions();
  const {
    orders,
    status,
    loading: { get },
  } = useTypedSelector((state) => state.agentOrder);

  useEffect(() => {
    getAgentOrders({ start: '12.01.2024', end: '17.12.2024', status });
  }, [status]);

  return (
    <Table
      style={{ width: '100%' }}
      columns={utils()}
      dataSource={orders ? orders : []}
      loading={get}
      bordered
    />
  );
};
