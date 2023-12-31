import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { UserService } from '@/services/Users/user-service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetUserPayload,
  IUserCreateData,
  IUserCreateResponse,
  IUserGetMeResponse,
  IUserResponse,
} from './types';

export const getUsers = createAsyncThunk<IUserResponse, IGetUserPayload>(
  'get/users',
  async ({ callback }, thunkApi) => {
    try {
      const response = await UserService.getUsers();

      if (response.data.status == 200) {
        callback();
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
    if (response.data.status === 200) {
      addNotification('Successfully!');
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createUser = createAsyncThunk<IUserCreateResponse, IUserCreateData>(
  'create/user',
  async ({ userName, password, email, callback }, thunkApi) => {
    try {
      const response = await UserService.createUser({ userName, password, email });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
