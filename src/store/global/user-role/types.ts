export interface IUserRoleInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  userRoles: IUserRole[] | null;
  userRole: IUserRole | null;
  errors: unknown | string[] | string;
}

export interface IUserRoleResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserRole[];
}
export interface IOneUserRoleResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserRole;
}

export interface IUserRolePayload {
  callback(): void;
}

export interface IGetUserRolePayload {
  callback(): void;
  id: number;
}

export interface IUserRoleCreateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IUserRole;
}

export interface IUserRoleCreatePayload {
  userRoleName: string;
  userId: number;
  userRoleDescription: string;
  roleId: number;
  callback(): void;
}

export interface IUserRoleUpdatePayload extends IUserRoleCreatePayload {
  id: number;
}

export interface IUserRoleDeleteResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    raw: [];
    affected: 1;
  };
}

export interface IUserRoleDeletePayload {
  id: number | string;
  callback(): void;
}

export interface IUserRole {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
  user_id: IUser_Id | null;
  role_id: IRole_Id | null;
}

interface IUser_Id {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface IRole_Id {
  role_id: number;
  role_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
