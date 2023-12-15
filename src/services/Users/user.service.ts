import { $axios } from '@/config';
import { IUserResponse } from '@/store/users/types';
import { EndPointes } from '../endpoints';
export const UserService = {
  async getUsers() {
    const response = await $axios.get<IUserResponse>(EndPointes.user.getAll);
    return response;
  },
};
