import { FacilityLanguageType } from '../facility/types';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  facilityCategories: IFacilityCategory[] | null;
  facilityCategory: IOneFacilityCategory | null;
  errors: unknown | string[] | string;
}

export interface IFacilityCategory {
  id: number;
  name: string;
  languageType: FacilityLanguageType;
  translations: any[];
}

export interface IOneFacilityCategory {
  id: number;
  name: string;
  languageType: FacilityLanguageType;
}

export interface IFacilityCategoryResponse {
  content: IFacilityCategory[];
  count: number;
}

export interface IFacilityCategoryPayload {
  page: number;
  size: number;
}

export interface IGetOneFacilityCategoryPayload {
  id: number;
  lang: FacilityLanguageType;
}

export interface IFacilityCategoryBody {
  name: string;
}

export interface IFacilityCategoryCreatePayload extends IFacilityCategoryBody {
  callback?(): void;
}

export interface IFacilityCategoryUpdatePayload {
  id: number;
  lang: FacilityLanguageType;
  body: IFacilityCategoryBody;
  callback?(): void;
}

export interface IFacilityCategoryDeletePayload {
  id: number;
  callback?(): void;
}
