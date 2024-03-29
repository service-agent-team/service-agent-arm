export interface IAgentUserRolesInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  agentUserOneRole: IAgentUserRoles | null;
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
  message: string;
  data: IAgentUserRoles[];
}

export interface IAgentUserRolesGetOneResponse {
  message: string;
  data: IAgentUserRoles;
}

export interface IAgentUserRolesGetResponsePayload {
  callback: () => void;
}
export interface IAgentUserRolesGetOneResponsePayload {
  id: number | string;
  callback: () => void;
}

export interface IAgentUserRolesCreateResponse {
  message: string;
  data: IAgentUserRoles;
}
export interface IAgentUserRolesEditResponse {}

export interface IAgentUserRolesCreatePayload {
  userId: number;
  roleId: number;
  callback: () => void;
}

export interface IAgentUserRolesUpdatePayload {
  id: number | string;
  userId: number;
  roleId: number;
  callback: () => void;
}

export interface IAgentUserRolesDeletePayload {
  id: number | string;
  callback: () => void;
}

export interface IAgentUserRolesEditPayload {
  id: number | string;
  name: string;
  description: string;
  callback: () => void;
}

export interface IRolesDisablePayload {
  id: number | string;
  callback: () => void;
}
