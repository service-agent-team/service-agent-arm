export interface InitialState {
  user: IUserResponseData | null;
  token: string | null;
  isAuth: boolean;
  loading: {
    sign: boolean;
    get: boolean;
  };
  error: null | string | unknown;
}

import { IUserResponseData } from '@/types';
import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IAuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: IAuthData;
  refresh_token: string;
  access_token: string;
}

export interface IGetMeResponse {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
  userRoles: UserRole[];
  userPermission: UserPermission[];
}

export interface IAuthData {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthSignIn {
  email: string;
  password: string;
  callback: (data: IAuthResponse) => void;
}

export interface UserRole {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
}

export interface UserPermission {
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
