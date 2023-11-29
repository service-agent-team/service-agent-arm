export interface InitialState {
  data: IUserData[] | null;
  loading: {
    sign: boolean;
  };
  error: null | string | unknown;
}

import { AxiosResponse } from 'axios';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IUserResponse {
  status: number;
  success: boolean;
  message: string;
  data: IUserData[];
}

export interface IUserData {
  userId: number;
  firstName: any;
  lastName: any;
  middleName: any;
  birthDate: any;
  gender: any;
  citizenship: any;
  country: any;
  city: any;
  address: any;
  photoURL: any;
  status: any;
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
}
