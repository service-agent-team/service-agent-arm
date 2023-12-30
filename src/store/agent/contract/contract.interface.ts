export interface InitialState {
  data: IUserData[] | null;
  status: string;
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  error: null | string | unknown;
  agent: null;
}

import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IUserResponse {
  status: number;
  success: boolean;
  message: string;
  data: IUserData[] | null;
}

export interface IUserData {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: any;
  gender: string;
  citizenship: string;
  country: string;
  city: string;
  address: string;
  photoURL: string | null | any;
  status: string;
  infoCreatedDateTime: any;
  infoStatusDateTime: any;
  login: string;
  authType: number;
  userCurrentStatus: number;
  isRegistrationMyId: boolean;
  isRegistrationContract: boolean;
}

export interface IUser {
  callback: () => void;
  statusName: string;
}
