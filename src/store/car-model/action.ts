import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { CarModelService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICarModelCreadPayload,
  ICarModelPayload,
  ICarModelResponse,
  ICarModelUpdatePayload,
} from './types';

export const GetAllCarModel = createAsyncThunk<ICarModelResponse, ICarModelPayload>(
  'get/model',
  async ({ callback }, thunkApi) => {
    try {
      const response = await CarModelService.getAllCarModel();
      if (response.data) {
        callback(response.data);
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const CreateCarModel = createAsyncThunk<any, ICarModelCreadPayload>(
  'cerate/model',
  async ({ body, callback }, thunkApi) => {
    try {
      const response = await CarModelService.createCarModel(body);
      if (response.data) {
        callback(response.data);
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const UpdateCarModel = createAsyncThunk<any, ICarModelUpdatePayload>(
  'cerate/model',
  async ({ body, id, callback }, thunkApi) => {
    try {
      const response = await CarModelService.updateCarModel(body, id);
      if (response.data) {
        callback(response.data);
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
