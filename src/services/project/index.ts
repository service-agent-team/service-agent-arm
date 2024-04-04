import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const ProjectService = {
  async getAllProject() {
    const response = await $axios.get(EndPointes.project.getAll);
    return response;
  },
  async getOneProject(id: number) {
    const response = await $axios.get(EndPointes.project.getOne + id);
    return response;
  },
  async createProject(body: any) {
    const response = await $axios.post(EndPointes.project.create, body);
    return response;
  },
  async updateProject(id: number, body: any) {
    const response = await $axios.put(EndPointes.project.edit + id, body);
    return response;
  },
  async deleteProject(id: number) {
    const response = await $axios.delete(EndPointes.project.delete + id);
    return response;
  },
};
