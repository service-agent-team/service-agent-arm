import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneLetsTripTourResponse,
  ILetsTripGroupTourPayload,
  ILetsTripGroupTourCreatePayload,
  ILetsTripGroupTourCreateResponse,
  ILetsTripGroupTourGetOnePayload,
  ILetsTripGroupTourResponse,
  ILetsTripGroupTourDeletePayload,
} from './types';
import { LetsTripGroupTourService } from '@/services';

export const getAllLetsTripGroupTour = createAsyncThunk<
  ILetsTripGroupTourResponse,
  ILetsTripGroupTourPayload
>(EndPointes.letsTripGroupTour.getAll + '/get-all', async ({ callback, page, size }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getAll(page, size);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneLetsTripTour = createAsyncThunk<
  IGetOneLetsTripTourResponse,
  ILetsTripGroupTourGetOnePayload
>(EndPointes.letsTripGroupTour.getOne + '/id', async ({ callback, id }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getOneTour(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripGroupTour = createAsyncThunk<
  ILetsTripGroupTourCreateResponse,
  ILetsTripGroupTourCreatePayload
>(EndPointes.letsTripGroupTour.create + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.create(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteLetsTripGroupTour = createAsyncThunk<any, ILetsTripGroupTourDeletePayload>(
  EndPointes.letsTripGroupTour.delete + '/delete',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.delete(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
