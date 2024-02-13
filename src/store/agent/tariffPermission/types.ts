export interface InitialState {
  permissions: IPermissionTariffData[] | null;
  permission: IPermissionTariffData | null;
  status: string;
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  error: null | string | unknown;
}

export interface IPermissionTariffData {
  userTariffId: number;
  userId: number;
  permissionId: number;
}

export interface IAgentTariffResponse {
  status: number;
  success: boolean;
  message: string;
  data: IPermissionTariffData[] | null;
}

export interface ICreateTarifPerResponse {
  status: number;
  success: boolean;
  message: string;
  data: IPermissionTariffData | null;
}

export interface ITariffPermission {
  userTariffId: number;
  userId: number;
  permissionId: number;
  callback: () => void;
}
