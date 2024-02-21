import { $axios } from '@/common';
import { CreateCarPayload, ICarModel, ImageSet } from '@/types';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../endpoints';

export const CarModelService = {
  async setImage(data: FormData | any): Promise<AxiosResponse<ImageSet>> {
    const response = await $axios.post(EndPointes.carModel.setImage, data);
    return response;
  },

  async createCarModel(body: CreateCarPayload) {
    const response = await $axios.post(EndPointes.carModel.create, body);
    return response;
  },

  async getAllCarModel(page: number, size: number) {
    const response = await $axios.get<AxiosResponse>(
      EndPointes.carModel.all + `?page=${page}&size=${size}`,
    );
    return response;
  },

  async getOneCarModel(id: number): Promise<AxiosResponse<ICarModel>> {
    const response = await $axios.get(EndPointes.carModel.getOne + id);
    return response;
  },

  async updateCarModel(
    body: Partial<CreateCarPayload>,
    id: number,
  ): Promise<AxiosResponse<ICarModel>> {
    const response = await $axios.patch(`${EndPointes.carModel.update}/${id}`, body);
    return response;
  },

  async deleteCarModel(id: number): Promise<AxiosResponse<ICarModel>> {
    const response = await $axios.delete(EndPointes.carModel.delete + id);
    return response;
  },

  async updateImage(id: number | string, body: FormData | any): Promise<AxiosResponse<ICarModel>> {
    return await $axios.put(EndPointes.carModel.changeImage + id, body);
  },
};
