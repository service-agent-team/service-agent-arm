import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from 'antd';
import { useEffect } from 'react';
import { utils } from './utils';
import { useParams } from 'react-router-dom';
import { subUtils } from './sub-utils';

export const LetsTripTransferTable = () => {
  const { getByCategoryIdLetsTripTransfer, setPagination } = useActions();
  const {
    transfers,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTransfer);
  const { selectCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const { id } = useParams();

  useEffect(() => {
    getByCategoryIdLetsTripTransfer({
      page: current - 1,
      size: pageSize,
      categoryId: Number(selectCategory?.id) || Number(id),
    });
  }, [current, pageSize, id]);

  return (
    <Table
      columns={utils()}
      expandable={{
        expandedRowRender: (record) => subUtils(record),
      }}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      dataSource={transfers}
      scroll={{ x: 1000 }}
      loading={get}
      bordered
    />
  );
};
