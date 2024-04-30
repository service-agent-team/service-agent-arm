import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface AgentTariffRow {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof IAgentTariffV2;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
