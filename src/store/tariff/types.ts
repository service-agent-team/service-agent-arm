export interface ITariffInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
  };
  oneTariff: ITariff | null;
  tariff: ITariff[] | null;
  errors: unknown | string[] | string;
}

export enum PayloadTariffEnum {
  get = 'get',
  post = 'post',
}

export interface ITariff {
  tarifId: number;
  price: number;
  nameUz: string;
  nameRu: string;
  createdAt: string;
  isDeleted: boolean;
  minimalDuration: number;
}

export interface ITariffResponse {
  data: ITariff[];
}

export interface ITariffByIdResponse {
  data: ITariff;
}

export interface ITariffByIdPayload {
  tariffId: number | string;
}

export interface ITariffCreateResponse {}
export interface ITariffEditResponse {}

export interface ItariffCreatepayload {
  minimumDuration: number;
  nameUz: string;
  nameRu: string;
  callback: () => void;
}

export interface ItariffEditpayload {
  id: number | string;
  minimumDuration: number;
  nameUz: string;
  nameRu: string;
  callback: () => void;
}

export interface ITarriffDisablePayload {
  id: number | string;
  callback: () => void;
}
