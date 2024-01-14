import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { DriverService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarTypeByIdPayload, IcarTypeDeletePayload } from '../car-type/types';
import { IGetUserPayload } from '../users/types';
import {
  IDriverByIdResponse,
  IDriverCreateResponse,
  IDriverCreatepayload,
  IDriverEditPayload,
  IDriverEditResponse,
  IDriverResponse,
} from './types';

export const getDriver = createAsyncThunk<IDriverResponse, IGetUserPayload>(
  'get/driver',
  async ({ callback }, thunkApi) => {
    try {
      const response = await DriverService.getDriver();

      if (response.data) {
        callback();
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createDriver = createAsyncThunk<IDriverCreateResponse, IDriverCreatepayload>(
  'create/driver',
  async ({ phoneNumber, callback }, thunkApi) => {
    try {
      const response = await DriverService.createDriver({ phoneNumber });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getDriverById = createAsyncThunk<IDriverByIdResponse, ICarTypeByIdPayload>(
  'get/getdriverById',
  async ({ id }, thunkApi) => {
    try {
      const response = await DriverService.getDriverById(id);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editDriver = createAsyncThunk<IDriverEditResponse, IDriverEditPayload>(
  'edit/driver',
  async ({ phoneNumber, id, callback }, thunkApi) => {
    try {
      const response = await DriverService.editDriver({ phoneNumber }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deletDriver = createAsyncThunk<IDriverEditResponse, IcarTypeDeletePayload>(
  'delete/driver',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await DriverService.deleteDriver(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
