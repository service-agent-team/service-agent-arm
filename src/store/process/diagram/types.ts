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
  diagram: IDiagram;
  created_at: string;
  updated_at: string;
}

export interface IDiagram {
  objects: IObject[];
  messages: IMessage[];
  created_at: string;
  updated_at: string;
}

export interface IProcessBody {
  name: string;
  diagram: IDiagram;
  project: number;
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
export interface IMessage {
  id: string;
  name: string;
  receiver: string;
  sender: string;
}

export interface IObject {
  id: string;
  name: string;
}
