export interface IAgentPermissionInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  permission: IPermission | null;
  permissions: IPermission[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IPermission {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface IAgentPermissionResponse {
  data: IPermission[];
}

export interface IAgentPermisionByID {
  data: IPermission;
}

export interface IByIdPayload {
  id: number | string;
}

export interface IPermissionCreatepayload {
  name: string;
  description: string;
  createdByUser: number;
  callback: () => void;
}

export interface IPermissionEditpayload {
  id: number | string;
  name: string;
  description: string;
  createdByUser: number;
  callback: () => void;
}
