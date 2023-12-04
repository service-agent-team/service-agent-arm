import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { UserService } from '@/services/Users/user.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload, IUserResponse } from './user-interfaces';

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
