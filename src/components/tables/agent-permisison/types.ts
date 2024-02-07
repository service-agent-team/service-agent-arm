import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface AgentPermissionsRow {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof AgentPermissionsRow;

export interface IhandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
