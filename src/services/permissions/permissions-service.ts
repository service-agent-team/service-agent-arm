import { $axios } from '@/common/config';
import { IPermissionCreateResponse, IPermissionResponse } from '@/store';
import { ICreatePermissionAxiosPayload } from '../../store/global/permission/types';
import { EndPointes } from '../endpoints';
export const UserPermissionService = {
  async getPermissions() {
    const response = await $axios.get<IPermissionResponse>(EndPointes.permissions.getAll);
    return response;
  },

  async createPermission(body: ICreatePermissionAxiosPayload) {
    const response = await $axios.post<IPermissionCreateResponse>(EndPointes.permissions.create, {
      permissionName: body.permissionName,
      permissionDescription: body.permissionDescription,
    });
    return response;
  },
};
