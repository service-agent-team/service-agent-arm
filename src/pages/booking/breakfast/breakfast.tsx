import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';

import { useEffect } from 'react';
import { BeackfastColumn } from './constants';
import { DeleteBreakfastModal, LanguageModal } from './modal';

export const Breakfast = () => {
  const { findBreakfasts } = useActions();
  const { breakfasts, loading } = useTypedSelector((state) => state.bookingBreakfast);

  useEffect(() => {
    findBreakfasts({});
  }, []);

  return (
    <>
      <Table loading={loading.get} columns={BeackfastColumn} dataSource={breakfasts} />
      <DeleteBreakfastModal />
      <LanguageModal />
    </>
  );
};
