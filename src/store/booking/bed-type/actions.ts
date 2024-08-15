import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingBedTypeService } from '@/services';
import {
  IBedType,
  ICreatePayload,
  ICreateResponse,
  IDeletePayload,
  IGetAllPayload,
  IGetOnePayload,
  IGetOneResponse,
  IUpdatePayload,
  IUpdateResponse,
} from './types';
import { appActions } from '@/store/app';

export const getAllBedType = createAsyncThunk<IBedType[], IGetAllPayload>(
  EndPointes.bookingBedType.getAll + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingBedTypeService.getAll(page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            current: page + 1,
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

export const getOneBedType = createAsyncThunk<IGetOneResponse, IGetOnePayload>(
  EndPointes.bookingBedType.getAll + '/get-one/:id',
  async ({ id, lang }, thunkApi) => {
    try {
      return (await BookingBedTypeService.getOne(id, lang)).data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createBedType = createAsyncThunk<ICreateResponse, ICreatePayload>(
  EndPointes.bookingBedType.getAll + '/create',
  async ({ callback, name, description, size }, thunkApi) => {
    try {
      const response = await BookingBedTypeService.create({
        name,
        description,
        size,
      });
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updateBedType = createAsyncThunk<IUpdateResponse, IUpdatePayload>(
  EndPointes.bookingBedType.getAll + '/update/:id',
  async ({ callback, id, lang, body }, thunkApi) => {
    try {
      const response = await BookingBedTypeService.update(id, lang, body);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteBedType = createAsyncThunk<any, IDeletePayload>(
  EndPointes.bookingBedType.getAll + '/delete/:id',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await BookingBedTypeService.delete(id);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
