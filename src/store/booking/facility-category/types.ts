import { LanguageType } from '@/common/enum';
import { TBreakfastTranslation } from '@/types/booking';

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
  languageType: LanguageType;
  translations: TBreakfastTranslation[];
}

export interface IOneFacilityCategory {
  id: number;
  name: string;
  languageType: LanguageType;
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
  lang: LanguageType;
}

export interface IFacilityCategoryBody {
  name: string;
}

export interface IFacilityCategoryTranslationBody {
  name: string;
  categoryId: number;
  languageType: LanguageType;
}

export interface ICreateTranslationPayload {
  callback?(): void;
  body: IFacilityCategoryTranslationBody;
}

export interface ICreatePayload extends IFacilityCategoryBody {
  callback?(): void;
}

export interface ICreateFacilityCategoryTranslationPayload {
  callback?(): void;
  body: IFacilityCategoryTranslationBody;
}

export interface IFacilityCategoryUpdatePayload {
  id: number;
  lang: LanguageType;
  body: IFacilityCategoryBody;
  callback?(): void;
}

export interface IFacilityCategoryDeletePayload {
  id: number;
  callback?(): void;
}

export interface IDeleteTranslationPayload {
  id: number;
  lang: LanguageType;
  callback?(): void;
}
