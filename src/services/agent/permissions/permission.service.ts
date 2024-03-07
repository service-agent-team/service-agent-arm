import { $axios } from '@/common/config';
import { IAgentPermissionResponse } from '@/store/service-agent/permission/types';
import { ITariffCreateResponse } from '@/store/tariff/types';
import { EndPointes } from '../../endpoints';

export const PermissionService = {
  async getRoles() {
    const response = await $axios.get<IAgentPermissionResponse>(EndPointes.permisions.getAll);
    return response;
  },

  async create(body: any) {
    const response = await $axios.post<ITariffCreateResponse>(EndPointes.permisions.create, body);
    return response;
  },

  async getById(id: number | string) {
    const response = await $axios.get(EndPointes.permisions.getOne + id);
    return response;
  },

  async edit(body: any, id: number | string) {
    const response = await $axios.patch(EndPointes.permisions.edit + id, body);
    return response;
  },

  async delete(id: number | string) {
    const response = await $axios.delete(EndPointes.permisions.delete + id);
    return response;
  },
};
