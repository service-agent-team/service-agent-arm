import { Table } from '@/components/common';
import { IBedType } from '@/store/booking/bed-type/types';
import { TableColumnsType, Tag } from 'antd';
import React from 'react';
import { SubActions } from './actions';

export const subUtils = (dataSource: IBedType): React.ReactNode => {
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
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
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
