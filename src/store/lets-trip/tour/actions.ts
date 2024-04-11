import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILetsTripPayload, ILetsTripTourResponse } from './types';
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
