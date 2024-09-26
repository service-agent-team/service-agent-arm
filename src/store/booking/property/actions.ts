import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingPropertyService } from '@/services';
import {
  ICreateRoomTranslationPayload,
  IDeleteRoomTranslationPayload,
  IGetOneRoomPayload,
  IProperty,
  IPropertyPayload,
  IPropertyResponse,
  IPropertyTranslation,
} from './types';
import { AxiosResponse } from 'axios';
import { appActions } from '@/store/app';

export const getAllProperty = createAsyncThunk<IPropertyResponse<IProperty[]>, IPropertyPayload>(
  EndPointes.bookingTaxes + '/get-all',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await BookingPropertyService.getAll(page, size);
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

export const getOneProperty = createAsyncThunk<IProperty, IGetOneRoomPayload>(
  EndPointes.bookingTaxes + '/get-one/translation',
  async ({ id }, thunkApi) => {
    try {
      const response = await BookingPropertyService.getOneTranslation(id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createPropertyTranslation = createAsyncThunk<
  AxiosResponse<IPropertyTranslation>,
  ICreateRoomTranslationPayload
>(EndPointes.bookingTaxes + '/create-translation', async ({ cb, body }, thunkApi) => {
  try {
    const response = await BookingPropertyService.createTranslation(body);
    if (response.status === 201) {
      cb();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deletePropertyTranslation = createAsyncThunk<any, IDeleteRoomTranslationPayload>(
  EndPointes.bookingTaxes + '/delete-translation',
  async ({ id, lang, cb }, thunkApi) => {
    try {
      const response = await BookingPropertyService.deleteTranslation(id, lang);
      if (response.status === 204) {
        cb();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
