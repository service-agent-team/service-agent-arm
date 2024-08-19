import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { subUtils } from './sub-utils';
import { IBedType } from '@/store/booking/bed-type/types';

export const BookingBedTypeTable = () => {
  const {
    bedTypes,
    loading: { get },
  } = useTypedSelector((s) => s.bookingBedType);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllBedType } = useActions();

  useEffect(() => {
    if (current) {
      getAllBedType({ page: current - 1, size: pageSize });
    }
  }, [current]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={bedTypes ? bedTypes : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      expandable={{
        expandedRowRender: (record: IBedType) => subUtils(record),
      }}
    />
  );
};
