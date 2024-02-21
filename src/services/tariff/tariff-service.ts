import { $axios } from '@/common/config';
import { ITariffCreateResponse, ITariffResponse } from '@/store/tariff/types';
import { EndPointes } from '../endpoints';
import { ITariffpayloadData } from './interfaces';

export const TariffService = {
  async getTariff() {
    const response = await $axios.get<ITariffResponse>(EndPointes.tariff.getAll);
    return response;
  },

  async createTariff(body: ITariffpayloadData) {
    const response = await $axios.post<ITariffCreateResponse>(EndPointes.tariff.create, body);
    return response;
  },

  async getTariffById(id: number | string) {
    const response = await $axios.get(EndPointes.tariff.getAll + id);
    return response;
  },

  async edittariff(body: ITariffpayloadData, id: number | string) {
    const response = await $axios.patch(EndPointes.tariff.edit + id, body);
    return response;
  },

  async disableTariff(id: number | string) {
    const response = await $axios.patch(EndPointes.tariff.disable + id);
    return response;
  },

  async enableTariff(id: number | string) {
    const response = await $axios.patch(EndPointes.tariff.enable + id);
    return response;
  },
};
