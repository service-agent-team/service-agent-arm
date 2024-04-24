import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICategoryResponse,
  IGetOneLetsTripTourResponse,
  ILetsTripPayload,
  ILetsTripTourCreatePayload,
  ILetsTripTourCreateResponse,
  ILetsTripTourGetOnePayload,
  ILetsTripTourResponse,
} from './types';
import { LetsTripTourService } from '@/services';

export const getAllLetsTripTour = createAsyncThunk<ILetsTripTourResponse, ILetsTripPayload>(
  EndPointes.letsTripTour.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await LetsTripTourService.getAllTour();
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneLetsTripTour = createAsyncThunk<
  IGetOneLetsTripTourResponse,
  ILetsTripTourGetOnePayload
>(EndPointes.letsTripTour.getOne + '/id', async ({ callback, id }, thunkApi) => {
  try {
    const response = await LetsTripTourService.getOneTour(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getAllCategory = createAsyncThunk<ICategoryResponse, ILetsTripPayload>(
  EndPointes.category.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await LetsTripTourService.getAllCategory();
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createLetsTripTour = createAsyncThunk<
  ILetsTripTourCreateResponse,
  ILetsTripTourCreatePayload
>(EndPointes.letsTripTour.create, async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripTourService.create(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
