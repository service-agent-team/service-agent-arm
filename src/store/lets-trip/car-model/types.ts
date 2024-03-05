import { ICarModel, ImageSet } from '@/types';

export interface ICarModelInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  carModels: ICarModel[] | null;
  image: ImageSet | null;
  carModel: ICarModel | null;
  errors: unknown | string[] | string | any;
}

export interface ICarModelResponse {
  content: ICarModel[];
}

export interface ICarModelPayload {
  callback: (data: any) => void;
  page?: number;
  size?: number;
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
