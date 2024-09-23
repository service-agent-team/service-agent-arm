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
  taxes: ITaxe[] | null;
  taxe: IGetOneTaxe | null;
  errors: unknown | string[] | string;
}

export interface ITaxe {
  id: number;
  name: string;
  languageType: LanguageType;
  translations: TBreakfastTranslation[];
}

export interface IGetOneTaxe {
  id: number;
  name: string;
  languageType: LanguageType;
  translations: TBreakfastTranslation[];
}

export interface ITaxeBody {
  name: string;
}

export interface ITaxeTranslationBody {
  name: string;
  taxId: number;
  languageType: LanguageType;
}

export interface IGetAllResponse {
  data: ITaxe[];
  count: number;
}

export interface IGetAllPayload {}

export interface IGetOneResponse extends IGetOneTaxe {}

export interface IGetOnePayload {
  id: number;
  lang: LanguageType;
}

export interface ICreateResponse {
  data: IGetOneTaxe;
}

export interface ICreatePayload extends ITaxeBody {
  callback?(): void;
}

export interface ICreateTranslationPayload {
  callback?(): void;
  body: ITaxeTranslationBody;
}

export interface IUpdateResponse {
  data: IGetOneTaxe;
}

export interface IUpdatePayload {
  id: number;
  lang: LanguageType;
  body: ITaxeBody;
  callback?(): void;
}

export interface IDeletePayload {
  id: number;
  callback?(): void;
}

export interface IDeleteTranslationPayload extends IDeletePayload {
  lang: LanguageType;
}
