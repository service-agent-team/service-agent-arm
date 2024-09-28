import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { dateParser } from '@/common/utils/format';
import { Actions } from './actions';
import { IProcessProject } from '@/store/process/project/types';

export const utils = () => {
  const columns: ColumnsType<IProcessProject> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        if (a.id && b.id) a.id - b.id;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, idx: number) => idx + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => value.slice(0, 100),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: number, record) => <Actions record={record} />,
      fixed: 'right',
    },
  ];

  return columns;
};
