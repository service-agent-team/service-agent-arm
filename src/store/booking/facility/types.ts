export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  facilities: IFacility[] | null;
  facility: IFacility | null;
  errors: unknown | string[] | string;
}
export interface IFacility {
  id: number;
  name: string;
  facilityType: string;
  description: string;
  languageType: string;
  category: Category;
  common: boolean;
}

export interface IFacilityResponse {
  content: IFacility[];
  count: number;
}

export interface IFacilityPayload {
  name: string;
  description: string;
  facilityType: 'PROPERTY';
  isBookable: true;
  categoryId: string;
}

export interface ICreateFacilityPayload {
  page: number;
  size: number;
}

export interface IFacilityDeletePayload {
  id: number;
  callback(): void;
}

export enum LanguageType {
  UZ = 'UZ',
  RU = 'RU',
  EN = 'EN',
  SP = 'SP',
  AR = 'AR',
  ZH = 'ZH',
  FR = 'FR',
}

export interface Category {
  id: number;
  name: string;
  languageType: LanguageType;
}
