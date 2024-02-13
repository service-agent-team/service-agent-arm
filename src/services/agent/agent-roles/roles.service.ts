import { $axios } from '@/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export interface IParam {
  userId: number;
  roleId: number;
}

export const AgentRolesService = {
  async createUserRole({ roleId, userId }: IParam) {
    const response = await $axios.post(agent.createAgentRoles, { roleId, userId });
    return response;
  },

  async oneUserRole(id: number) {
    const response = await $axios.get(`${agent.getOneAgentRoles}/${id}`);
    return response;
  },
};
