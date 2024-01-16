import { $axios } from '@/config';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../endpoints';

export const CarModelService = {
  async getAllCarModel() {
    const response = await $axios.get<AxiosResponse>(EndPointes.carModel.all);
    return response;
  },

  async createCarModel(body: any) {
    const response = await $axios.post(EndPointes.carModel.create, body);
    return response;
  },

  async updateCarModel(body: any, id: number) {
    const response = await $axios.patch(`${EndPointes.carModel.update}/${id}`, body);
    return response;
  },
};
