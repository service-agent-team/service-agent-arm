import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LetsTripCountryService } from '@/services';
import {
  IGetOneLetsTripCountryResponse,
  ILetsTripCountryCreatePayload,
  ILetsTripCountryGetOnePayload,
  ILetsTripCountryPayload,
  ILetsTripCountryResponse,
} from './types';

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

export const createLetsTripCountry = createAsyncThunk<
  IGetOneLetsTripCountryResponse,
  ILetsTripCountryCreatePayload
>(EndPointes.letsTripCountry.getAll + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripCountryService.create(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteLetsTripCountry = createAsyncThunk<any, ILetsTripCountryGetOnePayload>(
  EndPointes.letsTripCountry.delete + '/delete',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await LetsTripCountryService.delete(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
