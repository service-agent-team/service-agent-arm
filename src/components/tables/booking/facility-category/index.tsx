import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { IFacilityCategory } from '@/store/booking/facility-category/types';
import { subUtils } from './sub-utils';

export const BookingFacilityCategoryTable = () => {
  const {
    facilityCategories,
    loading: { get },
  } = useTypedSelector((s) => s.bookingFacilityCategory);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllFacilityCategory } = useActions();

  useEffect(() => {
    if (current) {
      getAllFacilityCategory({ page: current - 1, size: pageSize });
    }
  }, [current, pageSize]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={facilityCategories ? facilityCategories : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      expandable={{
        expandedRowRender: (record: IFacilityCategory) => subUtils(record),
      }}
    />
  );
};
