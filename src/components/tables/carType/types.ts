import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface UserTableRow {
  key: number;
  carTypeId: number;
  numberOfBaggages: number;
  numberOfSeats: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof UserTableRow;

export interface IhandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
