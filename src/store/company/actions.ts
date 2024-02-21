import { errorCatch } from '@/common/helpers';
import { ComapnyService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICompanyPayload, ICompanyResponse } from './types';
// import { addNotification } from '@/libs/utils/addNotification';

export const getCompany = createAsyncThunk<ICompanyResponse, ICompanyPayload>(
  'get/company',
  async ({ page, size }, thunkApi) => {
    try {
      const response = await ComapnyService.getAllCompany(page, size);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
