import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILetsTripGIndividualTourCreatePayload,
  ILetsTripIndividualTourCreateResponse,
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
