import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
export const RoleService = {
  async getAllRole() {
    const response = await $axios.get(EndPointes.role.getAll);
    return response;
  },
  async createRole(body: any) {
    const response = await $axios.post(EndPointes.role.create, body);
    return response;
  },
};
