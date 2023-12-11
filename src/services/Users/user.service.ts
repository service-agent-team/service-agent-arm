import { $axios } from '@/config';
import { IUserResponse } from '@/store/users/types';
export const UserService = {
  async getUsers() {
    const response = await $axios.get<IUserResponse>('/');
    return response;
  },
};
