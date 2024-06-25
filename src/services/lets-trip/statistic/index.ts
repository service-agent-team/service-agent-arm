import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';

export const LetsTripStatisticService = {
  async getAll() {
    const response = await $axios.get(`${EndPointes.letsTripStatistic.getAll}`);
    return response;
  },
};
