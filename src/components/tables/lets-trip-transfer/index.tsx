import { Table } from 'antd';
import { utils } from './utils';
import { useEffect, useState } from 'react';

export const LetsTripTransferTable = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(Orders());

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    setOrders(Orders());
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={orders ? (orders as any[]) : []}
      loading={loading}
      bordered
    />
  );
};

function Orders() {
  const orders = [
    {
      id: 1,
      name: 'Tour name',
      userId: 33,
      serviceOrderId: 2,
      productId: 14,
      price: 9990,
      createdAt: '2024-01-05T16:57:04.257237',
    },
    {
      id: 2,
      name: 'Tour name',
      userId: 43,
      serviceOrderId: 28,
      productId: 19,
      price: 877,
      createdAt: '2024-02-05T16:57:04.257237',
    },
    {
      id: 3,
      name: 'Tour name',
      userId: 3,
      serviceOrderId: 12,
      productId: 4,
      price: 990,
      createdAt: '2024-03-05T16:57:04.257237',
    },
    {
      id: 4,
      name: 'Tour name',
      userId: 13,
      serviceOrderId: 32,
      productId: 1,
      price: 9990,
      createdAt: '2023-01-05T16:57:04.257237',
    },
  ];

  return orders;
}
