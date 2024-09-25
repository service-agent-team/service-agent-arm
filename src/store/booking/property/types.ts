import { LanguageType } from '@/common/enum';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  properties: IProperty[] | null;
  property: IProperty | null;
  errors: unknown | string[] | string;
}

export interface IPropertyTranslation {
  name: string;
  description: string;
  cityId: number;
  address: string;
  contactNumber: string;
  email: string;
  postcode: string;
  latitude: number;
  longitude: number;
  score: any;
  propertyType: string;
  starRating: string;
  iso: string;
  merchantId: number;
  checkinFrom: string;
  checkinUntil: string;
  checkoutFrom: string;
  checkoutUntil: string;
  mainAttachment: number;
  attachments: number[];
  languageType: string;
  childrenAllowed: boolean;
  petAllowed: boolean;
  freePet: boolean;
  confirmed: boolean;
}

export interface IProperty {
  id: number;
  name: string;
  description: string;
  cityId: number;
  address: string;
  contactNumber: string;
  email: string;
  postcode: string;
  latitude: number;
  longitude: number;
  score: any;
  propertyType: string;
  starRating: string;
  iso: string;
  merchantId: number;
  checkinFrom: string;
  checkinUntil: string;
  checkoutFrom: string;
  checkoutUntil: string;
  mainAttachment: number;
  attachments: number[];
  languageType: string;
  childrenAllowed: boolean;
  petAllowed: boolean;
  freePet: boolean;
  confirmed: boolean;
  translations?: IPropertyTranslation[];
}

export interface BedType {
  id: number;
  name: string;
  description: string;
  size: string;
  lang: LanguageType;
}

export interface IPropertyPayload {
  page: number;
  size: number;
}

export interface IPropertyTranslationBody {
  name: string;
  description: string;
  address: string;
  propertyId: number;
  languageType: LanguageType;
}

export interface IGetOneRoomPayload {
  id: number;
}

export interface ICreateRoomTranslationPayload {
  body: IPropertyTranslationBody;
  cb(): void;
}

export interface IDeleteRoomTranslationPayload {
  id: number;
  lang: LanguageType;
  cb(): void;
}

export interface IPropertyResponse<T> {
  content: T;
  count: number;
  totalCount: number;
}
