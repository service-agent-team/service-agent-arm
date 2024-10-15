import { Table } from 'antd';
import { utils } from './utils';
import {
  ILetsTripOrder,
  LetsTripOrderStatus,
  LetsTripOrderType,
} from '@/store/lets-trip/order/types';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';

export const LetsTripOrderTable = () => {
  const { getLetsTripOrderByStatus, setLetsTripOrderType, setLetsTripOrderStatus, setPagination } =
    useActions();
  const {
    orders,
    loading: { get },
    status,
    type,
  } = useTypedSelector((state) => state.letsTripOrder);
  const { project } = useParams();
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);

  useEffect(() => {
    if (type && project?.toUpperCase() === type && status) {
      getLetsTripOrderByStatus({
        status,
        type,
        page: current - 1,
        size: pageSize,
      });
    }
  }, [status, type, project, current]);

  useEffect(() => {
    if (project && typeof project === 'string') {
      setLetsTripOrderStatus(LetsTripOrderStatus.CREATED);
      setLetsTripOrderType(project.toUpperCase() as LetsTripOrderType);
    }
  }, [project]);

  return (
    <Table
      columns={utils()}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      dataSource={orders ? (orders as ILetsTripOrder[]) : []}
      loading={get}
      bordered
    />
  );
};
