export interface InitialState {
  data: IUserDataV2[] | null;
  agent: IUserDataV2 | null;
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
import { IAgentPermissionV2 } from '../permission/types';
import { IAgentTariffV2 } from '../tariff/types';
import { IAgentProjectV2 } from '../project/types';

export interface IAuthAxiosResponse extends AxiosResponse {}

export interface IUserResponse {
  status: number;
  success: boolean;
  message: string;
  data: IUserDataV2[] | null;
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

export interface IUserDataV2 {
  userId: number;
  login: string;
  firstName?: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  citizenship: string;
  country: string;
  city: string;
  address: string;
  photoURL: string[] | string;
  userCurrentStatus: string;
  isRegistrationMyId: boolean;
  isRegistrationContract: boolean;
  userContractId: number;
  isContracted: boolean;
  videoContentId: any;
  signatureId: any;
  contractStatus: any;
  startDate: any;
  finishDate: any;
  userTariffPermissions: UserTariffPermission[];
  userProjectPermissions: UserProjectPermission[];
  userRolePermissions: RolePermission[];
}

export interface UserTariffPermission {
  tariff: IAgentTariffV2;
  permissions: IAgentPermissionV2;
}

export interface UserProjectPermission {
  project?: IAgentProjectV2;
  permissions: IAgentPermissionV2[];
}

export interface RolePermission {
  id: number;
  role: Role;
  permissions: IAgentPermissionV2[];
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface UserTariff {
  userTariffId: number;
  tariffName: string;
  categoryId: number;
  createAt: string;
}

export interface UserPermission {
  userPermissionId: number;
  project: Project;
  permission: Permission2;
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
  role: RoleV2;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  createdDateTime: string;
  updateDateTime: string;
}

export interface RoleV2 {
  roleId: number;
  name: string;
  description: string;
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
  date: IUserDataV2;
}
