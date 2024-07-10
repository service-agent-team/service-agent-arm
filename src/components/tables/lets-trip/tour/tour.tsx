import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ILetsTripGlobalCountry } from '@/store/lets-trip/global-country/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const LetsTripTourTable = () => {
  const { getAllGlobalCountry, setPagination } = useActions();
  const {
    globalCountries,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);
  const navigate = useNavigate();

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
      onRow={(c) => ({
        onClick: () => navigate(`${ROUTES.letsTripTour}/by-country/${c.id}/group`),
      })}
      bordered
    />
  );
};
