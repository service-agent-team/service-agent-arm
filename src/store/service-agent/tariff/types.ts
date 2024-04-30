export interface InitialState {
  tariffs: IAgentTariffV2[] | null;
  tariff: IAgentTariffV2 | null;
  categories: IAgentCategory[] | null;
  status: string;
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  error: null | string | unknown;
}

import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IAgentTariffResponse extends AxiosResponse {
  data: IAgentTariff[] | null;
}

export interface IAgentTariffResponseV2 {
  content: IAgentTariffV2[];
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
}

export interface IGetOneAgentTariffCategoryResponseV2 extends IAgentTariffV2 {}

export interface IAgentCategoryResponse {
  content: IAgentCategory[];
}

export interface ITariffCreateResponseV2 {
  success: boolean;
  httpStatus: string;
  data: IAgentTariffV2;
  date: string;
}

export interface ITariffUploadResponseV2 extends ITariffCreateResponseV2 {}

export interface ITariffDeletePayload {
  id: number | string;
  callback: () => void;
}

export interface ITariffCreatePayload {
  tariffName: string;
  categoryId: number;
  callback: () => void;
}

export interface ITariffCratePayloadV2 {
  name: string;
  categoryId: number;
  callback: () => void;
}

export interface ITariffUpdatePayload extends ITariffCratePayloadV2 {
  id: string;
}

export interface IAgentTariff {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface IAgentTariffV2 {
  tariffId: number;
  name: string;
  categoryId: number;
}

export interface IAgentCategory {
  id: number;
  name: string;
  parent?: Parent;
  companyId?: number;
}

export interface ITariffPayload {
  callback: () => void;
}

export interface IGetOneTariffPayload extends ITariffPayload {
  id: string;
}

export interface IGetOneTariffCategoryResponseV2 extends IAgentTariffV2 {}

export interface IAgentCategoryPayload {
  pageNumber: number;
  pageSize: number;
  callback: () => void;
}

export interface Parent {
  id: number;
  name: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
