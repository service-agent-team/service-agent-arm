import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripIndividualTourService = {
  async getAll(page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripIndividualTour.getAll}?page=${page}&size=${size}&rection=ASC`,
    );
    return response;
  },
  async getOne(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripIndividualTour.getOne}/${id}`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripIndividualTour.create, body);
    return response;
  },
  async delete(id: string) {
    const response = await $axios.delete(EndPointes.letsTripIndividualTour.delete + id);
    return response;
  },
};
