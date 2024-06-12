import { Pageable, Sort } from '@/types/response';

export interface ILetsTripGlobalCountryInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  globalCountries: ILetsTripGlobalCountry[] | null;
  globalCountry: ILetsTripGlobalCountry | null;
  locations: Location2[];
  selectCountry: ILetsTripGlobalCountry | null;
  errors: unknown | string[] | string;
}

export interface GlobalCountryResponse {
  success: boolean;
  status: number;
  data: GlobalCountryResponseData;
}

export interface GlobalCountryResponseData {
  content: ILetsTripGlobalCountry[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface GlobalCountryPayload {
  page: number;
  size: number;
}

export interface CreateGlobalCountryPayload {
  callback(): void;
  body: CreateGlobalCountryBody;
}

export interface CreateGlobalCountryBody {
  code: string;
  name: Name;
  lowerCorner: Location;
  upperCorner: Location;
  defaultLocation: Location;
  pictureUrl: string;
}

export interface UpdateImageGlobalCountryPayload {
  callback(): void;
  body: UpdateImageGlobalCountryBody;
}

export interface UpdateImageGlobalCountryBody {
  id: number;
  pictureUrl: string;
}

export interface deleteGlobalCountryPayload {
  callback(): void;
  countryId: number;
}

export interface ILetsTripGlobalCountry {
  id?: number;
  name: Name;
  lineString: string;
  lowerCorner: Location;
  upperCorner: Location;
  defaultLocation: Location;
  code: string;
  type: string;
  deleted: boolean;
  picture: string;
}

export interface Name {
  id?: number;
  ru: string;
  en: string;
  uz: string;
}

export interface Location {
  id?: number;
  longitude: number;
  latitude: number;
}

export interface Location2 {
  lat: number;
  lng: number;
}
