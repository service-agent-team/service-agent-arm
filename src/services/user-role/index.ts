import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IUserRoleResponse } from '@/store/global/user-role/types';
export const UserRoleService = {
  async getAllUserRole() {
    const response = await $axios.get<IUserRoleResponse>(EndPointes.userRole.getAll);
    return response;
  },
  async getAOneUserRole(id: number) {
    const response = await $axios.get<IUserRoleResponse>(EndPointes.userRole.getOne + id);
    return response;
  },
  async createUserRole(body: any) {
    const response = await $axios.post(EndPointes.userRole.create, body);
    return response;
  },
  async updateUserRole(id: number, body: any) {
    const response = await $axios.put(EndPointes.userRole.edit + id, body);
    return response;
  },
  async deleteUserRole(id: number | string) {
    const response = await $axios.delete(EndPointes.userRole.delete + id);
    return response;
  },
};
