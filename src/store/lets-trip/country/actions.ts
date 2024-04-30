import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LetsTripCountryService } from '@/services';
import { ILetsTripCountryPayload, ILetsTripCountryResponse } from './types';

export const getAllLetsTripCountry = createAsyncThunk<
  ILetsTripCountryResponse,
  ILetsTripCountryPayload
>(EndPointes.letsTripCountry.getAll + '/get-all', async ({ callback }, thunkApi) => {
  try {
    const response = await LetsTripCountryService.getAll();
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
