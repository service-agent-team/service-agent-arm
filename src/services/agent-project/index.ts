import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const AgentProjectService = {
  async getAllAgentProject() {
    const response = await $axios.get(EndPointes.agent.project.getAll);
    return response;
  },
};
