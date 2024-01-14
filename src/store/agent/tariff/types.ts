export interface InitialState {
  tariffs: ITaeiffData[] | null;
  tariff: ITaeiffData | null;
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

export interface IAgentTariffResponse {
  status: number;
  success: boolean;
  message: string;
  data: ITaeiffData[] | null;
}

export interface ITaeiffData {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface ITariffPayload {
  callback: () => void;
}
