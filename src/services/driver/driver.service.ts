import { $axios } from '@/common/config';
import { IDriverResponse } from '@/store/driver/types';
import { EndPointes } from '../endpoints';
export const DriverService = {
  async getDriver() {
    const response = await $axios.get<IDriverResponse>(EndPointes.driver.getAll);
    return response;
  },

  async createDriver(body: any) {
    const response = await $axios.post<any>(EndPointes.driver.create, body);
    return response;
  },

  async getDriverById(id: number | string) {
    const response = await $axios.get(EndPointes.driver.getOne + id);
    return response;
  },

  async editDriver(body: any, id: number | string) {
    const response = await $axios.patch(EndPointes.driver.edit + id, body);
    return response;
  },

  async deleteDriver(id: number | string) {
    const response = await $axios.delete(EndPointes.driver.delete + id);
    return response;
  },
};
