import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILetsTripCategoryPayload,
  ILetsTripCategoryResponse,
  IGetOneLetsTripCategoryResponse,
  ILetsTripCategoryCreatePayload,
} from './types';
import { LetsTripCategoryService } from '@/services';

export const getAllLetsTripCategory = createAsyncThunk<
  ILetsTripCategoryResponse,
  ILetsTripCategoryPayload
>(EndPointes.letsTripTransfer.getAll, async ({ callback, page, size }, thunkApi) => {
  try {
    const response = await LetsTripCategoryService.getAll(page, size);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripCategory = createAsyncThunk<
  IGetOneLetsTripCategoryResponse,
  ILetsTripCategoryCreatePayload
>(EndPointes.letsTripTransfer.create + '/create', async ({ callback, name }, thunkApi) => {
  try {
    const response = await LetsTripCategoryService.create(name);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
