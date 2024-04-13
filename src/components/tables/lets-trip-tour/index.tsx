import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';

export const LetsTripTourTable = () => {
  const { getAllLetsTripTour } = useActions();
  const {
    tours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);

  useEffect(() => {
    getAllLetsTripTour({
      callback() {
        addNotification('successfully get all tours');
      },
    });
  }, []);

  return (
    <Table columns={utils()} dataSource={tours ? (tours as any[]) : []} loading={get} bordered />
  );
};
