import { $axios } from '@/config';
import { IUserResponse } from '@/store/users/types';
import { EndPointes } from '../endpoints';
export const UserService = {
  async getUsers() {
    const response = await $axios.get<IUserResponse>('/');
    return response;
  },

  async getMe() {
    const response = await $axios.get(EndPointes.auth.getme);
    return response;
  },
};
