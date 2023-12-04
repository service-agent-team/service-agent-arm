import { $axios } from '@/config';
import { IUserResponse } from '@/libs/store/users/user-interfaces';
import { EndPointes } from '../endpoints';
export const UserService = {
  async getUsers() {
    const response = await $axios.get<IUserResponse>(EndPointes.user.getUsers);
    return response;
  },
};
