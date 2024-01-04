import { $axios } from '@/config';
import { ITariffResponse } from '@/store/tariff/types';
import { EndPointes } from '../endpoints';

export const TariffService = {
  async getTariff() {
    const response = await $axios.get<ITariffResponse>(EndPointes.transfer.getAll);
    return response;
  },
};
