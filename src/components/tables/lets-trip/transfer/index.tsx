import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from 'antd';
import { useEffect } from 'react';
import { utils } from './utils';
import { useParams } from 'react-router-dom';
import { subUtils } from './sub-utils';

export const LetsTripTransferTable = () => {
  const {
    getByCategoryIdLetsTripTransfer,
    setPagination,
    deleteTransferDirection,
    searchLetsTripTransfer,
  } = useActions();
  const {
    transfers,
    searchTransfers,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransfer);
  const { selectCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const {
    search,
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const { id } = useParams();

  useEffect(() => {
    if (search === '') {
      getByCategoryIdLetsTripTransfer({
        page: current - 1,
        size: pageSize,
        categoryId: Number(selectCategory?.id) || Number(id),
      });
      return;
    } else
      searchLetsTripTransfer({
        name: search as string,
        page: current - 1,
        size: pageSize,
      });
  }, [current, pageSize, search]);

  return (
    <Table
      columns={utils()}
      expandable={{
        expandedRowRender: (record) => subUtils(record, deleteTransferDirection),
      }}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      dataSource={search && searchTransfers?.length ? searchTransfers : transfers}
      scroll={{ x: 1000 }}
      rowKey={'id'}
      loading={get}
      bordered
    />
  );
};
