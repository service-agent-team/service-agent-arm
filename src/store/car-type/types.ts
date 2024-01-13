export interface ICarTypeInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  carType: ICarType[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadTariffEnum {
  get = 'get',
  post = 'post',
}

export interface ICarType {
  carTypeId: number;
  withBaggage: boolean;
  numberOfSeats: number;
  createdAt: string;
  isDeleted: boolean;
}

export interface ICarTypeResponse {
  data: ICarType[];
}

export interface ICarTypeByIdResponse {
  data: ICarType;
}

export interface ICartypeCreateResponse {}
export interface ICarTypeEditResponse {}

export interface ICarTypeCreatepayload {
  withBaggage: boolean;
  numberOfSeats: number;
  callback: () => void;
}

export interface ItariffEditpayload {
  id: number | string;
  withBaggage: boolean;
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
