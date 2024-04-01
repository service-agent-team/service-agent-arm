export interface IRoleInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    patch: boolean;
    delete: boolean;
  };
  roles: IRole[] | null;
  errors: unknown | string[] | string;
}

export interface IRoleResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IRole[];
}

export interface IRolePayload {
  callback(): void;
}

// export interface IRoleCreateResponse {
//   success: boolean;
//   status: number;
//   msg: string;
//   data: IRole;
// }

// export interface IRoleCreatePayload {
//   userRoleName: string;
//   userId: number;
//   userRoleDescription: string;
//   roleId: number;
//   callback(): void;
// }

export interface IRole {
  role_id: 14;
  role_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  userRoles: IUser_Roles[] | [];
}

interface IUser_Roles {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
}
