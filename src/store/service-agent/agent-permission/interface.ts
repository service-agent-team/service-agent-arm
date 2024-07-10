export interface InitialState {
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

interface IUpdateAgentPermission {
  callback: () => void;
  userId: number;
  permissionIds: number[];
}

export interface IUpdateAgentRolePermissionPayload extends IUpdateAgentPermission {
  roleId: number;
}

export interface IUpdateAgentTariffPermissionPayload extends IUpdateAgentPermission {
  tariffId: number;
}

export interface IUpdateAgentProjectPermissionPayload extends IUpdateAgentPermission {
  projectId: number;
}

export interface IAddAgentRolePayload {
  callback: () => void;
  userId: number;
  roleId: number;
}

export interface IAddAgentRolePermissionPayload extends IAddAgentRolePayload {
  permissionId: number;
}

export interface IAddAgentProjectPayload {
  callback: () => void;
  userId: number;
  projectId: number;
}

export interface IAddAgentProjectPermissionPayload extends IAddAgentProjectPayload {
  permissionId: number;
}

export interface IAddAgentRolePermissionResponse {
  success: boolean;
  httpStatus: number;
  data: IResponse;
  date: string;
}

interface IResponse {
  success: boolean;
  httpStatus: number;
  data: string;
  date: string;
}
