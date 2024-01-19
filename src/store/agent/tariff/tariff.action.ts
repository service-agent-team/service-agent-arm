import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { AgentTariffService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAgentTariffResponse, ITariffPayload } from './types';

export const getCategory = createAsyncThunk<IAgentTariffResponse, ITariffPayload>(
  'category/all',
  async ({ callback }, thunkApi) => {
    try {
      const response = await AgentTariffService.getAllCategory();
      if (response) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
