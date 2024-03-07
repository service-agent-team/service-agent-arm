export interface IEditPayload<T> {
  id: string | number;
  callback?: () => void;
  payload: T;
}

export interface ICreatePayload<T = undefined> {
  payload: T;
  callback?: () => void;
}

export interface IDeletePayload {
  id: string | number;
  callback?: () => void;
}

export interface IGetOnePayload<T = undefined> {
  id: string | number;
  callback?: () => void;
  payload?: T;
}

export interface IGetAllPayload<T = undefined> {
  id: string | number;
  callback?: () => void;
  payload?: T;
}

export interface IStoreType {
  loading: {
    get?: boolean;
    post?: boolean;
    put?: boolean;
    patch?: boolean;
    delete?: boolean;
  };
  errors: unknown | string[] | string;
}
