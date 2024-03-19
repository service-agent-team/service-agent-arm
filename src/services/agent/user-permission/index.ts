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
  async createAgentUserPermission({ permissionId, projectId, userId }: IParam) {
    const response = await $axios.post(userPermissions.create, { permissionId, projectId, userId });
    return response;
  },
};
