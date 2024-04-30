export interface ILetsTripCountryInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  countries: ILetsTripCountry[] | null;
  country: ILetsTripCountry | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripCountry {
  id: number;
  name?: string;
  code: string;
  regions: any[];
  imageUrl: string;
}

export interface ILetsTripCountryResponse {
  data: ILetsTripCountry[];
}

export interface IGetOneLetsTripTourResponse extends ILetsTripCountry {}

export interface ILetsTripCountryCreateResponse extends ILetsTripCountry {}

export interface ILetsTripCountryPayload {
  callback(): void;
  page: number;
  size: number;
}

export interface ILetsTripCountryGetOnePayload {
  callback(): void;
  id: string;
}

export interface ILetsTripCountryCreatePayload {
  callback(): void;
  name: Name;
  imageUrl: string;
  code: string;
}

export interface Name {
  ru: string;
  en: string;
}
