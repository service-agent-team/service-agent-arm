import { useActions, useTypedSelector } from '@/common/hooks';
import { Table, TablePaginationConfig } from 'antd';
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
    setSearchPagination,
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
    searchPagination,
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
        page: searchPagination.current - 1,
        size: searchPagination.pageSize,
      });
  }, [current, pageSize, search, searchPagination.current]);

  const handlePagination = (p: TablePaginationConfig) => {
    if (search) {
      setSearchPagination(p);
    } else {
      setPagination(p);
    }
  };

  return (
    <Table
      columns={utils()}
      expandable={{
        expandedRowRender: (record) => subUtils(record, deleteTransferDirection),
      }}
      pagination={
        search
          ? {
              current: searchPagination.current,
              pageSize: searchPagination.pageSize,
              total: searchPagination.total,
            }
          : { current, pageSize, total }
      }
      onChange={(p) => handlePagination(p)}
      dataSource={search && searchTransfers?.length ? searchTransfers : transfers}
      scroll={{ x: 1000 }}
      rowKey={'id'}
      loading={get}
      bordered
    />
  );
};
