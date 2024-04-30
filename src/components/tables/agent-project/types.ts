import { IAgentProjectV2 } from '@/store/service-agent/project/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export type DataIndex = keyof IAgentProjectV2;

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
