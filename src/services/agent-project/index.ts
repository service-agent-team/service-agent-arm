import { $axios } from '@/common/config';
import { EndPointesV2 } from '../endpoints-v2';

export const AgentProjectService = {
  async getAllAgentProject(pageNumber = 0, pageSize = 10) {
    const response = await $axios.get(
      `${EndPointesV2.agent.project.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response;
  },
  async getOneAgentProject(id: number | string) {
    const response = await $axios.get(`${EndPointesV2.agent.project.getOne}/${id}`);
    return response;
  },
  async createAgentProjectByAgent(body: { name: string; description: string }) {
    const response = await $axios.post(EndPointesV2.agent.project.create, body);
    return response;
  },
  async updateAgentProjectByAgent(id: string, body: { name: string; description: string }) {
    const response = await $axios.patch(EndPointesV2.agent.project.edit + id, body);
    return response;
  },
  async deleteAgentProject(id: number | string) {
    const response = await $axios.delete(EndPointesV2.agent.project.delete + id);
    return response;
  },
};
