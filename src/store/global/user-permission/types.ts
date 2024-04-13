export interface IUserPermissionInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  userPermissions: IUserPermission[] | null;
  userPermission: IUserPermission | null;
  errors: unknown | string[] | string;
}

export interface IUserPermissionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserPermission[];
}
export interface IOneUserPermissionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserPermission;
}

export interface IUserPermissionPayload {
  callback(): void;
}

export interface IGetUserPermissionPayload {
  callback(): void;
  id: number;
}

export interface IUserPermissionCreateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserPermission;
}

export interface IUserPermissionCreatePayload {
  permissionId: number;
  projectId: number;
  userId: number;
  callback(): void;
}

export interface IUserPermissionUpdatePayload extends IUserPermissionCreatePayload {
  id: number;
}

export interface IUserPermissionDeleteResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    raw: [];
    affected: 1;
  };
}

export interface IUserPermissionDeletePayload {
  id: number | string;
  callback(): void;
}

export interface IUserPermission {
  user_permission_id: number;
  user_id: UserId | null;
  permission_id: PermissionId | null;
  project_id: ProjectId | null;
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
