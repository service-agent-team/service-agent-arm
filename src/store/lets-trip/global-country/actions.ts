import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LetsTripGlobalCountryService } from '@/services';
import {
  CreateGlobalCountryPayload,
  GlobalCountryPayload,
  GlobalCountryResponse,
  ILetsTripGlobalCountry,
} from './types';

export const getAllGlobalCountry = createAsyncThunk<GlobalCountryResponse, GlobalCountryPayload>(
  EndPointes.letsTripGlobalCountry.getAll,
  async ({ page, size }, thunkApi) => {
    try {
      const response = await LetsTripGlobalCountryService.getAll(page, size);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createGlobalCountry = createAsyncThunk<
  ILetsTripGlobalCountry,
  CreateGlobalCountryPayload
>(EndPointes.letsTripGlobalCountry.create, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripGlobalCountryService.create(body);
    if (response.status == 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
