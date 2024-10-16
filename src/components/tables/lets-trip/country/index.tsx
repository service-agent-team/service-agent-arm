import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripCountry } from '@/store/lets-trip/country/types';

export const LetsTripCountryTable = () => {
  const { getAllLetsTripCountry } = useActions();
  const {
    countries,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripCountry);

  useEffect(() => {
    getAllLetsTripCountry({
      callback() {},
      page: 0,
      size: 100,
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={countries ? (countries as ILetsTripCountry[]) : []}
      loading={get}
      bordered
    />
  );
};
