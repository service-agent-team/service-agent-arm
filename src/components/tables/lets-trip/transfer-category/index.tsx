import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripTransferCategory } from '@/store/lets-trip/transfer-category/types';
import { Table } from '@/components/common';

export const LetsTripTransferCategoryTable = () => {
  const { getAllLetsTripTransferCategory, setPagination } = useActions();
  const {
    transferCategories,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransferCategory);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);

  useEffect(() => {
    getAllLetsTripTransferCategory({
      page: current - 1,
      size: pageSize,
      deleted: false,
    });
  }, [current]);

  return (
    <Table
      columns={utils()}
      dataSource={transferCategories as ILetsTripTransferCategory[]}
      loading={get}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      bordered
    />
  );
};
