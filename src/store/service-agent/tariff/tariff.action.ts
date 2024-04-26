import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { AgentTariffService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentCategoryPayload,
  IAgentCategoryResponse,
  IAgentTariffResponse,
  IAgentTariffResponseV2,
  IGetOneTariffCategoryResponseV2,
  IGetOneTariffPayload,
  ITariffCratePayloadV2,
  ITariffCreateResponseV2,
  ITariffDeletePayload,
  ITariffPayload,
  ITariffUpdatePayload,
  ITariffUploadResponseV2,
} from './types';
import { EndPointesV2 } from '@/services/endpoints-v2';

export const getAllAgentTariffCategory = createAsyncThunk<IAgentTariffResponseV2, ITariffPayload>(
  EndPointesV2.agent.tariff.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await AgentTariffService.getAllTariffCategory();
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

export const getOneAgentTariffCategory = createAsyncThunk<
  IGetOneTariffCategoryResponseV2,
  IGetOneTariffPayload
>(EndPointesV2.agent.tariff.getOne, async ({ callback, id }, thunkApi) => {
  try {
    const response = await AgentTariffService.getOneTariffCategory(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getAllAgentCategory = createAsyncThunk<IAgentCategoryResponse, IAgentCategoryPayload>(
  EndPointesV2.agent.category.getAll,
  async ({ callback, pageNumber, pageSize }, thunkApi) => {
    try {
      const response = await AgentTariffService.getAllCategory(pageNumber, pageSize);
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

export const createAgentTariffCategory = createAsyncThunk<
  ITariffCreateResponseV2,
  ITariffCratePayloadV2
>(EndPointesV2.agent.tariff.create, async (body, thunkApi) => {
  try {
    const response = await AgentTariffService.createTariffCategory(body);
    if (response.data) {
      body.callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateAgentTariffCategory = createAsyncThunk<
  ITariffUploadResponseV2,
  ITariffUpdatePayload
>(EndPointesV2.agent.tariff.update, async ({ callback, id, categoryId, name }, thunkApi) => {
  try {
    const response = await AgentTariffService.updateTariffCategory(id, { categoryId, name });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteAgentTariffCategory = createAsyncThunk<
  IAgentTariffResponse,
  ITariffDeletePayload
>(EndPointesV2.agent.tariff.delete, async ({ callback, id }, thunkApi) => {
  try {
    const response = await AgentTariffService.deleteTariffCategory(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
