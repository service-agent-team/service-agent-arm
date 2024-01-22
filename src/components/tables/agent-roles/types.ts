import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface AgentRolesRow {
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

export type DataIndex = keyof AgentRolesRow;

export interface IhandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
