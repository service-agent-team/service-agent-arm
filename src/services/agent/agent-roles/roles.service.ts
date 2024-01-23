import { $axios } from '@/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const UserRolesService = {
  async createUserRole(role: any) {
    const response = await $axios.post(agent.createAgentRoles, role);
    return response;
  },

  async oneUserRole(id: number) {
    const response = await $axios.get(`${agent.getOneAgentRoles}/${id}`);
    return response;
  },
};
