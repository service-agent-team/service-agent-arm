import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface UserTableRow {
  key: number;
  driverId: number;
  profileId: string;
  carId: number;
  carModel: string;
  carNumber: string;
  carImageId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
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
