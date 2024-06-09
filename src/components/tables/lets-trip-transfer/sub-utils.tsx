import { Table } from '@/components/common';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { TableColumnsType, Tag } from 'antd';
import React from 'react';

export const subUtils = (dataSource: ILetsTripTransfer): React.ReactNode => {
  const columns: TableColumnsType<IDirection> = [
    {
      title: 'Source Boundary',
      dataIndex: ['sourceBoundary', 'name', 'en'],
      key: 'sourceBoundary',
      width: '25%',
      render: (el) => <Tag color="success">{el}</Tag>,
    },
    {
      title: 'Destination Boundary',
      dataIndex: ['destinationBoundary', 'name', 'en'],
      key: 'destinationBoundary',
      width: '25%',
      render: (el) => <Tag color="red">{el}</Tag>,
    },
    {
      title: 'Transfer Price',
      dataIndex: 'transferPrice',
      key: 'transferPrice',
      width: '25%',
      render: (el) => <Tag color="success">{el}</Tag>,
    },
    {
      title: 'Hourly Price',
      dataIndex: 'hourlyPrice',
      key: 'hourlyPrice',
      width: '25%',
      render: (el) => <Tag color="success">{el}</Tag>,
    },
  ];

  return <Table columns={columns} dataSource={dataSource.directions} pagination={false} />;
};
