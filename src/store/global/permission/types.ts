export interface IPermissionInitalState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  permissions: IPermissionResponseData[] | null;
  permission: IPermissionResponseData | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IPermissionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IPermissionResponseData[];
}

export interface IOnePermissionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IPermissionResponseData;
}

export interface IPermissionResponseData {
  permission_id: number;
  permission_name: string;
  permission_description: string;
  created_at: string;
  updated_at: string;
  userPermission: UserPermission[];
}

export interface IPermissionPayload {
  callback(): void;
}

export interface IDeletePermissionPayload {
  callback(): void;
  id: number;
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

export interface IPermissionCreatePayload {
  permissionName: string;
  permissionDescription: string;
  callback: () => void;
}

export interface IPermissionUploadPayload extends IPermissionCreatePayload {
  callback: () => void;
  id: number;
}

export interface IPermissionCreateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: ICreatePermissionData;
}

export interface ICreatePermissionData {
  permission_name: string;
  permission_description: string;
  userPermission: any[];
  permission_id: number;
  created_at: string;
  updated_at: string;
}

export interface ICreatePermissionAxiosPayload {
  permissionName: string;
  permissionDescription: string;
}
