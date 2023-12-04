export interface IUserInitalState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  users: IUserResponseData[] | null;
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

export interface IUserResponseData {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
  userPermission: any[];
  userRoles: UserRoles[];
}

export interface UserRoles {
  user_roles_id: number;
  user_role_name: string;
  user_role_description: string;
}
