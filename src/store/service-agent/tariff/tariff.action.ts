import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { AgentTariffService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentTariffResponse,
  ITariffCreatePayload,
  ITariffDeletePayload,
  ITariffPayload,
} from './types';
import { EndPointes } from '@/services/endpoints';

export const getCategory = createAsyncThunk<IAgentTariffResponse, ITariffPayload>(
  EndPointes.agent.tariff.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await AgentTariffService.getAllCategory();
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createCategory = createAsyncThunk<IAgentTariffResponse, ITariffCreatePayload>(
  EndPointes.agent.tariff.delete,
  async (body, thunkApi) => {
    try {
      const response = await AgentTariffService.createTariff(body);
      if (response.data) {
        body.callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteCategory = createAsyncThunk<IAgentTariffResponse, ITariffDeletePayload>(
  EndPointes.agent.tariff.delete,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await AgentTariffService.deleteTariff(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
