export interface IAgentProjectInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  agentProjects: IAgentProjectV2[] | null;
  agentProject: IAgentProjectV2 | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IAgentProject {
  id: number;
  name: string;
  description: string;
  status: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface IAgentProjectV2 {
  projectId: number;
  name: string;
  description: string;
  status: string;
}

export interface IAgentProjectPayload {
  pageNumber: number;
  pageSize: number;
  callback: () => void;
}

export interface ICreteAgentProjectPayload {
  callback: () => void;
  name: string;
  description: string;
}

export interface IUpdateProjectPayloadV2 {
  id: string;
  callback: () => void;
  name: string;
  description: string;
}

export interface IDeleteAgentProjectPayload {
  callback: () => void;
  id: number | string;
}

export interface IAgentProjectResponse {
  success: boolean;
  message: string;
  data: IAgentProject[] | null;
}

export interface IAgentProjectResponseV2 {
  content: IAgentProjectV2[];
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

export interface ICreateAgentProjectResponse {
  success: boolean;
  httpStatus: string;
  data: IAgentProjectV2;
  date: string;
}

export interface IDeleteAgentProjectResponse {
  message: string;
  data: {
    success: true;
    httpStatus: string;
    code: number;
    message: string;
  };
}

export interface IDeleteAgentProjectResponseV2 {
  message: string;
  data: {
    success: boolean;
    httpStatus: string;
    data: string;
    date: string;
  };
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
