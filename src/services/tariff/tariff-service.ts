import { $axios } from '@/config';
import { ITariffCreateResponse, ITariffResponse } from '@/store/tariff/types';
import { EndPointes } from '../endpoints';
import { ITariffpayloadData } from './interfaces';

export const TariffService = {
  async getTariff() {
    const response = await $axios.get<ITariffResponse>(EndPointes.transfer.getAll);
    return response;
  },

  async createTariff(body: ITariffpayloadData) {
    const response = await $axios.post<ITariffCreateResponse>(
      EndPointes.transfer.createTariff,
      body,
    );
    return response;
  },
};
