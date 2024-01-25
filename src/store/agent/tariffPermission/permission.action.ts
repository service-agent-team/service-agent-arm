import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { TariffPermissionService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITariffPermission } from './types';

export const addTariffPermission = createAsyncThunk<any, ITariffPermission>(
  'tariffPermission/all',
  async ({ permissionId, userId, userTariffId, callback }, thunkApi) => {
    try {
      const response = await TariffPermissionService.addTariffPermission({
        permissionId,
        userId,
        userTariffId,
      });
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
