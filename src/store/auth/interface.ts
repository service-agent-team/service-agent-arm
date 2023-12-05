export interface InitialState {
  user: any | null;
  token: string | null;
  isAuth: boolean;
  loading: {
    sign: boolean;
  };
  error: null | string | unknown;
}

import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IAuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: IAuthData;
  refresh_token: string;
  access_token: string;
}

export interface IAuthData {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthSignIn {
  email: string;
  password: string;
  callback: (data: IAuthResponse) => void;
}
