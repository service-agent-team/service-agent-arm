import { $axios } from '@/common/config';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { ICreateCarDirection, IGlobalCountry } from '@/types';
import { IGlobalResponce } from '@/types/reponces';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../endpoints';

export const LetsTripTransferCarService = {
  async getAllTransfer(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.letsTripTransfer.getAll}?page=${page}&size=${size}`);
  },
  async getOneTransfer(id: number) {
    return await $axios.get(`${EndPointes.letsTripTransfer.getOne}/${id}`);
  },
  async getByCategoryId(id: string, page = 0, size = 10) {
    return await $axios.get(
      `${EndPointes.letsTripTransfer.getByCategoryId}/${id}?page=${page}&size=${size}`,
    );
  },
  async createTransfer(body: any) {
    return await $axios.post(EndPointes.letsTripTransfer.create, body);
  },
  async updateTransfer(id: number, body: any) {
    return await $axios.patch(`${EndPointes.letsTripTransfer.update}/${id}`, body);
  },
  async updateI18(id: number, body: any) {
    return await $axios.put(`${EndPointes.letsTripTransfer.updateI18}/${id}`, body);
  },
  async deleteTransfer(id: number) {
    return await $axios.delete(`${EndPointes.letsTripTransfer.delete}/${id}`);
  },

  async addDirectionCar(carId: number, direction: ICreateCarDirection) {
    return await $axios.post<ICreateCarDirection, AxiosResponse<ILetsTripTransfer>>(
      `${EndPointes.letsTripTransfer.addDirection}/${carId}`,
      direction,
    );
  },

  async getCountries() {
    return await $axios.get<IGlobalResponce<IGlobalCountry[]>>(
      EndPointes.letsTripTransfer.countries + '?page=0&size=5',
    );
  },

  async getRegions(countryId: number) {
    return await $axios.get<IGlobalResponce<IGlobalCountry[]>>(
      `${EndPointes.letsTripTransfer.regions}/${countryId}?page=0&size=10&direction=ASC`,
    );
  },
};
