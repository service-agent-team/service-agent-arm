export interface ICarModelInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  carModel: ICarModel[] | null;
  errors: unknown | string[] | string;
}

export interface ICarModel {
  modelId: number;
  name: string;
}

export interface ICarModelResponse {
  data: ICarModel[];
}

export interface ICarModelPayload {
  callback: (data: any) => void;
}

export interface ICarModelCreadPayload {
  body: { name: string };
  callback: (data: any) => void;
}

export interface ICarModelUpdatePayload {
  id: number;
  body: { name: string };
  callback: (data: any) => void;
}
