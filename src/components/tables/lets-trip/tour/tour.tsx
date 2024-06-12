import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripGlobalCountry } from '@/store/lets-trip/global-country/types';

export const LetsTripTourTable = () => {
  const { getAllGlobalCountry, setPagination } = useActions();
  const {
    globalCountries,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);

  useEffect(() => {
    getAllGlobalCountry({
      page: current - 1,
      size: pageSize,
    });
  }, [current, pageSize]);

  return (
    <Table
      columns={utils()}
      dataSource={globalCountries ? (globalCountries as ILetsTripGlobalCountry[]) : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
    />
  );
};
