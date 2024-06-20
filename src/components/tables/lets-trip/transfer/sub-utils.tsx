import { addNotification } from '@/common';
import { modal } from '@/components';
import { Table } from '@/components/common';
import { Icon } from '@/components/common/icon';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { Button, TableColumnsType, Tag } from 'antd';
import React from 'react';
// import { useParams } from 'react-router-dom';

export const subUtils = (
  dataSource: ILetsTripTransfer,
  deleteTransferDirection: any,
): React.ReactNode => {
  // const { id } = useParams();
  const handleDelete = (record: IDirection) => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteTransferDirection({
          callback() {
            addNotification('successfully deleted direction');
          },
          carId: record.id,
          directionId: record.id,
        });
      },
    });
  };
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
      render: (_, record) => {
        return (
          <Button type="primary" danger key={1} onClick={() => handleDelete(record)}>
            <Icon name="DeleteOutlined" />
          </Button>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={dataSource?.directions} pagination={false} />;
};
