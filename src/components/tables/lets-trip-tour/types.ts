import { ILetsTripOrder } from '@/store/lets-trip/order/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

interface ILetsTripTour extends ILetsTripOrder {
  name: string;
}

export type DataIndex = keyof ILetsTripTour;

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
