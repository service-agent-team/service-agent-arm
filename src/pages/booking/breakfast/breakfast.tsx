import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { useEffect } from 'react';
import { BeackfastColumn } from './constants';

export const Breakfast = () => {
  const { findBreakfasts } = useActions();
  const { breakfasts } = useTypedSelector((state) => state.bookingBreakfast);

  useEffect(() => {
    findBreakfasts({});
  }, []);

  return <Table columns={BeackfastColumn} dataSource={breakfasts} />;
};
