import { ICreateCarDirection, IGlobalCountry } from '@/types';
import { ILetsTripTransferCategory } from '../transfer-category/types';

export interface ILetsTripTransferInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  modal: {
    car_settings: boolean;
    type: 'edit' | 'create';
  };
  car_details: {
    select_car_id: number | null;
    select_car_direction: IDirection | null;
  };
  global_countries: IGlobalCountry[];
  country_regions: IGlobalCountry[];
  transfers: ILetsTripTransfer[];
  activeTransfers: ILetsTripTransfer[] | null;
  searchTransfers: ILetsTripTransfer[] | null;
  transfer: ILetsTripTransfer | null;
  deleted: boolean;
  errors: unknown | string[] | string;
}

export interface ILetsTripTransfer {
  id: number;
  name: Name;
  category: ILetsTripTransferCategory;
  pictures: string[];
  manufactureDate: string;
  directions: IDirection[];
  luggage: number;
  seats: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface IDirection {
  id: number;
  transferPrice: number;
  hourlyPrice: number;
  oldTransferPrice: number;
  oldHourlyPrice: number;
  sourceBoundary: Boundary;
  destinationBoundary: Boundary;
  destinationBoundaryId: number;
  sourceBoundaryId: number;
}

export interface Boundary {
  id: number;
  name: Name;
  code: string;
  type: string;
}

export interface Name {
  id?: number;
  en: string;
  ru: string;
  uz: string;
}

export interface ILetsTripTransferResponse {
  content: ILetsTripTransfer[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface ILetsTripTransferCreateResponse extends ILetsTripTransfer {}

export interface ILetsTripTransferPayload {
  page: number;
  size: number;
}

export interface ILetsTripTransferSearchPayload {
  callback?(): void;
  page: number;
  size: number;
  name: string;
}

export interface ILetsTripTransferGetOnePayload {
  callback(): void;
  carId: number;
}

export interface ILetsTripTransferGetByCategoryIdPayload {
  categoryId: number;
  page: number;
  size: number;
}
export interface ILetsTripTransferCreatePayload {
  callback(): void;
  body: {
    name: Name;
    carCategoryId: number;
    seats: number;
    luggage: number;
    pictures: string[];
    manufactureDate: string;
  };
}

export interface ILetsTripTransferUpdatePayload {
  callback(): void;
  carId: number;
  body: {
    carCategoryId: number;
    seats: number;
    luggage: number;
    manufactureDate: string;
  };
}

export interface ILetsTripTransferUpdateI18Payload {
  callback(): void;
  id: number;
  body: Name;
}

export interface ILetsTripTransferDeletePayload {
  callback(): void;
  carId: number;
}

export interface ICreateTransferDirectionPay {
  carId: number;
  direction: ICreateCarDirection;
  callback?: () => void;
}

export interface IUpdateDirectionPayload {
  directionId: number;
  carId: number;
  body: Partial<ICreateCarDirection>;
  callback?: () => void;
}

export interface IDeleteDirectionPay {
  carId: number;
  directionId: number;
  callback?: () => void;
}

export interface ICountryRegions {
  countryId: number;
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
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
