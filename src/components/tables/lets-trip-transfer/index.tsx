import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';

export const LetsTripTransferTable = () => {
  const { getAllLetsTripTransfer } = useActions();
  const {
    transfers,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransfer);
  useEffect(() => {
    getAllLetsTripTransfer({
      page: 0,
      size: 30,
      callback() {},
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
