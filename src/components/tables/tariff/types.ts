import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface UserTableRow {
  key: number;
  tarifId: number;
  price: number;
  nameUz: string;
  nameRu: string;
  createdAt: string;
  isDeleted: boolean;
  minimalDuration: number;
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
