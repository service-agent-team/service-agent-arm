export interface IRoleInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    patch: boolean;
    delete: boolean;
  };
  roles: IRole[] | null;
  role: IRole | null;
  errors: unknown | string[] | string;
}

export interface IRoleResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IRole[];
}

export interface IGetOneRoleResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IRole;
}

export interface IRolePayload {
  callback(): void;
}

export interface IRoleCreateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IRole;
}

export interface IRoleCreatePayload {
  roleName: string;
  roleDescription: number;
  callback(): void;
}

export interface IRoleUpdatePayload extends IRoleCreatePayload {
  id: number;
}

export interface IRoleDeletePayload {
  id: number;
  callback(): void;
}

export interface IRole {
  role_id: 14;
  role_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  userRoles: IUserRole[] | [];
}

interface IUserRole {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
}
