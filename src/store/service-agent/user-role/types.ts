export interface IAgentUserRolesInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  // oneRole: IAgentUserRoles | null;
  agentUserRoles: IAgentUserRoles[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadRolesEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IAgentUserRoles {
  id: number;
  userId: number;
  roleId: number;
}

export interface IAgentUserRolesGetResponse {
  data: IAgentUserRoles[];
  message: string;
}
export interface IAgentUserRolesGetResponsePayload {
  callback: () => void;
}

export interface IRolesByIdResponse {
  data: IAgentUserRoles;
}

export interface IRolesByIdPayload {
  id: number | string;
}

export interface IAgentUserRolesCreateResponse {}
export interface IRolesEditResponse {}

export interface IAgentUserRolesCreatePayload {
  userId: number;
  roleId: number;
  callback: () => void;
}

export interface IRolesEditPayload {
  id: number | string;
  name: string;
  description: string;
  callback: () => void;
}

export interface IRolesDisablePayload {
  id: number | string;
  callback: () => void;
}
