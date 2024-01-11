import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { TariffService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../users/types';
import {
  ITariffByIdPayload,
  ITariffByIdResponse,
  ITariffCreateResponse,
  ITariffEditResponse,
  ITariffResponse,
  ITarriffDisablePayload,
  ItariffCreatepayload,
  ItariffEditpayload,
} from './types';

export const getTariff = createAsyncThunk<ITariffResponse, IGetUserPayload>(
  'get/tariff',
  async ({ callback }, thunkApi) => {
    try {
      const response = await TariffService.getTariff();

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

export const createTariff = createAsyncThunk<ITariffCreateResponse, ItariffCreatepayload>(
  'create/tariff',
  async ({ nameRu, nameUz, minimumDuration, callback }, thunkApi) => {
    try {
      const response = await TariffService.createTariff({ nameRu, nameUz, minimumDuration });
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

export const getTariffById = createAsyncThunk<ITariffByIdResponse, ITariffByIdPayload>(
  'get/tariffById',
  async ({ tariffId }, thunkApi) => {
    try {
      const response = await TariffService.getTariffById(tariffId);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editTariff = createAsyncThunk<ITariffEditResponse, ItariffEditpayload>(
  'edit/tarriff',
  async ({ nameRu, nameUz, minimumDuration, callback, id }, thunkApi) => {
    try {
      const response = await TariffService.edittariff({ nameRu, nameUz, minimumDuration }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const disableTariff = createAsyncThunk<ITariffEditResponse, ITarriffDisablePayload>(
  'disbale/tarriff',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await TariffService.disableTariff(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const enableTariff = createAsyncThunk<ITariffEditResponse, ITarriffDisablePayload>(
  'enable/tarriff',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await TariffService.enableTariff(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
