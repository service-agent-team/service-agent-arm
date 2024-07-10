export interface IParam {
  categoryId: number;
  companyId: number;
  currency: string;
  projectId: number[];
  multipe_account: boolean;
  projectPerId: number[];
  rolePerm: IRolePermission[];
  tariffPerm: ITariffPermission[];
  projectPerm: IProjectPermission[];
}

export interface IRolePermission {
  roleId: number;
  rolePermissions: IRolePerm[];
}

export interface IProjectPermission {
  projectId: number;
  projectPermissions: IPermission[];
}

export interface ITariffPermission {
  tariffId: number;
  tariffPermissions: ITariffPerm[];
}

interface IPermission {
  projPermId: number;
  projPermIsActive: boolean;
}

interface IRolePerm {
  rolePermId: number;
  rolePermIsActive: boolean;
}

interface ITariffPerm {
  tariffPermId: number;
  tariffPermIsActive: boolean;
}
