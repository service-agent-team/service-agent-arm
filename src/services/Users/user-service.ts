import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { AxiosResponse } from 'axios';
import { IUserCreatePayloadData, IUserResponse } from '@/types';

export const UserService = {
  async getUsers() {
    return await $axios.get<IUserResponse>(EndPointes.user.getAll);
  },

  async getMe() {
    return await $axios.get(EndPointes.auth.getme);
  },

  async createUser(body: Partial<IUserCreatePayloadData>): Promise<AxiosResponse<IUserResponse>> {
    return await $axios.post(EndPointes.user.createUser, body);
  },

  async delete(id: string) {
    return await $axios.delete(EndPointes.user.delete + id);
  },

  async getUserOne(id: number | string): Promise<AxiosResponse<IUserResponse>> {
    return await $axios.get(EndPointes.user.getOne + id);
  },

  async editUser(
    id: number | string,
    body: Partial<IUserCreatePayloadData>,
  ): Promise<AxiosResponse<IUserResponse>> {
    return await $axios.put(EndPointes.user.edit + id, body);
  },
};
