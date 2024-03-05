import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { CarTypeService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetCarTypePayload } from '../../global/users/types';
import {
  ICarType,
  ICarTypeByIdPayload,
  ICarTypeCreatepayload,
  ICarTypeResponse,
  IcarTypeDeletePayload,
  ItariffEditpayload,
} from './types';

export const getCarType = createAsyncThunk<ICarTypeResponse, IGetCarTypePayload>(
  'get/carType',
  async ({ page, size, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.getCarType(page, size);

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

export const getOneCarType = createAsyncThunk<ICarType, ICarTypeByIdPayload>(
  'getOne/cartype',
  async ({ id, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.getCarTypeById(id);

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

export const createCarType = createAsyncThunk<ICarTypeResponse, ICarTypeCreatepayload>(
  'create/carType',
  async ({ numberOfBaggages, numberOfSeats, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.createCarType({ numberOfBaggages, numberOfSeats });
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

export const ediCarType = createAsyncThunk<ICarTypeResponse, ItariffEditpayload>(
  'edit/carType',
  async ({ numberOfBaggages, numberOfSeats, id, callback }, thunkApi) => {
    try {
      const response = await CarTypeService.editCarType({ numberOfBaggages, numberOfSeats }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deletCarType = createAsyncThunk<ICarTypeResponse, IcarTypeDeletePayload>(
  'delete/CarType',
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
