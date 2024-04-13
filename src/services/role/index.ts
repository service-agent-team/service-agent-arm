import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
export const RoleService = {
  async getAllRole() {
    const response = await $axios.get(EndPointes.role.getAll);
    return response;
  },
  async getOneRole(id: number) {
    const response = await $axios.get(EndPointes.role.getOne + id);
    return response;
  },
  async createRole(body: any) {
    const response = await $axios.post(EndPointes.role.create, body);
    return response;
  },
  async updateRole(id: number, body: any) {
    const response = await $axios.put(EndPointes.role.edit + id, body);
    return response;
  },
  async deleteRole(id: number) {
    const response = await $axios.delete(EndPointes.role.delete + id);
    return response;
  },
};
