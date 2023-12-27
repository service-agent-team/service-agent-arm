import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface AgentTableRow {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: any;
  gender: string;
  citizenship: string;
  country: string;
  city: string;
  address: string;
  photoURL: string | null | any;
  status: any;
  infoCreatedDateTime: any;
  infoStatusDateTime: any;
  login: string;
  authType: number;
  userCurrentStatus: number;
  isRegistrationMyId: boolean;
  isRegistrationContract: boolean;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type DataIndex = keyof AgentTableRow;

export interface IhandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
