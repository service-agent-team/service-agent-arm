import { $axios } from '@/config';
import { ICarResponse } from '../../store/car/types';
import { EndPointes } from '../endpoints';
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

  async createCar(body: { modelId: number; carNumber: string; file: any[] }) {
    const formdata = new FormData();
    formdata.append('file', body.file[0].originFileObj);
    formdata.append('carNumber', body.carNumber);
    formdata.append('modelId', `${body.modelId}`);

    const response = await $axios.post(EndPointes.car.create, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
