import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripCountryService = {
  async getAll() {
    const response = await $axios.get(`${EndPointes.letsTripCountry.getAll}`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripCountry.create, body);
    return response;
  },
  async delete(id: string) {
    const response = await $axios.delete(EndPointes.letsTripCountry.delete + id);
    return response;
  },
};
