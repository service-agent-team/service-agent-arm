import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripIndividualTourByCountryId } from '@/store/lets-trip/individual-tour/types';
import { useParams } from 'react-router-dom';

export const LetsTripIndividualTourTable = () => {
  const { getByCountryLetsTripIndividualTour } = useActions();
  const {
    byCountryIndividualTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripIndividualTour);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const { countryId } = useParams();

  useEffect(() => {
    getByCountryLetsTripIndividualTour({
      page: current - 1,
      size: pageSize,
      countryId: Number(countryId),
    });
  }, [countryId]);

  return (
    <Table
      columns={utils()}
      dataSource={byCountryIndividualTours as ILetsTripIndividualTourByCountryId[]}
      loading={get}
      bordered
    />
  );
};
