import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IProcessBody } from '@/store/process/diagram/types';

export const ProcessService = {
  async getAll() {
    const response = await $axios.get(`${EndPointes.process}`);
    return response.data;
  },
  async getOne(id: number) {
    const response = await $axios.get(`${EndPointes.process}/${id}`);
    return response.data;
  },
  async create(body: IProcessBody) {
    const response = await $axios.post(`${EndPointes.process}`, body);
    return response.data;
  },
  async update(id: number, body: IProcessBody) {
    const response = await $axios.patch(`${EndPointes.process}/${id}`, body);
    return response.data;
  },
  async delete(id: number) {
    const response = await $axios.delete(`${EndPointes.process}/${id}`);
    return response.data;
  },
};
