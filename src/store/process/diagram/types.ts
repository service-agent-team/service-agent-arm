export interface ICarInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  project: IProcess | null;
  projects: IProcess[] | null;
  errors: unknown | string[] | string;
}

export interface IProcess {
  id: number;
  name: string;
  input: string;
  created_at: string;
  updated_at: string;
}

export interface IProcessBody {
  name: string;
  description: string;
}

export interface ICreateProcessProjectPayload {
  body: IProcessBody;
  cb(): void;
}

export interface IUpdateProcessPayload extends ICreateProcessProjectPayload {
  id: number;
}

export interface IProcessPayload {
  id: number;
  cb(): void;
}
