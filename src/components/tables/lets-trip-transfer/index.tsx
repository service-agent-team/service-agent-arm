import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';

export const LetsTripTransferTable = () => {
  const { getAllLetsTripTransfer } = useActions();
  const {
    loading: { get },
    transfers,
  } = useTypedSelector((state) => state.letsTripTransfer);

  useEffect(() => {
    getAllLetsTripTransfer({
      callback() {
        addNotification('successfully get all transfer');
      },
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={transfers ? (transfers as ILetsTripTransfer[]) : []}
      loading={get}
      bordered
    />
  );
};
