import { $axios } from '@/common/config';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { ICreateCarDirection, IGlobalCountry } from '@/types';
import { IGlobalResponse } from '@/types/response';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../../endpoints';

export const LetsTripTransferCarService = {
  async getAllTransfer(page: number, size = 10) {
    return await $axios.get(`${EndPointes.letsTripTransfer.getAll}?page=${page}&size=${size}`);
  },
  async search(name: string, page: number, size = 10) {
    return await $axios.get(
      `${EndPointes.letsTripTransfer.search}?name=${name}&page=${page}&size=${size}&deleted=false`,
    );
  },
  async getOneTransfer(id: number) {
    return await $axios.get(`${EndPointes.letsTripTransfer.getOne}/${id}`);
  },
  async getByCategoryId(id: number, page: number, size = 10) {
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

  async deleteDirectionCar(carId: number, directionId: number) {
    return await $axios.delete(
      `${EndPointes.letsTripTransfer.deleteDirection}/${carId}/direction/${directionId}`,
    );
  },

  async getCountries() {
    return await $axios.get<IGlobalResponse<IGlobalCountry[]>>(
      EndPointes.letsTripTransfer.countries + '?page=0&size=5',
    );
  },

  async getRegions(countryId: number) {
    return await $axios.get<IGlobalResponse<IGlobalCountry[]>>(
      `${EndPointes.letsTripTransfer.regions}/${countryId}?page=0&size=10&direction=ASC`,
    );
  },
};
