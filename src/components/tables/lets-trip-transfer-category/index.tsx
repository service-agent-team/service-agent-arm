import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripTransferCategory } from '@/store/lets-trip/transfer-category/types';

export const LetsTripTransferCategoryTable = () => {
  const { getAllLetsTripTransferCategory } = useActions();
  const {
    transferCategories,
    deleted,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransferCategory);

  useEffect(() => {
    getAllLetsTripTransferCategory({
      page: 0,
      size: 100,
      deleted: !deleted,
    });
  }, [deleted]);

  return (
    <Table
      columns={utils()}
      dataSource={transferCategories as ILetsTripTransferCategory[]}
      loading={get}
      bordered
    />
  );
};
