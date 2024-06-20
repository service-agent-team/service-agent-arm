import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export type DataIndex = keyof ILetsTripGroupTour;

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
