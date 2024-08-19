import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { subUtils } from './sub-utils';
import { IFacility } from '@/store/booking/facility/types';

export const BookingFacilityTable = () => {
  const {
    facilities,
    loading: { get },
  } = useTypedSelector((s) => s.bookingFacility);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllFacility } = useActions();

  useEffect(() => {
    if (current) {
      getAllFacility({ page: current - 1, size: pageSize });
    }
  }, [current]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={facilities ? facilities : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      expandable={{
        expandedRowRender: (record: IFacility) => subUtils(record),
      }}
    />
  );
};
