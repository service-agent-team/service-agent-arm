import { $axios } from '@/config';
import { EndPointes } from '../endpoints';
import { ICarResponse } from './../../store/car/types';
export const CarService = {
  async getCar() {
    const response = await $axios.get<ICarResponse>(EndPointes.car.getAll);
    return response;
  },

  async setImage(formdata: any) {
    const response = await $axios.post(EndPointes.car.setImage, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  async createCarPrice(body: any) {
    const response = await $axios.post(EndPointes.car.createPrice, body);
    return response;
  },

  async createCar(body: any) {
    const response = await $axios.post<any>(EndPointes.car.create, body);
    return response;
  },

  async getDriverById(id: number | string) {
    const response = await $axios.get(EndPointes.car.getOne + id);
    return response;
  },

  async edit(body: any, id: number | string) {
    const response = await $axios.patch(EndPointes.car.edit + id, body);
    return response;
  },

  async delete(id: number | string) {
    const response = await $axios.delete(EndPointes.car.delete + id);
    return response;
  },
};
