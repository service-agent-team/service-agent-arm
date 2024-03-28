import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const AgentProjectService = {
  async getAllAgentProject() {
    const response = await $axios.get(EndPointes.agent.project.getAll);
    return response;
  },
  async createAgentProject(body: { name: string; description: string }) {
    const response = await $axios.post(EndPointes.agent.project.create, body);
    return response;
  },
  async deleteAgentProject(id: number | string) {
    const response = await $axios.delete(EndPointes.agent.project.delete + id);
    return response;
  },
};
