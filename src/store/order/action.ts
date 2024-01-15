import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../users/types';
import { IStatistica, IStatisticaResponce } from './types';
import { $axios } from '@/config';
import { EndPointes } from '@/services/endpoints';

export const getStatistica = createAsyncThunk<IStatisticaResponce>(
  'get/statistica',
  async (_, thunkApi) => {
    try {
      const response = await $axios.get(EndPointes.statistic.getAll);
      if (response.data) {
        addNotification('successfuly');
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
