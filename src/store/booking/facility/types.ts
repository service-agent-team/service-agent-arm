import { LanguageType } from '@/common/enum';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  facilities: IFacility[] | null;
  facility: IOneFacility | null;
  errors: unknown | string[] | string;
}
export interface IFacility {
  id: number;
  name: string;
  type: FacilityType;
  languageType: LanguageType;
  translations: any[];
  category: Category;
  common: boolean;
}

export interface IOneFacility {
  id: number;
  name: string;
  facilityType: FacilityType;
  description: string;
  languageType: LanguageType;
  category: Category;
  common: boolean;
}

export interface IFacilityResponse {
  content: IFacility[];
  count: number;
}

export interface IFacilityCreateResponse {
  data: IFacility;
}

export interface IGetOneFacilityPayload {
  id: number;
  lang: LanguageType;
  callback?(): void;
}

export interface IFacilityPayload {
  page: number;
  size: number;
}

export interface IFacilityBody {
  name: string;
  description: string;
  facilityType: FacilityType;
  isCommon: true;
  categoryId: string;
}

export interface ICreateFacilityPayload extends IFacilityBody {
  callback?(): void;
}

export interface IFacilityTranslationBody {
  facilityId: number;
  name: string;
  description: string;
  languageType: LanguageType;
}

export interface ICreateTranslationPayload {
  callback?(): void;
  body: IFacilityTranslationBody;
}

export interface IUpdateFacilityPayload {
  id: number;
  lang: LanguageType;
  body: IFacilityBody;
  callback?(): void;
}

export interface IFacilityDeletePayload {
  id: number;
  callback(): void;
}

export interface IDeleteTranslationFacilityPayload {
  id: number;
  lang: LanguageType;
  callback(): void;
}

export enum FacilityType {
  PROPERTY = 'PROPERTY',
  ROOM = 'ROOM',
  UNKNOWN = 'UNKNOWN',
}

export interface Category {
  id: number;
  name: string;
  languageType: LanguageType;
}
