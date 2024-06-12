import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LetsTripGlobalCountryService } from '@/services';
import {
  CreateGlobalCountryPayload,
  deleteGlobalCountryPayload,
  GlobalCountryPayload,
  GlobalCountryResponse,
  ILetsTripGlobalCountry,
  UpdateImageGlobalCountryPayload,
} from './types';
import { appActions } from '@/store/app';

export const getAllGlobalCountry = createAsyncThunk<GlobalCountryResponse, GlobalCountryPayload>(
  EndPointes.letsTripGlobalCountry.getAll,
  async ({ page, size }, thunkApi) => {
    try {
      const response = await LetsTripGlobalCountryService.getAll(page, size);
      thunkApi.dispatch(
        appActions.setPagination({
          current: response.data.data.pageable.pageNumber + 1,
          pageSize: response.data.data.pageable.pageSize,
          total: response.data.data.totalElements,
        }),
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createGlobalCountry = createAsyncThunk<
  ILetsTripGlobalCountry,
  CreateGlobalCountryPayload
>(EndPointes.letsTripGlobalCountry.create, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripGlobalCountryService.create(body);
    if (response.status == 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateImageGlobalCountry = createAsyncThunk<
  ILetsTripGlobalCountry,
  UpdateImageGlobalCountryPayload
>(EndPointes.letsTripGlobalCountry.updateImage, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripGlobalCountryService.updateImage(body);
    if (response.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteGlobalCountry = createAsyncThunk<any, deleteGlobalCountryPayload>(
  EndPointes.letsTripGlobalCountry.updateImage,
  async ({ callback, countryId }, thunkApi) => {
    try {
      const response = await LetsTripGlobalCountryService.deleteCountry(countryId);
      if (response.status == 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
