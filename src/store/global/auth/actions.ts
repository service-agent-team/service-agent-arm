import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { AuthService } from '@/services';
import { UserService } from '@/services/Users/user-service.ts';
import { IUserGetMeResponse } from '@/store/global/users/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, IAuthSignIn } from './interface';

export const SignIn = createAsyncThunk<IAuthResponse, IAuthSignIn>(
  'auth/signIn',
  async ({ email, password, callback }, thunkApi) => {
    try {
      const response = await AuthService.signIn(email, password);
      if (response.data) {
        callback(response.data);
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getMe = createAsyncThunk<IUserGetMeResponse, any>('get/me', async (thunkApi) => {
  try {
    const response = await UserService.getMe();

    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
