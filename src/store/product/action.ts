import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { ProductService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductPayload, IProductResponse } from './types';

export const getByCategort = createAsyncThunk<IProductResponse,IProductPayload>('get/by/category', async ({categoryId,page,size callback }, thunkApi) => {
  try {
    const response = await ProductService.getByCategory(categoryId,page,size);

    if (response.data.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
},);
