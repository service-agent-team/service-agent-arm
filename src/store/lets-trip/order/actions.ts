import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILetsTripOrderResponse, ILetTripOrderPayload } from './types';
import { LetsTripOrderService } from '@/services';
import { appActions } from '@/store/app';

export const getLetsTripOrderByStatus = createAsyncThunk<
  ILetsTripOrderResponse,
  ILetTripOrderPayload
>(EndPointes.letsTripOrder.getByStatus, async ({ status, type, page, size }, thunkApi) => {
  try {
    const response = await LetsTripOrderService.getByCountryId(status, type, page, size);
    if (response.data) {
      thunkApi.dispatch(
        appActions.setPagination({
          current: page + 1,
          pageSize: size,
          total: response.data.count,
        }),
      );
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
