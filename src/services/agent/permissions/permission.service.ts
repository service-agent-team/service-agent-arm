import { $axios } from '@/common/config';
import { EndPointesV2 } from '@/services/endpoints-v2';

export const PermissionService = {
  async getRoles() {
    const response = await $axios.get(EndPointesV2.agentPermission.getAll);
    return response;
  },

  async create(body: any) {
    const response = await $axios.post(EndPointesV2.agentPermission.create, body);
    return response;
  },

  async getById(id: number | string) {
    const response = await $axios.get(EndPointesV2.agentPermission.getOne + id);
    return response;
  },

  async edit(id: number | string, body: any) {
    const response = await $axios.patch(EndPointesV2.agentPermission.edit + id, body);
    return response;
  },

  async delete(id: number | string) {
    const response = await $axios.delete(EndPointesV2.agentPermission.delete + id);
    return response;
  },
};
