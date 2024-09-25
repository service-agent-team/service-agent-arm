import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';

export const BookingPropertyTable = () => {
  const {
    properties,
    loading: { get },
  } = useTypedSelector((s) => s.bookingProperty);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllProperty } = useActions();

  useEffect(() => {
    if (current) {
      getAllProperty({ page: current - 1, size: pageSize });
    }
  }, [current]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={properties ? properties : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      isAdd
    />
  );
};
