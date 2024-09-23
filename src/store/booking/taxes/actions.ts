import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingTaxesService } from '@/services';
import {
  ITaxe,
  ICreatePayload,
  ICreateResponse,
  ICreateTranslationPayload,
  IDeletePayload,
  IDeleteTranslationPayload,
  IGetAllPayload,
  IGetOnePayload,
  IGetOneResponse,
  IUpdatePayload,
  IUpdateResponse,
} from './types';

export const getAllTaxes = createAsyncThunk<ITaxe[], IGetAllPayload>(
  EndPointes.bookingTaxes + '/get-all',
  async (_, thunkApi) => {
    try {
      const response = await BookingTaxesService.getAll();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneTaxe = createAsyncThunk<IGetOneResponse, IGetOnePayload>(
  EndPointes.bookingTaxes + '/get-one/:id',
  async ({ id, lang }, thunkApi) => {
    try {
      return (await BookingTaxesService.getOne(id, lang)).data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createTaxe = createAsyncThunk<ICreateResponse, ICreatePayload>(
  EndPointes.bookingTaxes + '/create',
  async ({ callback, name }, thunkApi) => {
    try {
      const response = await BookingTaxesService.create({
        name,
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

export const createTaxeTranslation = createAsyncThunk<ICreateResponse, ICreateTranslationPayload>(
  EndPointes.bookingTaxes + '/create/translations',
  async ({ callback, body }, thunkApi) => {
    try {
      const response = await BookingTaxesService.createTranslation(body);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updateTaxe = createAsyncThunk<IUpdateResponse, IUpdatePayload>(
  EndPointes.bookingTaxes + '/update/:id',
  async ({ callback, id, lang, body }, thunkApi) => {
    try {
      const response = await BookingTaxesService.update(id, lang, body);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteTaxe = createAsyncThunk<any, IDeletePayload>(
  EndPointes.bookingTaxes + '/delete/:id',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await BookingTaxesService.delete(id);
      if (response.status === 200 && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteTaxeTranslation = createAsyncThunk<any, IDeleteTranslationPayload>(
  EndPointes.bookingTaxes + '/delete/translation:id',
  async ({ callback, id, lang }, thunkApi) => {
    try {
      const response = await BookingTaxesService.deleteTranslation(id, lang);
      if (response.status === 204 && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
