import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { UserPermissionService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPermissionResponse } from '..';
import { IGetUserPayload } from '../users/types';

export const getPermisions = createAsyncThunk<IPermissionResponse, IGetUserPayload>(
  'get/users',
  async ({ callback }, thunkApi) => {
    try {
      const response = await UserPermissionService.getPermissions();

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
