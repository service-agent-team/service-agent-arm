import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';

export const LetsTripGroupTourTable = () => {
  const { getByCountryIdLetsTripGroupTour, setPagination, searchLetsTripGroupTour } = useActions();
  const {
    searchGroupTours,
    byCountryIdTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);
  const {
    search,
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const { countryId } = useParams();

  useEffect(() => {
    if (search === '') {
      getByCountryIdLetsTripGroupTour({
        page: current - 1,
        size: pageSize,
        countryId: Number(countryId),
      });
      return;
    }

    searchLetsTripGroupTour({
      name: search as string,
      page: current - 1,
      size: pageSize,
      countryId: Number(countryId),
    });
  }, [countryId, current, pageSize, search]);

  return (
    <Table
      columns={utils()}
      dataSource={
        search && searchGroupTours?.length
          ? (searchGroupTours as ILetsTripGroupTour[])
          : (byCountryIdTours as ILetsTripGroupTour[])
      }
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      loading={get}
      bordered
    />
  );
};
