import {
  ICreatePayload,
  IEditPayload,
  IGetAllPayload,
  IGetOnePayload,
  IGlobalResponse,
  IStoreType,
} from '@/types/common';

// state interfaces
export interface IUserInitalState extends IStoreType {
  users: IUserResponseData[] | null;
  user: IUserResponseData | null;
  total: number;
}

// user actions payloads
export interface IGetUserPayload extends IGetAllPayload {}

export interface ICreateUserPayload extends ICreatePayload<IUserCreatePayloadData> {}

export interface IUserOnePayload extends IGetOnePayload {}

export interface IUserEditPayload extends IEditPayload<Partial<IUserCreatePayloadData>> {}

// user responses
export interface IUserResponse extends IGlobalResponse<IUserResponseData> {}

// user data types
export interface IUserResponseData {
  key?: number;
  user_id?: number;
  user_name?: string;
  password?: string;
  email?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  userPermission?: UserPermission[];
  userRoles?: UserRoles[];
}

export interface UserRoles {
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

export interface IUserCreatePayloadData {
  userName: string;
  password: string;
  email: string;
  role: string | number;
}
