export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  process: IProcess | null;
  processes: IProcess[] | null;
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
  input: string;
}

export interface ICreateProcessPayload {
  body: IProcessBody;
  cb(): void;
}

export interface IUpdateProcessPayload extends ICreateProcessPayload {
  id: number;
}

export interface IProcessPayload {
  id: number;
  cb(): void;
}
