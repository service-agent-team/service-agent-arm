import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const ComapnyService = {
  async getAllCompany(page: number = 0, size: number = 10) {
    const responce = await $axios.get(
      `${EndPointes.product.getAllCompany}?page=${page}&size=${size}`,
    );
    return responce.data;
  },
};
