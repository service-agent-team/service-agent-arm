export interface InitialState {
  tariffs: ITariffData[] | null;
  tariff: ITariffData | null;
  status: string;
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  error: null | string | unknown;
}

import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IAgentTariffResponse extends AxiosResponse {
  data: ITariffData[] | null;
}

export interface ITariffDeletePayload {
  id: number | string;
  callback: () => void;
}

export interface ITariffCreatePayload {
  tariffName: string;
  categoryId: number;
  callback: () => void;
}
export interface ITariffData {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface ITariffPayload {
  callback: () => void;
}
