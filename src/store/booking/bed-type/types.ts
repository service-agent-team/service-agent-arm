import { FacilityLanguageType } from '../facility/types';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  bedTypes: IBedType[] | null;
  bedType: IGetOneBedType | null;
  errors: unknown | string[] | string;
}

export interface IBedType {
  id: number;
  name: string;
  size: string;
  languageType: string;
  translations: any[];
}

export interface IGetOneBedType {
  id: number;
  name: string;
  description: string;
  size: string;
  lang: FacilityLanguageType;
}

export interface IBetTypeBody {
  name: string;
  description: string;
  size: string;
}

export interface IGetAllResponse {
  data: IBedType[];
  count: number;
}

export interface IGetAllPayload {
  page: number;
  size: number;
}

export interface IGetOneResponse extends IGetOneBedType {}

export interface IGetOnePayload {
  id: number;
  lang: FacilityLanguageType;
}

export interface ICreateResponse {
  data: IGetOneBedType;
}

export interface ICreatePayload extends IBetTypeBody {
  callback?(): void;
}

export interface IUpdateResponse {
  data: IGetOneBedType;
}

export interface IUpdatePayload {
  id: number;
  lang: FacilityLanguageType;
  body: IBetTypeBody;
  callback?(): void;
}

export interface IDeletePayload {
  id: number;
  callback?(): void;
}
