import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILetsTripTransferResponse,
  ILetsTripTransferPayload,
  ILetsTripTransferCreatePayload,
  ILetsTripTransferCreateResponse,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { LetsTripTransferService } from '@/services/lets-trip-transfer';
import { errorCatch } from '@/common';

export const getAllLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferPayload
>(EndPointes.letsTripTransfer.getAll, async ({ callback }, thunkApi) => {
  try {
    const response = await LetsTripTransferService.getAllTour();
    if (response.data) {
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
>(EndPointes.letsTripTransfer.create + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripTransferService.create(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
