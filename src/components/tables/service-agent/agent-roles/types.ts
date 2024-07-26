import { IRolesV2 } from '@/store/service-agent/roles/types';
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

export interface AgentRolesRowV2 extends IRolesV2 {}

export type DataIndex = keyof AgentRolesRowV2;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
