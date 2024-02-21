import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ProductService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOneProductPayload,
  IOneProductResponse,
  IPostProductPayload,
  IProductPayload,
  IProductResponse,
} from './types';

export const getByProducts = createAsyncThunk<IProductResponse, IProductPayload>(
  'by/product',
  async ({ categoryId, page, size, callback }, thunkApi) => {
    try {
      const response = await ProductService.getByCategory(categoryId, page, size);

      if (response.data.status == 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneProduct = createAsyncThunk<IOneProductResponse, IOneProductPayload>(
  'one/product',
  async ({ productId, callback }, thunkApi) => {
    try {
      const response = await ProductService.getOneProduct(productId);
      if (response.data.status == 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const addProduct = createAsyncThunk<IOneProductPayload, IPostProductPayload>(
  'create/product',
  async ({ body, callback }, thunkApi) => {
    try {
      const response = await ProductService.postProduct(body);
      if (response.data.status >= 200 || response.data.status <= 300) {
        callback();
        history.back();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
