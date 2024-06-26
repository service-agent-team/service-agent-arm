import { Table, TablePaginationConfig } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';

export const LetsTripGroupTourTable = () => {
  const {
    getByCountryIdLetsTripGroupTour,
    setPagination,
    setSearchPagination,
    searchLetsTripGroupTour,
  } = useActions();
  const {
    searchGroupTours,
    byCountryIdTours,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripTour);
  const {
    search,
    pagination: { current, pageSize, total },
    searchPagination,
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
      page: searchPagination.current - 1,
      size: searchPagination.pageSize,
      countryId: Number(countryId),
    });
  }, [countryId, current, search, searchPagination.current]);

  const handlePagination = (p: TablePaginationConfig) => {
    if (search) {
      setSearchPagination(p);
    } else {
      setPagination(p);
    }
  };

  return (
    <Table
      columns={utils()}
      dataSource={
        search && searchGroupTours?.length
          ? (searchGroupTours as ILetsTripGroupTour[])
          : (byCountryIdTours as ILetsTripGroupTour[])
      }
      pagination={
        search
          ? {
              current: searchPagination.current,
              pageSize: searchPagination.pageSize,
              total: searchPagination.total,
            }
          : { current, pageSize, total }
      }
      onChange={(p) => handlePagination(p)}
      loading={get}
      bordered
    />
  );
};
