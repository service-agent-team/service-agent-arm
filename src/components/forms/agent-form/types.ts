export interface IParam {
  categoryId: number;
  companyId: number;
  currency: string;
  rolePerm: string;
  projectId: number[];
  permissionId: number;
  multipe_account: boolean;
  projectPerId: number[];
  projectPerm: string[];
}

export interface IProjectPermissions {
  projectId: number;
  permissions: number[];
}
