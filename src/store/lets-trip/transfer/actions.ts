import { errorCatch } from '@/common';
import { LetsTripTransferCarService } from '@/services';
import { EndPointes } from '@/services/endpoints';
import { IGlobalCountry } from '@/types';
import { IGlobalResponce } from '@/types/reponces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  ICountryRegions,
  ICreateTransferDirectionPay,
  ILetsTripTransfer,
  ILetsTripTransferCreatePayload,
  ILetsTripTransferCreateResponse,
  ILetsTripTransferDeletePayload,
  ILetsTripTransferGetOnePayload,
  ILetsTripTransferPayload,
  ILetsTripTransferResponse,
  ILetsTripTransferUpdateI18Payload,
  ILetsTripTransferUpdatePayload,
} from './types';

export const getAllLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferPayload
>(EndPointes.letsTripTransfer.getAll, async ({ callback, page, size }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.getAllTransfer(page, size);
    if (response.status) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneLetsTripTransfer = createAsyncThunk<
  ILetsTripTransfer,
  ILetsTripTransferGetOnePayload
>(EndPointes.letsTripTransfer.getOne, async ({ callback, carId }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.getOneTransfer(carId);
    if (response.status) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferCreateResponse,
  ILetsTripTransferCreatePayload
>(EndPointes.letsTripTransfer.create, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.createTransfer(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferCreateResponse,
  ILetsTripTransferUpdatePayload
>(EndPointes.letsTripTransfer.update, async ({ callback, carId, body }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.updateTransfer(carId, body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateI18LetsTripTransfer = createAsyncThunk<any, ILetsTripTransferUpdateI18Payload>(
  EndPointes.letsTripTransfer.updateI18 + '/id',
  async ({ callback, id, body }, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.updateI18(id, body);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteLetsTripTransfer = createAsyncThunk<any, ILetsTripTransferDeletePayload>(
  EndPointes.letsTripTransfer.delete,
  async ({ callback, carId }, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.deleteTransfer(carId);
      if (response.status) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const transferCarSettings = createAsyncThunk<
  AxiosResponse<ILetsTripTransfer>,
  ICreateTransferDirectionPay
>(EndPointes.letsTripTransfer.addDirection, async ({ carId, direction, callback }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.addDirectionCar(carId, direction);
    if (response.data && callback) {
      callback();
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const globalCountries = createAsyncThunk<IGlobalResponce<IGlobalCountry[]>, any>(
  EndPointes.letsTripTransfer.countries,
  async (_, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.getCountries();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const countryRegions = createAsyncThunk<IGlobalResponce<IGlobalCountry[]>, ICountryRegions>(
  EndPointes.letsTripTransfer.regions,
  async ({ countryId }, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.getRegions(countryId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
