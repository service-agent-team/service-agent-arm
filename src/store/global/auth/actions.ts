import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { AuthService } from '@/services';
import { UserService } from '@/services/Users/user-service.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, IAuthSignIn, IGetMeResponse } from './interface';
import { clearStorage, removeTokensCookie } from '@/common/helpers/cookie';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { AxiosResponse } from 'axios';

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

export const getMe = createAsyncThunk<AxiosResponse<IGetMeResponse>, any>(
  'get/me',
  async (thunkApi) => {
    const navigate = useNavigate();
    try {
      const response = await UserService.getMe();
      return response.data;
    } catch (error) {
      removeTokensCookie();
      clearStorage();
      addNotification(error);
      navigate(ROUTES.login);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
