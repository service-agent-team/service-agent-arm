export interface IRolesInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  oneRole: IRoles | null;
  roles: IRoles[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadRolesEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IRoles {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface IRolesResponse {
  data: IRoles[];
}

export interface IRolesByIdResponse {
  data: IRoles;
}

export interface IRolesByIdPayload {
  id: number | string;
}

export interface IRolesCreateResponse {}
export interface IRolesEditResponse {}

export interface IRolesCreatepayload {
  name: string;
  description: string;
  callback: () => void;
}

export interface IRolesEditpayload {
  id: number | string;
  name: string;
  description: string;
  callback: () => void;
}

export interface IRolesDisablePayload {
  id: number | string;
  callback: () => void;
}
