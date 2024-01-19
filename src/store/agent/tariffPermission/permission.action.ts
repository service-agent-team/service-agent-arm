import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { TariffPermissionService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITariffPermission } from './types';

export const add = createAsyncThunk<any, ITariffPermission>(
  'category/all',
  async ({ body, callback }, thunkApi) => {
    try {
      const response = await TariffPermissionService.addTariffPermission(body);
      if (response) {
        callback();
      }
      return response;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
