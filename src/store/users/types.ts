export interface IUserInitalState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  users: IUserResponseData[] | null;
  user: IUserGetMe | null;
  total: number;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface ISetUserPayload {
  payload: IUserResponseData[];
}

export interface IGetUserPayload {
  callback: () => void;
}

export interface IUserResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserResponseData[];
}

export interface IUserGetMeResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserGetMe;
}

export interface IUserResponseData {
  key?: number;
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
  userPermission: any[];
  userRoles: UserRoles[];
}

export interface IUserGetMe {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
  userPermission: UserPermission[];
  userRoles: UserRoles[];
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

export interface IUserCreateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: createData[];
}

export interface createData {
  user_name: string;
  email: string;
  password: string;
  userRoles: any[];
  userPermission: any[];
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IUserCreateData {
  userName: string;
  password: string;
  email: string;
  callback: () => void;
}
