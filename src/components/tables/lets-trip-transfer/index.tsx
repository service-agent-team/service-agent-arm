import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { Table } from 'antd';
import { useEffect } from 'react';
import { utils } from './utils';

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
      size: 50,
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
      scroll={{ x: 1000 }}
    />
  );
};
