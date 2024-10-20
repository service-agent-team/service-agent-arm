import { TableColumnsType } from 'antd';
import React from 'react';
import { SubActions } from './actions';
import { IProcessProject } from '@/store/process/project/types';
import { IProcess } from '@/store/process/diagram/types';
import { Table } from '@/components/common';

export const subUtils = (dataSource: IProcessProject, projectId: number): React.ReactNode => {
  const columns: TableColumnsType<IProcess> = [
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
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => <SubActions record={record} projectId={projectId} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource?.processes}
      pagination={false}
      path={`${projectId}/diagram/create`}
    />
  );
};
