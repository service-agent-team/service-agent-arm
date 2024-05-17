import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripGroupTour } from '@/store/lets-trip/tour/types';

export const LetsTripGroupTourTable = () => {
  const { getAllLetsTripGroupTour } = useActions();
  const {
    groupTours,
    deleted,
    activeTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);

  useEffect(() => {
    getAllLetsTripGroupTour({
      callback() {},
      page: 0,
      size: 100,
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={
        groupTours && !deleted
          ? (groupTours as ILetsTripGroupTour[])
          : (activeTours as ILetsTripGroupTour[])
      }
      loading={get}
      bordered
    />
  );
};
