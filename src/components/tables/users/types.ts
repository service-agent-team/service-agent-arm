import { FilterConfirmProps } from 'antd/es/table/interface';
import { Key } from 'react';

export interface UserTableRow {
  key: number;
  user_id: number;
  user_name: string;
  password?: string;
  email: string;
  created_at: string;
  updated_at: string;
  userPermission: userpermission[];
  userRoles: UserRole[];
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface UserRole {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
  role_id: RoleId;
}

export interface RoleId {
  role_id: number;
  role_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface userpermission {
  user_permission_id: number;
  permission_id: PermissionId;
  project_id: ProjectId;
}

export interface PermissionId {
  permission_id: number;
  permission_name: string;
  permission_description: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectId {
  project_id: number;
  project_name: string;
  project_description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type DataIndex = keyof UserTableRow;

export interface IhandleSearchProps {
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
}
