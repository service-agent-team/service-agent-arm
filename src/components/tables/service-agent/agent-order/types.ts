import { IAgentOrderData } from '@/store/service-agent/order/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof IAgentOrderData;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
