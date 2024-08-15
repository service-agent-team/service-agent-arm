import { errorCatch } from '@/common';
import { BookingBreakfastService } from '@/services';
import { EndPointes } from '@/services/endpoints';
import { TBreakfast } from '@/types/booking';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const findBreakfasts = createAsyncThunk<AxiosResponse<TBreakfast[]>, any>(
  EndPointes.booking.breakfast,
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingBreakfastService.findAll({ page, size });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createBreakfast = createAsyncThunk<AxiosResponse<TBreakfast>, any>(
  EndPointes.booking.breakfast + 'add',
  async ({ name, cb }, thunkApi) => {
    try {
      const response = await BookingBreakfastService.createBreakfast({ name });
      cb();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updateBreakfast = createAsyncThunk<AxiosResponse<TBreakfast>, any>(
  EndPointes.booking.breakfast + 'update',
  async ({ id, name, lang, cb }, thunkApi) => {
    try {
      const response = await BookingBreakfastService.updateBreakfast({ id, name, lang });
      cb();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const findOneBreakfast = createAsyncThunk<AxiosResponse<TBreakfast>, any>(
  EndPointes.booking.breakfast + 'one',
  async ({ id, lang }, thunkApi) => {
    try {
      const response = await BookingBreakfastService.findOne(id, lang);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
