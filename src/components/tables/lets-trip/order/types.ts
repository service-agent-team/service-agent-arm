import { ILetsTripOrder } from '@/store/lets-trip/order/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export type DataIndex = keyof ILetsTripOrder;

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
