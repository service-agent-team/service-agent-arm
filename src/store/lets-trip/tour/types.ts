import { UploadChangeParam } from 'antd/es/upload';

export interface ILetsTripTourInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  tours: ILetsTripTour[] | null;
  tour: ILetsTripTour | null;
  categories: Category[] | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripTour {
  id: number;
  name?: string;
  names: Names;
  category: Category;
  company: Company;
  description?: string;
  descriptions: Descriptions;
  upTo2: number;
  upTo6: number;
  upTo10: number;
  upTo20: number;
  pictures: string[];
  currency: string;
  attributes: any;
  countryCode: string;
  departures: any[];
  itenararyLocalization?: ItenararyLocalization;
  createdAt: string;
  updatedAt: string;
  longitude: number;
  latitude: number;
  deleted: boolean;
}

export interface ILetsTripTourResponse {
  content: ILetsTripTour[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  empty: boolean;
}

export interface ICategoryResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    content: Category[];
  };
}

export interface ILetsTripTourCreateResponse extends ILetsTripTour {}

export interface ILetsTripPayload {
  callback(): void;
}

export interface ILetsTripTourCreatePayload {
  callback(): void;
  names: Names;
  categoryId: number;
  companyId: number;
  descriptions: Descriptions;
  upTo2: number;
  upTo6: number;
  upTo10: number;
  upTo20: number;
  pictures: string[];
  currency: CurrencyType;
  countryCode: CountyCodeType;
  longitude: number;
  latitude: number;
  attributes?: any[];
}

export enum CurrencyType {
  uzs = 'UZS',
  usd = 'USD',
}

export enum CountyCodeType {
  uz = 'UZ',
  ae = 'AE',
  tr = 'TR',
}

export interface Names {
  uz?: string;
  en?: string;
  ru?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  deleted: boolean;
}

export interface Descriptions {
  uz?: string;
  en?: string;
  ru?: string;
}

export interface Attributes {
  hour?: string;
  price?: string;
}

export interface ItenararyLocalization {
  uz: Uz;
  en: En;
  ru: Ru;
}

export interface Uz {
  attributes: Attributes2;
}

export interface Attributes2 {
  '08:00': string;
  '10:30': string;
  '14:00': string;
  '13:00': string;
  '07:00': string;
}

export interface En {
  attributes: Attributes2;
}

export interface Ru {
  attributes: Attributes2;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
