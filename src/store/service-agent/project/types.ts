export interface IProductInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  projects: IProject[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IProductResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IProject[];
}

export interface IProject {
  project_id: string;
  project_name: string;
  project_description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  userPermission: IUserPermission[];
}

export interface IUserPermission {
  user_permission_id: number;
}

export interface IProductPayload {
  callback: () => void;
}
