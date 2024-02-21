import { $axios } from '@/common/config';
import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStatisticaResponce } from './types';

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
