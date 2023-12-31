import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { AuthService } from '@/services';
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
