import { $axios } from '@/common/config';
import { IRolesResponse } from '@/store/service-agent/roles/types';
import { ITariffCreateResponse } from '@/store/tariff/types';
import { EndPointes } from '../../endpoints';

export const RolesService = {
  async getRoles() {
    const response = await $axios.get<IRolesResponse>(EndPointes.roles.getAll);
    return response;
  },

  async createRoles(body: any) {
    const response = await $axios.post<ITariffCreateResponse>(EndPointes.roles.create, body);
    return response;
  },

  async getRoleById(id: number | string) {
    const response = await $axios.get(EndPointes.roles.getOne + id);
    return response;
  },

  async editRoles(body: any, id: number | string) {
    const response = await $axios.patch(EndPointes.roles.edit + id, body);
    return response;
  },

  async delete(id: number | string) {
    const response = await $axios.delete(EndPointes.roles.delete + id);
    return response;
  },
};
