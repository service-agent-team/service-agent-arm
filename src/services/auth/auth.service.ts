import { $axios } from '@/common/config';
import { saveStorage } from '@/common/helpers';
import { IAuthResponse, IAuthSignIn } from '@/store/global/auth/interface';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../endpoints';

export const AuthService = {
  async signIn(email: string, password: string) {
    const response = await $axios.post<IAuthSignIn, AxiosResponse<IAuthResponse>>(
      EndPointes.auth.signIn,
      {
        email,
        password,
      },
    );

    if (response.data.access_token) {
      saveStorage(response.data);
    }
    return response;
  },

  async getMe() {
    const response = await $axios.get<IAuthResponse>(EndPointes.auth.getme);

    if (response.data.access_token) {
      saveStorage(response.data);
    }
    return response;
  },
};
