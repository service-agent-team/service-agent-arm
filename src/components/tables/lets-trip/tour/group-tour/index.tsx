import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { ILetsTripGroupTourByCountryId } from '@/store/lets-trip/group-tour/types';

export const LetsTripGroupTourTable = () => {
  const { getByCountryIdLetsTripGroupTour, setPagination } = useActions();
  const {
    byCountryIdTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const { countryId } = useParams();

  useEffect(() => {
    getByCountryIdLetsTripGroupTour({
      page: current - 1,
      size: pageSize,
      countryId: Number(countryId),
    });
  }, [countryId, current, pageSize]);

  return (
    <Table
      columns={utils()}
      dataSource={byCountryIdTours as ILetsTripGroupTourByCountryId[]}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      loading={get}
      bordered
    />
  );
};
