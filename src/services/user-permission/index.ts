import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
export const UserPermissionService = {
  async getAllUserPermission() {
    const response = await $axios.get(EndPointes.userPermission.getAll);
    return response;
  },
  async getAOneUserPermission(id: number) {
    const response = await $axios.get(EndPointes.userPermission.getOne + id);
    return response;
  },
  async createUserPermission(body: any) {
    const response = await $axios.post(EndPointes.userPermission.create, body);
    return response;
  },
  async updateUserPermission(id: number, body: any) {
    const response = await $axios.put(EndPointes.userPermission.edit + id, body);
    return response;
  },
  async deleteUserPermission(id: number | string) {
    const response = await $axios.delete(EndPointes.userPermission.delete + id);
    return response;
  },
};
