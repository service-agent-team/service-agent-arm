import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
const { userRoles } = EndPointes;

export interface IParam {
  userId: number;
  roleId: number;
}

export const AgentUserRoleService = {
  async getAllAgentUserRole() {
    const response = await $axios.get(`${userRoles.getAll}`);
    return response;
  },
  async createAgentUserRole({ roleId, userId }: IParam) {
    const response = await $axios.post(userRoles.create, { roleId, userId });
    return response;
  },
};
