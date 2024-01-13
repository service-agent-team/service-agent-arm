import { $axios } from '@/config';
import { ICarTypeResponse } from '@/store/car-type/types';
import { ITariffCreateResponse } from '@/store/tariff/types';
import { EndPointes } from '../endpoints';

export const CarTypeService = {
  async getCarType() {
    const response = await $axios.get<ICarTypeResponse>(EndPointes.carType.getAll);
    return response;
  },

  async createCarType(body: any) {
    const response = await $axios.post<ITariffCreateResponse>(EndPointes.carType.create, body);
    return response;
  },

  async getCarTypeById(id: number | string) {
    const response = await $axios.get(EndPointes.carType.getOne + id);
    return response;
  },

  async editCarType(body: any, id: number | string) {
    const response = await $axios.patch(EndPointes.carType.edit + id, body);
    return response;
  },

  async deleteCarType(id: number | string) {
    const response = await $axios.delete(EndPointes.carType.delete + id);
    return response;
  },
};
