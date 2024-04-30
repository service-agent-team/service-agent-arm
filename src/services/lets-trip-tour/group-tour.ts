import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripGroupTourService = {
  async getAll(page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripGroupTour.getAll}?page=${page}&size=${size}`,
    );
    return response;
  },
  async getOneTour(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripGroupTour.getOne}/${id}`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripGroupTour.create, body);
    return response;
  },
  async delete(id: string) {
    const response = await $axios.delete(EndPointes.letsTripGroupTour.delete + id);
    return response;
  },
};
