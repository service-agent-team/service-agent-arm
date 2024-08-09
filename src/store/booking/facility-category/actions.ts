import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingFacilityCategoryService } from '@/services';
import { appActions } from '@/store/app';
import { IFacilityCategoryPayload, IFacilityCategoryResponse } from './types';

export const getAllFacilityCategory = createAsyncThunk<
  IFacilityCategoryResponse,
  IFacilityCategoryPayload
>(EndPointes.letsTripCountry.getAll + '/get-all', async ({ page, size }, thunkApi) => {
  try {
    const response = await BookingFacilityCategoryService.getAll(page, size);
    if (response.data) {
      thunkApi.dispatch(
        appActions.setPagination({
          total: response.data.count,
        }),
      );
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
