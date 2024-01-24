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
  carNumber: string;
  driverId: number;
  modelId: number;
  modelName: string;
  imageId: string;
  createdAt: string;
  driverName?: string;
  driverPhone?: string;
}

export interface ICarResponse {
  data: {
    content: ICar[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort2;
    first: boolean;
    empty: boolean;
  };
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
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
  file: any;
  carNumber: string;
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
