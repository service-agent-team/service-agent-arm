import { $axios } from '@/config';

class BaseService {
  constructor() {}

  async getAll(url: string) {
    try {
      const response = await $axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(url: string, id: number | string) {
    try {
      const response = await $axios.get(`${url}/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async post<T, R>(url: string, data: any) {
    try {
      const response = await $axios.post<T, R>(url, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async update<T, R>(url: string, data: any, id: string | number) {
    try {
      const response = await $axios.put<T, R>(`${url}/${id}`, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(url: string, id: number | string) {
    try {
      const response = await $axios.delete(`${url}/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new BaseService();
