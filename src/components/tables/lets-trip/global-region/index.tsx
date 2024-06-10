import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { ILetsTripGlobalRegion } from '@/store/lets-trip/global-region/types';

export const LetsTripGlobalRegionTable = () => {
  const { getByCountryIdRegion, setPagination } = useActions();
  const {
    globalRegions,
    loading: { get },
  } = useTypedSelector((state) => state.letsTripGlobalRegion);
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { id } = useParams();

  useEffect(() => {
    getByCountryIdRegion({
      page: current - 1,
      size: pageSize,
      countryId: Number(id),
    });
  }, [id]);

  return (
    <Table
      columns={utils()}
      dataSource={globalRegions ? (globalRegions as ILetsTripGlobalRegion[]) : []}
      onChange={(p) => setPagination(p)}
      loading={get}
      bordered
    />
  );
};
