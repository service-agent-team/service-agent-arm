import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { ILetsTripGroupTour } from '@/store/lets-trip/tour/types';

export const LetsTripGroupTourTable = () => {
  const { getAllLetsTripGroupTour } = useActions();
  const {
    groupTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);

  useEffect(() => {
    getAllLetsTripGroupTour({
      callback() {
        addNotification('successfully get all group tours');
      },
      page: 0,
      size: 100,
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={groupTours ? (groupTours as ILetsTripGroupTour[]) : []}
      loading={get}
      bordered
    />
  );
};
