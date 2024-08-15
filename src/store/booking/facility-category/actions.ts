import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingFacilityCategoryService } from '@/services';
import { appActions } from '@/store/app';
import {
  IFacilityCategory,
  IFacilityCategoryCreatePayload,
  IFacilityCategoryDeletePayload,
  IFacilityCategoryPayload,
  IFacilityCategoryResponse,
  IFacilityCategoryUpdatePayload,
  IGetOneFacilityCategoryPayload,
  IOneFacilityCategory,
} from './types';
import { AxiosResponse } from 'axios';

export const getAllFacilityCategory = createAsyncThunk<
  IFacilityCategoryResponse,
  IFacilityCategoryPayload
>(EndPointes.letsTripCountry.getAll + '/get-all', async ({ page, size }, thunkApi) => {
  try {
    const response = await BookingFacilityCategoryService.getAll(page, size);
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
});

export const getOneFacilityCategory = createAsyncThunk<
  IOneFacilityCategory,
  IGetOneFacilityCategoryPayload
>(EndPointes.letsTripCountry.getAll + '/get-one/:id', async ({ id, lang }, thunkApi) => {
  try {
    return (await BookingFacilityCategoryService.getOne(id, lang)).data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createFacilityCategory = createAsyncThunk<
  AxiosResponse<IFacilityCategory>,
  IFacilityCategoryCreatePayload
>(EndPointes.letsTripCountry.getAll + '/create', async ({ callback, name }, thunkApi) => {
  try {
    const response = await BookingFacilityCategoryService.create({ name });
    if (response.data && callback) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateFacilityCategory = createAsyncThunk<
  AxiosResponse<IFacilityCategory>,
  IFacilityCategoryUpdatePayload
>(
  EndPointes.letsTripCountry.getAll + '/update/:id',
  async ({ callback, id, lang, body }, thunkApi) => {
    try {
      const response = await BookingFacilityCategoryService.update(id, lang, body);
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteFacilityCategory = createAsyncThunk<any, IFacilityCategoryDeletePayload>(
  EndPointes.letsTripCountry.getAll + '/delete/:id',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await BookingFacilityCategoryService.delete(id);
      if (callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
