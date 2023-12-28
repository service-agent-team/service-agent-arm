export interface IPermissionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IPermissionResponseData[];
}

export interface IPermissionInitalState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  permissions: IPermissionResponseData[] | null;
  permission: UserPermission | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IPermissionResponseData {
  permission_id: number;
  permission_name: string;
  permission_description: string;
  created_at: string;
  updated_at: string;
  userPermission: UserPermission[];
}

export interface UserPermission {
  user_permission_id: number;
  permission_id: PermissionId;
  project_id: ProjectId;
  user_id?: UserId;
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

export interface UserId {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
}
