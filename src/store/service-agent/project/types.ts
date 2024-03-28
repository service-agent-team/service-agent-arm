export interface IAgentProjectInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  agentProjects: IAgentProject[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IAgentProjectPayload {
  callback: () => void;
}

export interface ICreteAgentProjectPayload {
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

export interface ICreateAgentProjectResponse {
  message: string;
  data: {
    success: boolean;
    httpStatus: string;
    code: number;
    message: string;
    data: IAgentProject;
  };
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

export interface IAgentProject {
  id: number;
  name: string;
  description: string;
  status: string;
  createdDateTime: string;
  updateDateTime: string;
}
