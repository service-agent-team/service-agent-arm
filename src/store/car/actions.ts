import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { CarService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarTypeByIdPayload } from '../car-type/types';
import { IGetUserPayload } from '../users/types';
import {
  ICarByIdResponse,
  ICarCreateResponse,
  ICarCreatepayload,
  ICarEditResponse,
  ICarEditpayload,
  ICarResponse,
  ICreateCarPricePayload,
} from './types';

export const getCar = createAsyncThunk<ICarResponse, IGetUserPayload>(
  'get/car',
  async ({ callback }, thunkApi) => {
    try {
      const response = await CarService.getCar();

      if (response.data) {
        callback();
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createPrice = createAsyncThunk<ICarCreateResponse, ICreateCarPricePayload>(
  'create/car',
  async ({ carTypeId, tarifid, price, carId, callback }, thunkApi) => {
    try {
      const response = await CarService.createCarPrice({ carId, carTypeId, tarifid, price });
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

export const createCar = createAsyncThunk<ICarCreateResponse, ICarCreatepayload>(
  'create/ca/price',
  async ({ file, carNumber, modelId, callback }, thunkApi) => {
    try {
      const response = await CarService.createCar({ file, carNumber, modelId });
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

export const getCarById = createAsyncThunk<ICarByIdResponse, ICarTypeByIdPayload>(
  'get/car/byId',
  async ({ id }, thunkApi) => {
    try {
      const response = await CarService.getDriverById(id);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editCar = createAsyncThunk<ICarEditResponse, ICarEditpayload>(
  'edit/car',
  async ({ number, modelId, callback, id }, thunkApi) => {
    try {
      const response = await CarService.edit({ number, modelId }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
