import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export type DataIndex = keyof ILetsTripTransfer;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}
