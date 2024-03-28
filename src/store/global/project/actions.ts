import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ProjectService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductPayload, IProductResponse } from './types';
import { EndPointes } from '@/services/endpoints';

export const getAllProject = createAsyncThunk<IProductResponse, IProductPayload>(
  EndPointes.project.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await ProjectService.getAllProject();

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
