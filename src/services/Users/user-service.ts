import { $axios } from '@/common/config';
import { IUserCreateResponse, IUserResponse } from '@/store/users/types';
import { EndPointes } from '../endpoints';
export const UserService = {
  async getUsers() {
    const response = await $axios.get<IUserResponse>(EndPointes.user.getAll);
    return response;
  },

  async getMe() {
    const response = await $axios.get(EndPointes.auth.getme);
    return response;
  },

  async createUser(body: any) {
    const response = await $axios.post<IUserCreateResponse>(EndPointes.user.createUser, body);
    return response;
  },

  async delete(id: string) {
    const response = await $axios.delete(EndPointes.user.delete + id);
    return response;
  },
};
