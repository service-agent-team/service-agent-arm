/* eslint-disable prettier/prettier */
import { IUserRole } from '@/store/global/user-role/types'
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof IUserRole;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
