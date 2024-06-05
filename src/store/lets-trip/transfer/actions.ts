import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILetsTripTransfer,
  ILetsTripTransferCreatePayload,
  ILetsTripTransferCreateResponse,
  ILetsTripTransferDeletePayload,
  ILetsTripTransferGetOnePayload,
  ILetsTripTransferPayload,
  ILetsTripTransferResponse,
  ILetsTripTransferUpdateI18Payload,
  ILetsTripTransferUpdatePayload,
  Name,
} from './types';
import { LetsTripTransferCarService } from '@/services';

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
