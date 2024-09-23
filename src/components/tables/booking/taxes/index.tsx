import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { subUtils } from './sub-utils';
import { ITaxe } from '@/store/booking/taxes/types';

export const BookingTaxesTable = () => {
  const {
    taxes,
    loading: { get },
  } = useTypedSelector((s) => s.bookingTaxes);
  const { getAllTaxes } = useActions();

  useEffect(() => {
    getAllTaxes({});
  }, []);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={taxes ? taxes : []}
      loading={get}
      bordered
      expandable={{
        expandedRowRender: (record: ITaxe) => subUtils(record),
      }}
    />
  );
};
