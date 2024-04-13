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
  id: number;
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
  login: string;
  authType: number;
  userCurrentStatus: number;
  isRegistrationMyId: boolean;
  isRegistrationContract: boolean;
  userTariffPermissions: UserTariffPermission[];
  userPermissions: UserPermission[];
  userRoles: UserRole[];
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

export interface UserTariffPermission {
  userTariffPermissionId: number;
  userTariff: UserTariff;
  permission: Permission;
}

export interface UserTariff {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface UserPermission {
  userPermissionId: number;
  project: Project;
  permission: Permission2;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface Permission2 {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface UserRole {
  userRolesId: number;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface IUser {
  callback: () => void;
  statusName: string;
}

export interface IParams {
  userId: number;
  companyId: number;
  currency: string;
  callback: () => void;
}

export interface IOneAgentParams {
  callback: () => void;
  userId: number;
}

export interface IRejectParam {
  callback: () => void;
  userId: number;
}

export interface IData {
  userId: number;
  companyId: number;
  currency: string;
}

export interface IOneAgentResponse extends AxiosResponse {
  date: IUserData;
}
