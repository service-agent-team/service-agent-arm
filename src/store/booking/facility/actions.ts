import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingFacilityService } from '@/services';
import {
  ICreateFacilityPayload,
  ICreateTranslationPayload,
  IDeleteTranslationFacilityPayload,
  IFacilityCreateResponse,
  IFacilityDeletePayload,
  IFacilityPayload,
  IFacilityResponse,
  IGetOneFacilityPayload,
  IOneFacility,
  IUpdateFacilityPayload,
} from './types';
import { appActions } from '@/store/app';

export const getAllFacility = createAsyncThunk<IFacilityResponse, IFacilityPayload>(
  EndPointes.bookingFacility + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingFacilityService.getAll(page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            current: page + 1,
            pageSize: size,
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

export const getOneFacility = createAsyncThunk<IOneFacility, IGetOneFacilityPayload>(
  EndPointes.bookingFacility + '/get-one/:id',
  async ({ id, lang, callback }, thunkApi) => {
    try {
      const response = await BookingFacilityService.getOne(id, lang);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createFacility = createAsyncThunk<IFacilityCreateResponse, ICreateFacilityPayload>(
  EndPointes.bookingFacility + '/create',
  async ({ callback, name, description, facilityType, isCommon, categoryId }, thunkApi) => {
    try {
      const response = await BookingFacilityService.create({
        name,
        description,
        facilityType,
        isCommon,
        categoryId,
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

export const createFacilityTranslation = createAsyncThunk<
  IFacilityCreateResponse,
  ICreateTranslationPayload
>(EndPointes.bookingFacility + '/create/translations', async ({ callback, body }, thunkApi) => {
  try {
    const response = await BookingFacilityService.createTranslation(body);
    if (response.data && callback) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const editFacility = createAsyncThunk<IFacilityCreateResponse, IUpdateFacilityPayload>(
  EndPointes.bookingFacility + '/update/:id',
  async ({ callback, id, lang, body }, thunkApi) => {
    try {
      const response = await BookingFacilityService.update(id, lang, body);
      if (response.data && callback) {
        callback();
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
      if (callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteFacilityTranslation = createAsyncThunk<any, IDeleteTranslationFacilityPayload>(
  EndPointes.bookingFacility + '/delete/translation/:id',
  async ({ callback, id, lang }, thunkApi) => {
    try {
      const response = await BookingFacilityService.deleteTranslation(id, lang);
      if (callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
