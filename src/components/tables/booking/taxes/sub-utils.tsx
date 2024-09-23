import { Table } from '@/components/common';
import { TableColumnsType, Tag } from 'antd';
import React from 'react';
import { SubActions } from './actions';
import { ITaxe } from '@/store/booking/taxes/types';

export const subUtils = (dataSource: ITaxe): React.ReactNode => {
  const columns: TableColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Language Type',
      dataIndex: 'languageType',
      key: 'languageType',
      render: (el) => <Tag color="success">{el}</Tag>,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => <SubActions record={record} id={record.id} />,
    },
  ];

  return (
    <Table
      isAdd
      columns={columns}
      dataSource={dataSource.translations.map((item) => ({ ...item, id: dataSource.id }))}
      pagination={false}
    />
  );
};
