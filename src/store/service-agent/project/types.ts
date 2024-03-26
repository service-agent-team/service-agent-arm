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

export interface IAgentProjectResponse {
  success: boolean;
  message: string;
  data: IAgentProject[] | null;
}

export interface IAgentProject {
  id: number;
  name: string;
  description: string;
  status: string;
  createdDateTime: string;
  updateDateTime: string;
}
