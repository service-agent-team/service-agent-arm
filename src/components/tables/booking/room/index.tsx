import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';

export const BookingRoomTable = () => {
  const {
    rooms,
    loading: { get },
  } = useTypedSelector((s) => s.bookingRoom);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllRoom } = useActions();

  useEffect(() => {
    if (current) {
      getAllRoom({ page: current - 1, size: pageSize });
    }
  }, [current]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={rooms ? rooms : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      isAdd
    />
  );
};
