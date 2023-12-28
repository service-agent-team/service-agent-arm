import { $axios } from '@/config';
import { IPermissionResponse } from '@/store';
import { EndPointes } from '../endpoints';
export const UserPermissionService = {
  async getPermissions() {
    const response = await $axios.get<IPermissionResponse>(EndPointes.permissions.getAll);
    return response;
  },
};
