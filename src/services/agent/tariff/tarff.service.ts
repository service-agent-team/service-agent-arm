import { $axios } from '@/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const TariffService = {
  async getAllCategory() {
    const response = await $axios.get(agent.tariff.getAll);
    return response;
  },
};
