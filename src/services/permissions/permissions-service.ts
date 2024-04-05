import { $axios } from '@/common/config';
import { IPermissionCreateResponse, IPermissionResponse } from '@/store';
import { ICreatePermissionAxiosPayload } from '../../store/global/permission/types';
import { EndPointes } from '../endpoints';
export const PermissionService = {
  async getPermissions() {
    const response = await $axios.get<IPermissionResponse>(EndPointes.permissions.getAll);
    return response;
  },
  async getOnePermission(id: number) {
    const response = await $axios.get(EndPointes.permissions.getOne + id);
    return response;
  },
  async createPermission(body: ICreatePermissionAxiosPayload) {
    const response = await $axios.post<IPermissionCreateResponse>(EndPointes.permissions.create, {
      permissionName: body.permissionName,
      permissionDescription: body.permissionDescription,
    });
    return response;
  },
  async updatePermission(id: number, body: any) {
    const response = await $axios.put<IPermissionCreateResponse>(
      EndPointes.permissions.edit + id,
      body,
    );
    return response;
  },
  async deltePermission(id: number) {
    const response = await $axios.delete(EndPointes.permissions.delete + id);
    return response;
  },
};
