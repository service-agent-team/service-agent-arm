export interface ITariffInitalState {
  loading: {
    get: boolean;
    post: boolean;
  };
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
