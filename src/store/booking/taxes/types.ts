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
  bedTypes: IBedType[] | null;
  bedType: IGetOneBedType | null;
  errors: unknown | string[] | string;
}

export interface IBedType {
  id: number;
  name: string;
  size: string;
  languageType: LanguageType;
  translations: TBreakfastTranslation[];
}

export interface IGetOneBedType {
  id: number;
  name: string;
  description: string;
  size: string;
  lang: LanguageType;
}

export interface IBetTypeBody {
  name: string;
  description: string;
  size: string;
}

export interface IBetTypeTranslationBody {
  name: string;
  description: string;
  size: string;
  bedTypeId: number;
  languageType: LanguageType;
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
  lang: LanguageType;
}

export interface ICreateResponse {
  data: IGetOneBedType;
}

export interface ICreatePayload extends IBetTypeBody {
  callback?(): void;
}

export interface ICreateTranslationPayload {
  callback?(): void;
  body: IBetTypeTranslationBody;
}

export interface IUpdateResponse {
  data: IGetOneBedType;
}

export interface IUpdatePayload {
  id: number;
  lang: LanguageType;
  body: IBetTypeBody;
  callback?(): void;
}

export interface IDeletePayload {
  id: number;
  callback?(): void;
}

export interface IDeleteTranslationPayload extends IDeletePayload {
  lang: LanguageType;
}
