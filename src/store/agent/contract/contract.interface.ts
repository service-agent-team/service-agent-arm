export interface InitialState {
  data: IUserData[] | null;
  agent: IUserData | null;
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

export interface IUserResponse {
  status: number;
  success: boolean;
  message: string;
  data: IUserData[] | null;
}

export interface IUserData {
  userInfoId: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  citizenship: string;
  country: string;
  city: string;
  address: string;
  photoURL: any;
  infoCreatedAt: string;
  infoStatusAt: string;
  userContractId: number;
  isContracted: boolean;
  videoContentId: string;
  signature: string;
  contractStatus: string;
  startDate: string;
  finishDate: string;
  contractCreatedAt: string;
  contractStatusAt: string;
}

export interface IUser {
  callback: () => void;
  statusName: string;
}

export interface IParams {
  userId: number;
  callback: () => void;
}
