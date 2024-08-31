import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneLetsTripTransferCategoryPayload,
  ILetsTripTransferCategory,
  ILetsTripTransferCategoryCreatePayload,
  ILetsTripTransferCategoryDeletePayload,
  ILetsTripTransferCategoryImageUpdatePayload,
  ILetsTripTransferCategoryPayload,
  ILetsTripTransferCategoryResponse,
  ILetsTripTransferCategoryUpdatePayload,
} from './types';
import { LetsTripTransferCategoryService } from '@/services';
import { appActions } from '@/store/app';

export const getAllLetsTripTransferCategory = createAsyncThunk<
  ILetsTripTransferCategoryResponse,
  ILetsTripTransferCategoryPayload
>(EndPointes.letsTripTransferCategory.getAll, async ({ page, size, deleted }, thunkApi) => {
  try {
    const response = await LetsTripTransferCategoryService.getAllCategory(page, size, deleted);
    thunkApi.dispatch(
      appActions.setPagination({
        current: page + 1,
        pageSize: size,
        total: response.data.totalElements,
      }),
    );
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneLetsTripTransferCategory = createAsyncThunk<
  ILetsTripTransferCategory,
  IGetOneLetsTripTransferCategoryPayload
>(EndPointes.letsTripTransferCategory.getOne, async ({ callback, categoryId }, thunkApi) => {
  try {
    const response = await LetsTripTransferCategoryService.getOneTransferCategory(categoryId);
    if (response.status) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripTransferCategory = createAsyncThunk<
  ILetsTripTransferCategory,
  ILetsTripTransferCategoryCreatePayload
>(EndPointes.letsTripTransferCategory.create, async ({ callback, body }, thunkApi) => {
  try {
    const response = await LetsTripTransferCategoryService.createTransferCategory(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateLetsTripTransferCategory = createAsyncThunk<
  ILetsTripTransferCategory,
  ILetsTripTransferCategoryUpdatePayload
>(EndPointes.letsTripTransferCategory.update, async ({ callback, categoryId, body }, thunkApi) => {
  try {
    const response = await LetsTripTransferCategoryService.updateTransferCategory(categoryId, body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateLetsTripTransferCategoryImage = createAsyncThunk<
  ILetsTripTransferCategory,
  ILetsTripTransferCategoryImageUpdatePayload
>(
  EndPointes.letsTripTransferCategory.update + '/id/image',
  async ({ callback, categoryId, image }, thunkApi) => {
    try {
      const response = await LetsTripTransferCategoryService.updateTransferCategoryImage(
        categoryId,
        image,
      );
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteLetsTripTransferCategory = createAsyncThunk<
  any,
  ILetsTripTransferCategoryDeletePayload
>(EndPointes.letsTripTransferCategory.delete, async ({ callback, categoryId }, thunkApi) => {
  try {
    const response = await LetsTripTransferCategoryService.deleteTransferCategory(categoryId);
    if (response.status) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
