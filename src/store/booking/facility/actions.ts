import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingFacilityService } from '@/services';
import { IFacilityDeletePayload, IFacilityPayload, IFacilityResponse } from './types';
import { appActions } from '@/store/app';

export const getAllFacility = createAsyncThunk<IFacilityResponse, IFacilityPayload>(
  EndPointes.bookingFacility + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingFacilityService.getAll(page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            total: response.data.count,
          }),
        );
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createFacility = createAsyncThunk<IFacilityResponse, IFacilityPayload>(
  EndPointes.bookingFacility + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingFacilityService.getAll(page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            total: response.data.count,
          }),
        );
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteFacility = createAsyncThunk<any, IFacilityDeletePayload>(
  EndPointes.bookingFacility + '/delete/:id',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await BookingFacilityService.delete(id);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
