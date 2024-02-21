import { IBaseReponseTransfer, IPagination } from '@/common/interfaces';

export interface ICarTypeInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  carTypeOne: ICarType | null;
  carType: ICarType[] | null;
  pagination: IPagination | null;
  errors: unknown | string[] | string;
}

export enum PayloadTariffEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface ICarType {
  carTypeId: number;
  numberOfSeats: number;
  numberOfBaggages: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICarTypeResponse extends IBaseReponseTransfer<ICarType> {}

export interface ICarTypeCreatepayload {
  numberOfBaggages: number;
  numberOfSeats: number;
  callback: () => void;
}

export interface ItariffEditpayload {
  id: number | string;
  numberOfBaggages: number;
  numberOfSeats: number;
  callback: () => void;
}

export interface ICarTypeByIdPayload {
  id: number | string;
  callback: () => void;
}

export interface IcarTypeDeletePayload {
  id: number | string;
  callback: () => {};
}
