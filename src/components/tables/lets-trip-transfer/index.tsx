import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const LetsTripTransferTable = () => {
  const { getAllLetsTripTransfer } = useActions();
  const {
    transfers,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransfer);
  useEffect(() => {
    getAllLetsTripTransfer({
      callback() {
        addNotification('successfully get all transfers');
      },
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={transfers ? (transfers as any[]) : []}
      loading={get}
      bordered
    />
  );
};
