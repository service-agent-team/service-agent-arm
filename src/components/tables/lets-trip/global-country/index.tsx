import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripGlobalCountry } from '@/store/lets-trip/global-country/types';

export const LetsTripGlobalCountryTable = () => {
  const { getAllGlobalCountry } = useActions();
  const {
    globalCountries,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripGlobalCountry);

  // console.log(globalCountries);

  useEffect(() => {
    getAllGlobalCountry({
      page: 0,
      size: 100,
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={globalCountries ? (globalCountries as ILetsTripGlobalCountry[]) : []}
      loading={get}
      bordered
    />
  );
};
