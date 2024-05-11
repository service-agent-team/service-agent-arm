import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILetsTripTransferCreatePayload,
  ILetsTripTransferCreateResponse,
  ILetsTripTransferPayload,
  ILetsTripTransferResponse,
} from './types';
import { LetsTripTransferService } from '@/services';

export const getAllLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferPayload
>(EndPointes.letsTripTransfer.getAll, async ({ callback, page, size }, thunkApi) => {
  try {
    const response = await LetsTripTransferService.getAllTransfer(page, size);
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
