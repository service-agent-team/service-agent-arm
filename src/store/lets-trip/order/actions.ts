import { errorCatch } from '@/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetLetsTripOrderPayload } from './types';

export const getLetsTripOrder = createAsyncThunk<any, IGetLetsTripOrderPayload>(
  'get/lets-trip-order',
  async ({ callback }, thunkApi) => {
    try {
      // const response = await CarService.getCar();
      // if (response.data) {
      //   callback();
      // }
      // return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
