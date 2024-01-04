import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { TariffService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../users/types';
import { ITariffResponse } from './types';

export const getTariff = createAsyncThunk<ITariffResponse, IGetUserPayload>(
  'get/tariff',
  async ({ callback }, thunkApi) => {
    try {
      const response = await TariffService.getTariff();

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
