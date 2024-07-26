import { IAgentPermissionV2 } from '@/store/service-agent/permission/types';
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
export interface AgentPermissionRowV2 extends IAgentPermissionV2 {}

export type DataIndex = keyof AgentPermissionRowV2;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
