import { Table } from 'antd';
import { utils } from './utils';
import { ILetsTripOrder, LetsTripOrderType } from '@/store/lets-trip/order/types';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';

export const LetsTripOrderTable = () => {
  const { getLetsTripOrderByStatus, setLetsTripOrderType } = useActions();
  const {
    orders,
    loading: { get },
    status,
    type,
  } = useTypedSelector((state) => state.letsTripOrder);
  const { project } = useParams();

  useEffect(() => {
    getLetsTripOrderByStatus({
      status,
      type,
      page: 5,
      size: 10,
    });

    if (project && typeof project === 'string')
      setLetsTripOrderType(project.toUpperCase() as LetsTripOrderType);
  }, [status, type, project]);

  return (
    <Table
      columns={utils()}
      dataSource={orders ? (orders as ILetsTripOrder[]) : []}
      loading={get}
      bordered
    />
  );
};
