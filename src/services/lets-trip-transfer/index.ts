import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripTransferService = {
  async getAllTransfer() {
    const response = await $axios.get(`${EndPointes.letsTripTransfer.getAll}?page=0&size=10`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripTransfer.create, body);
    return response;
  },
};
