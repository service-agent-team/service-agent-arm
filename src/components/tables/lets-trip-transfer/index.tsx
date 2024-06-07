import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';

export const LetsTripTransferTable = () => {
  const { getAllLetsTripTransfer } = useActions();
  const {
    activeTransfers,
    transfers,
    deleted,
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
      // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
      dataSource={
        transfers && !deleted
          ? (transfers as ILetsTripTransfer[])
          : (activeTransfers as ILetsTripTransfer[])
      }
      loading={get}
      bordered
    />
  );
};
