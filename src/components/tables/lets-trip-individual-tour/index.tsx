import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { ILetsTripIndividualTour } from '@/store/lets-trip/individual-tour/types';

export const LetsTripIndividualTourTable = () => {
  const { getAllLetsTripIndividualTour } = useActions();
  const {
    individualTours,
    deleted,
    activeIndividualTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripIndividualTour);

  useEffect(() => {
    getAllLetsTripIndividualTour({
      callback() {
        addNotification('successfully get all individual tours');
      },
      page: 0,
      size: 100,
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={
        individualTours && !deleted
          ? (individualTours as ILetsTripIndividualTour[])
          : (activeIndividualTours as ILetsTripIndividualTour[])
      }
      loading={get}
      bordered
    />
  );
};
