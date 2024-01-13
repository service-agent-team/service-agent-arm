import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { CarTypeService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../users/types';
import {
  ICarTypeByIdPayload,
  ICarTypeByIdResponse,
  ICarTypeCreatepayload,
  ICarTypeEditResponse,
  ICarTypeResponse,
  ICartypeCreateResponse,
  IcarTypeDeletePayload,
  ItariffEditpayload,
} from './types';

export const getCarType = createAsyncThunk<ICarTypeResponse, IGetUserPayload>(
  'get/carType',
  async ({ callback }, thunkApi) => {
    try {
      const response = await CarTypeService.getCarType();

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

export const createCarType = createAsyncThunk<ICartypeCreateResponse, ICarTypeCreatepayload>(
  'create/tariff',
  async ({ withBaggage, numberOfSeats, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.createCarType({ withBaggage, numberOfSeats });
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

export const getTariffById = createAsyncThunk<ICarTypeByIdResponse, ICarTypeByIdPayload>(
  'get/tariffById',
  async ({ id }, thunkApi) => {
    try {
      const response = await CarTypeService.getCarTypeById(id);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const ediCarType = createAsyncThunk<ICarTypeEditResponse, ItariffEditpayload>(
  'edit/tarriff',
  async ({ withBaggage, numberOfSeats, id, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.editCarType({ withBaggage, numberOfSeats }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deletCarType = createAsyncThunk<ICarTypeEditResponse, IcarTypeDeletePayload>(
  'disbale/tarriff',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await CarTypeService.deleteCarType(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
