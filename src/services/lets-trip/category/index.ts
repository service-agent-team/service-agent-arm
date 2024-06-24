import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';

export const LetsTripCategoryService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.letsTripCategory.getAll}?page=${page}&size=${size}`);
  },
  async create(name: string) {
    return await $axios.post(EndPointes.letsTripCategory.create, { name });
  },
};
