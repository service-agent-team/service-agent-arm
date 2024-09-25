import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingRoomService } from '@/services';
import {
  IDeleteRoomTranslationPayload,
  IGetOneRoomPayload,
  IRoom,
  IRoomPayload,
  IRoomResponse,
} from './types';

export const getAllRoom = createAsyncThunk<IRoomResponse<IRoom[]>, IRoomPayload>(
  EndPointes.bookingTaxes + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingRoomService.getAll(page, size);
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

export const getOneRoomTranslation = createAsyncThunk<IRoomResponse<IRoom>, IGetOneRoomPayload>(
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

export const createRoomTranslation = createAsyncThunk<IRoomResponse<IRoom>, IRoomPayload>(
  EndPointes.bookingTaxes + '/create-translation',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingRoomService.getAll(page, size);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteRoomTranslation = createAsyncThunk<IRoom[], IDeleteRoomTranslationPayload>(
  EndPointes.bookingTaxes + '/delete-translation',
  async ({ id, lang }, thunkApi) => {
    try {
      const response = await BookingRoomService.deleteTranslation(id, lang);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
