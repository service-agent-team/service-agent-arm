import { $axios } from '@/common/config';
import { EndPointesV2 } from '@/services/endpoints-v2';

export const RolesService = {
  async getRoles(pageNumber = 0, pageSize = 10) {
    const response = await $axios.get(
      `${EndPointesV2.roles.getAll}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    return response;
  },

  async createRoles(body: any) {
    const response = await $axios.post(EndPointesV2.roles.create, body);
    return response;
  },

  async getRoleById(id: number | string) {
    const response = await $axios.get(EndPointesV2.roles.getOne + id);
    return response;
  },

  async editRoles(body: any, id: number | string) {
    const response = await $axios.patch(EndPointesV2.roles.edit + id, body);
    return response;
  },

  async delete(id: number | string) {
    const response = await $axios.delete(EndPointesV2.roles.delete + id);
    return response;
  },
};
