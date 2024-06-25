import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILetsTripOrderResponse, ILetTripOrderPayload } from './types';
import { LetsTripOrderService } from '@/services';

export const getLetsTripOrderByStatus = createAsyncThunk<
  ILetsTripOrderResponse,
  ILetTripOrderPayload
>(EndPointes.letsTripOrder.getByStatus, async ({ status, type, page, size }, thunkApi) => {
  try {
    const response = await LetsTripOrderService.getByCountryId(status, type, page, size);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
