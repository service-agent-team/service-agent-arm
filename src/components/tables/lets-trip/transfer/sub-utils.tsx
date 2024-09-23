import { Table } from '@/components/common';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { TableColumnsType, Tag } from 'antd';
import React from 'react';
import { SubActions } from './actions';

export const subUtils = (dataSource: ILetsTripTransfer, carId: number): React.ReactNode => {
  const columns: TableColumnsType<IDirection> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      render: (_: any, __: any, index: number) => index + 1,
    },
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
      width: '15%',
      render: (el) => el / 100 + ' $',
    },
    {
      title: 'Hourly Price',
      dataIndex: 'hourlyPrice',
      key: 'hourlyPrice',
      width: '15%',
      render: (el) => el / 100 + ' $',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => <SubActions record={record} carId={carId} />,
    },
  ];

  return (
    <Table columns={columns} dataSource={dataSource?.directions} pagination={false} isAdd={true} />
  );
};
