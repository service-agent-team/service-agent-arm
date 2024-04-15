import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILetsTripTransferResponse, ILetsTripTransferPayload } from './types';
import { EndPointes } from '@/services/endpoints';
import { LetsTripTransferService } from '@/services/lets-trip-transfer';
import { errorCatch } from '@/common';

export const getAllLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferPayload
>(EndPointes.letsTripTour.getAll, async ({ callback }, thunkApi) => {
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
