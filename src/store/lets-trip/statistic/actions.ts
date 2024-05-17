import { errorCatch } from '@/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILetsTripStatisticPayload, ILetsTripStatisticResponse } from './types';
import { LetsTripStatisticService } from '@/services';

export const getAllLetsTripStatistics = createAsyncThunk<
  ILetsTripStatisticResponse,
  ILetsTripStatisticPayload
>('get-all/lets-trip-statistic', async ({ callback }, thunkApi) => {
  try {
    const response = await LetsTripStatisticService.getAll();
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
