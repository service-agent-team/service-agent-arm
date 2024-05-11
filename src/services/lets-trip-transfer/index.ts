import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripTransferService = {
  async getAllTransfer(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.letsTripTransfer.getAll}?page=${page}&size=${size}`);
  },
  async create(body: any) {
    return await $axios.post(EndPointes.letsTripTransfer.create, body);
  },
};
