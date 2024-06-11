import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LetsTripGlobalRegionService } from '@/services';
import {
  CreateGlobalRegionPayload,
  GlobalCountryPayload,
  GlobalCountryResponse,
  ILetsTripGlobalRegion,
} from './types';
import { appActions } from '@/store/app';

export const getByCountryIdRegion = createAsyncThunk<GlobalCountryResponse, GlobalCountryPayload>(
  EndPointes.letsTripGlobalRegion.getByCountryId,
  async ({ countryId, page, size }, thunkApi) => {
    try {
      const response = await LetsTripGlobalRegionService.getByCountryId(countryId, page, size);
      thunkApi.dispatch(
        appActions.setPagination({
          current: response.data.data.pageable.pageNumber + 1,
          pageSize: response.data.data.pageable.pageSize,
          total: response.data.data.totalElements,
        }),
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createGlobalRegion = createAsyncThunk<
  ILetsTripGlobalRegion,
  CreateGlobalRegionPayload
>(EndPointes.letsTripGlobalRegion.create, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripGlobalRegionService.create(body);
    if (response.status == 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
