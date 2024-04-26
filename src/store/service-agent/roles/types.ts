export interface IRolesInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  oneRole: IRolesV2 | null;
  allRole: IRolesV2[] | null;
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
  data: IRolesV2;
}

export interface IRolesByIdPayload {
  id: number | string;
  callback: () => void;
}

export interface IRolesCreateResponse {}
export interface IRolesEditResponse {}

export interface IRolesCreatePayload {
  name: string;
  description: string;
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

export interface IRolesResponseV2 {
  message: string;
  data: {
    content: IRolesV2[];
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
  };
}

export interface IRolesPayloadV2 {
  callback(): void;
  pageSize: number;
  pageNumber: number;
}

export interface IRolesCreateResponseV2 {
  success: boolean;
  httpStatus: string;
  data: IRolesV2;
  date: string;
}

export interface IRolesDeleteResponseV2 {
  success: boolean;
  httpStatus: string;
  data: string;
  date: string;
}

export interface IRolesV2 {
  roleId: number;
  name: string;
  description: string;
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
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
