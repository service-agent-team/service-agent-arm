export interface ICarInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  car: ICar[] | null;
  errors: unknown | string[] | string;
}

export interface ICar {
  carId: number;
  driverId: number;
  number: string;
  modelId: number;
  imageId: string;
  createdAt: string;
}

export interface ICarResponse {
  data: ICar[];
}

export interface ICarByIdResponse {
  data: ICar;
}

export interface ICarCreateResponse {}
export interface ICarEditResponse {}
export interface ICarEditpayload {
  number: string;
  modelId: number;
  id: number | string;
  callback: () => void;
}

export interface ICarCreatepayload {
  number: string;
  modelId: number;
  callback: () => void;
}

export interface ICarByIdPayload {
  id: number | string;
  callback: () => void;
}

export interface ICreateCarPricePayload {
  tarifid: number;
  carId: number;
  carTypeId: number;
  price: number;
  callback: () => void;
}
