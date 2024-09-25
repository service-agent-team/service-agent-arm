import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IProcessProjectBody } from '@/store/process/project/types';

export const ProcessProjectService = {
  async getAll() {
    const response = await $axios.get(`${EndPointes.processProject}`);
    return response.data;
  },
  async getOne(id: number) {
    const response = await $axios.get(`${EndPointes.processProject}/${id}`);
    return response.data;
  },
  async create(body: IProcessProjectBody) {
    const response = await $axios.post(`${EndPointes.processProject}`, body);
    return response.data;
  },
  async update(id: number, body: IProcessProjectBody) {
    const response = await $axios.patch(`${EndPointes.processProject}/${id}`, body);
    return response.data;
  },
  async delete(id: number) {
    const response = await $axios.delete(`${EndPointes.processProject}/${id}`);
    return response.data;
  },
};
