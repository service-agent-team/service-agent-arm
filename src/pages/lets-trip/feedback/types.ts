import { IFeedback } from '@/store/lets-trip/feedback/types';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export type DataIndex = keyof IFeedback;

export interface IHandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
