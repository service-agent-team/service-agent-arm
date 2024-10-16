import { errorCatch } from '@/common';
import { LetsTripTransferCarService } from '@/services';
import { EndPointes } from '@/services/endpoints';
import { IGlobalCountry } from '@/types';
import { IGlobalResponse } from '@/types/response';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  ICountryRegions,
  ICreateTransferDirectionPay,
  IDeleteDirectionPay,
  ILetsTripTransfer,
  ILetsTripTransferCreatePayload,
  ILetsTripTransferCreateResponse,
  ILetsTripTransferDeletePayload,
  ILetsTripTransferGetByCategoryIdPayload,
  ILetsTripTransferGetOnePayload,
  ILetsTripTransferPayload,
  ILetsTripTransferResponse,
  ILetsTripTransferSearchPayload,
  ILetsTripTransferUpdateI18Payload,
  ILetsTripTransferUpdatePayload,
  IUpdateDirectionPayload,
} from './types';
import { appActions } from '@/store/app';

export const getAllLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferPayload
>(EndPointes.letsTripTransfer.getAll, async ({ page, size }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.getAllTransfer(page, size);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const searchLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferSearchPayload
>(EndPointes.letsTripTransfer.search, async ({ callback, name, page, size }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.search(name, page, size);
    if (response.data && callback) {
      callback();
    }
    thunkApi.dispatch(
      appActions.setSearchPagination({
        current: response.data.pageable.pageNumber + 1,
        pageSize: response.data.pageable.pageSize,
        total: response.data.totalElements,
      }),
    );
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
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getByCategoryIdLetsTripTransfer = createAsyncThunk<
  ILetsTripTransferResponse,
  ILetsTripTransferGetByCategoryIdPayload
>(EndPointes.letsTripTransfer.getByCategoryId, async ({ categoryId, page, size }, thunkApi) => {
  try {
    const response = await LetsTripTransferCarService.getByCategoryId(categoryId, page, size);
    if (response.data) {
      thunkApi.dispatch(
        appActions.setPagination({
          current: response.data.pageable.pageNumber + 1,
          pageSize: response.data.pageable.pageSize,
          total: response.data.totalElements,
        }),
      );
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

export const updateTransferDirectionPrice = createAsyncThunk<
  AxiosResponse<ILetsTripTransfer>,
  IUpdateDirectionPayload
>(
  EndPointes.letsTripTransfer.update + '/update-direction-price',
  async ({ carId, directionId, body, callback }, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.updateDirectionCar(
        carId,
        directionId,
        body,
      );
      if (response.data && callback) {
        callback();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteTransferDirection = createAsyncThunk<any, IDeleteDirectionPay>(
  EndPointes.letsTripTransfer.deleteDirection + '/direction/delete',
  async ({ carId, directionId, callback }, thunkApi) => {
    try {
      const response = await LetsTripTransferCarService.deleteDirectionCar(carId, directionId);
      if (response.status === 200 && callback) {
        callback();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const globalCountries = createAsyncThunk<IGlobalResponse<IGlobalCountry[]>, any>(
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

export const countryRegions = createAsyncThunk<IGlobalResponse<IGlobalCountry[]>, ICountryRegions>(
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
