import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
const { userPermissions } = EndPointes;

export interface IParam {
  permissionId: number;
  projectId: number;
  userId: number;
}

export const AgentUserPermissionService = {
  async getAllAgentUserPermission() {
    const response = await $axios.get(`${userPermissions.getAll}`);
    return response;
  },
  async createAgentUserPermission(body: IParam) {
    const response = await $axios.post(userPermissions.create, body);
    return response;
  },
  async updateAgentUserPermission(id: number | string, body: IParam) {
    const response = await $axios.put(userPermissions.edit + id, body);
    return response;
  },
  async deleteAgentUserPermission({ permissionId }: { permissionId: number }) {
    const response = await $axios.delete(`${userPermissions.delete}${permissionId}`);
    return response;
  },
};
