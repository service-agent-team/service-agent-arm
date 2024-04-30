export interface IAgentPermissionInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  permission: IAgentPermissionV2 | null;
  permissions: IAgentPermissionV2[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IAgentPermission {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface IAgentPermissionPayload {
  callback(): void;
}

export interface IAgentPermissionV2 {
  permissionId: number;
  name: string;
  description: string;
  type: IAgentPermissionType;
}

export enum IAgentPermissionType {
  FOR_USER_ROLE = 'FOR_USER_ROLE',
  FOR_USER_TARIFF = 'FOR_USER_TARIFF',
  FOR_USER_PROJECT = 'FOR_USER_PROJECT',
}

export interface IAgentPermissionResponse {
  data: IAgentPermission[];
}

export interface IAgentPermissionResponseV2 {
  content: IAgentPermissionV2[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  empty: boolean;
}

export interface IGetOneAgentPermissionResponse extends IAgentPermissionV2 {}

export interface IAgentPermissionCreateResponseV2 {
  success: boolean;
  httpStatus: string;
  data: IAgentPermissionV2;
  date: string;
}

export interface IAgentPermissionByID {
  data: IAgentPermissionV2;
}

export interface IByIdPayload {
  id: number | string;
}

export interface IPermissionCreatePayload {
  name: string;
  description: string;
  createdByUser: number;
  callback: () => void;
}

export interface IAgentPermissionCreatePayloadV2 {
  name: string;
  description: string;
  type: IAgentPermissionType;
  callback: () => void;
}

export interface IPermissionEditPayload {
  id: number | string;
  name: string;
  description: string;
  createdByUser: number;
  callback: () => void;
}

export interface IAgentPermissionEditPayloadV2 {
  id: number | string;
  name: string;
  description: string;
  type: IAgentPermissionType;
  callback: () => void;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}
