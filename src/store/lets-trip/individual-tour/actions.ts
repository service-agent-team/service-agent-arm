import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneLetsTripTourResponse,
  ILetsTripGIndividualTourCreatePayload,
  ILetsTripIndividualTourCreateResponse,
  ILetsTripIndividualTourGetOnePayload,
  ILetsTripIndividualTourPayload,
  ILetsTripIndividualTourResponse,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { LetsTripIndividualTourService } from '@/services';
import { errorCatch } from '@/common';

export const getAllLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourResponse,
  ILetsTripIndividualTourPayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/get-all',
  async ({ callback, page, size }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.getAll(page, size);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const geOneLetsTripIndividualTour = createAsyncThunk<
  IGetOneLetsTripTourResponse,
  ILetsTripIndividualTourGetOnePayload
>(EndPointes.letsTripIndividualTour.getOne + '/get-one', async ({ callback, id }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.getOne(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourCreateResponse,
  ILetsTripGIndividualTourCreatePayload
>(EndPointes.letsTripIndividualTour.create + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.create(body);
    if (response.status === 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourCreateResponse,
  ILetsTripIndividualTourGetOnePayload
>(EndPointes.letsTripIndividualTour.delete + '/delete', async ({ callback, id }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.delete(id);
    if (response.status === 204) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
