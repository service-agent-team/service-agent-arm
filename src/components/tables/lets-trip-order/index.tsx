import { Table } from 'antd';
import { utils } from './utils';
import { ILetsTripOrder, LetsTripOrderStatus } from '@/store/lets-trip/order/types';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/common/hooks';

export const LetsTripOrderTable = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(Orders(LetsTripOrderStatus.active));
  const { status } = useTypedSelector((state) => state.letsTripOrder);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    setOrders(Orders(status));
  }, [status]);

  return (
    <Table
      columns={utils()}
      dataSource={orders ? (orders as ILetsTripOrder[]) : []}
      loading={loading}
      bordered
    />
  );
};

function Orders(status: LetsTripOrderStatus) {
  const orders = [
    {
      id: 1,
      userId: 33,
      serviceOrderId: 2,
      productId: 14,
      status: LetsTripOrderStatus.active,
      price: 9990,
      createdAt: '2024-01-05T16:57:04.257237',
    },
    {
      id: 2,
      userId: 43,
      serviceOrderId: 2,
      productId: 19,
      status: LetsTripOrderStatus.active,
      price: 877,
      createdAt: '2024-02-05T16:57:04.257237',
    },
    {
      id: 3,
      userId: 3,
      serviceOrderId: 2,
      productId: 4,
      status: LetsTripOrderStatus.pending,
      price: 990,
      createdAt: '2024-03-05T16:57:04.257237',
    },
    {
      id: 4,
      userId: 13,
      serviceOrderId: 2,
      productId: 1,
      status: LetsTripOrderStatus.rejected,
      price: 9990,
      createdAt: '2023-01-05T16:57:04.257237',
    },
  ];

  return status === LetsTripOrderStatus.all
    ? orders
    : orders.filter((order) => {
        if (order.status === status) return order;
      });
}
