export interface IRolesInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  oneUserRole: IRoles | null;
  userRoles: IRoles[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadRolesEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IRoles {
  userId: number;
  roleId: number;
}

export interface IRolesResponse {
  data: IRoles[];
}

export interface IRolesByIdPayload {
  id: number | string;
}

export interface IAgentRolesPayload {
  userId: number;
  roleId: number;
  callback: () => void;
}
