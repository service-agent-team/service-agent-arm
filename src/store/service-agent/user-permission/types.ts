export interface IAgentUserPermissionInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  agentUserPermissions: IAgentUserPermission[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadRolesEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IAgentUserPermission {
  id: number;
  userId: number;
  permissionId: number;
  projectId: number;
}

export interface IAgentUserPermissionGetResponse {
  data: IAgentUserPermission[];
  message: string;
}
export interface IAgentUserPermissionGetResponsePayload {
  callback: () => void;
}

export interface IRolesByIdResponse {
  data: IAgentUserPermission;
}

export interface IAgentUserPermissionCreateResponse {
  status: number;
  success: boolean;
  code: number;
  message: string;
  data: IAgentUserPermission;
}
export interface IAgentUserPermissionUpdateResponse {
  status: number;
  message: string;
  success: boolean;
  data: IAgentUserPermission[];
}

export interface IAgentUserPermissionDeleteResponse {
  status: number;
  message: string;
  success: boolean;
  // data: IAgentUserPermission;
}

export interface IAgentUserPermissionCreatePayload {
  userId: number;
  projectId: number;
  permissionId: number;
  callback: () => void;
}

export interface IAgentUserPermissionDeletePayload {
  permissionId: number;
  callback: () => void;
}

export interface IAgentUserPermissionUpdatePayload {
  userId: number;
  permissionId: number;
  projectId: number;

  callback: () => void;
}

export interface IRolesDisablePayload {
  id: number | string;
  callback: () => void;
}

export interface IProject {
  project_id: number;
  project_name: string;
  project_description: string;
  status: true;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
}
