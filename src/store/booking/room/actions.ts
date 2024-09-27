import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingRoomService } from '@/services';
import {
  ICreateRoomTranslationPayload,
  IDeleteRoomTranslationPayload,
  IGetByPropertyIdPayload,
  IGetOneRoomPayload,
  IRoom,
  IRoomPayload,
  IRoomResponse,
  IRoomTranslation,
} from './types';
import { AxiosResponse } from 'axios';
import { appActions } from '@/store/app';

export const getAllRoom = createAsyncThunk<IRoomResponse<IRoom[]>, IRoomPayload>(
  EndPointes.bookingTaxes + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingRoomService.getAll(page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            current: page + 1,
            total: response.data.totalCount,
          }),
        );
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneRoom = createAsyncThunk<IRoomResponse<IRoom>, IGetOneRoomPayload>(
  EndPointes.bookingTaxes + '/get-one',
  async ({ id }, thunkApi) => {
    try {
      const response = await BookingRoomService.getOne(id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getByPropertyRoom = createAsyncThunk<IRoomResponse<IRoom[]>, IGetByPropertyIdPayload>(
  EndPointes.bookingTaxes + '/by-property',
  async ({ propertyId, lang, page, size }, thunkApi) => {
    try {
      const response = await BookingRoomService.getByProperty(propertyId, lang, page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            current: page + 1,
            total: response.data.totalCount,
          }),
        );
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneRoomTranslation = createAsyncThunk<IRoom, IGetOneRoomPayload>(
  EndPointes.bookingTaxes + '/get-one/translation',
  async ({ id }, thunkApi) => {
    try {
      const response = await BookingRoomService.getOneTranslation(id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createRoomTranslation = createAsyncThunk<
  AxiosResponse<IRoomTranslation>,
  ICreateRoomTranslationPayload
>(EndPointes.bookingTaxes + '/create-translation', async ({ cb, body }, thunkApi) => {
  try {
    const response = await BookingRoomService.createTranslation(body);
    if (response.status === 201) {
      cb();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteRoomTranslation = createAsyncThunk<any, IDeleteRoomTranslationPayload>(
  EndPointes.bookingTaxes + '/delete-translation',
  async ({ id, lang, cb }, thunkApi) => {
    try {
      const response = await BookingRoomService.deleteTranslation(id, lang);
      if (response.status === 204) {
        cb();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
