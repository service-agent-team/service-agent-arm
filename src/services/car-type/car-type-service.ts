import { $axios } from '@/common/config';
import { ICarTypeResponse } from '@/store/car-type/types';
import { EndPointes } from '../endpoints';

export const CarTypeService = {
  async getCarType(page: number, size: number) {
    const response = await $axios.get<ICarTypeResponse>(
      EndPointes.carType.getAll + `?page=${page}&size=${size}`,
    );
    return response;
  },

  async createCarType(body: any) {
    const response = await $axios.post(EndPointes.carType.create, body);
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
