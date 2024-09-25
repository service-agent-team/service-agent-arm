import { IProcess } from '../diagram/types';

export interface ICarInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  project: IProcessProject | null;
  projects: IProcessProject[] | null;
  errors: unknown | string[] | string;
}

export interface IProcessProject {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  processes: IProcess[];
}

export interface IProcessProjectBody {
  name: string;
  description: string;
}

export interface ICreateProcessProjectPayload {
  body: IProcessProjectBody;
  cb(): void;
}

export interface IUpdateProcessPayload extends ICreateProcessProjectPayload {
  id: number;
}

export interface IProcessProjectPayload {
  id: number;
  cb(): void;
}
