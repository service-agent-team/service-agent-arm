import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ContractService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOneAgentParams,
  IOneAgentResponce,
  IParams,
  IRejectParam,
  IUser,
  IUserResponse,
} from './contract.interface';

export const getAllUsers = createAsyncThunk<IUserResponse, IUser>(
  'agent/all',
  async ({ callback, statusName }, thunkApi) => {
    try {
      const response = await ContractService.getAllUsers(statusName);
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

export const acceptAgnet = createAsyncThunk<any, IParams>(
  'agent/accept',
  async ({ callback, companyId, currency, userId }, thunkApi) => {
    try {
      const response = await ContractService.acceptAgent({ companyId, currency, userId });
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

export const rejectAgnet = createAsyncThunk<any, IRejectParam>(
  'agent/reject',
  async ({ userId, callback }, thunkApi) => {
    try {
      const response = await ContractService.rejectAgent(userId);
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

export const getOneAgent = createAsyncThunk<IOneAgentResponce, IOneAgentParams>(
  'agent/one',
  async ({ userId, callback }, thunkApi) => {
    try {
      const response = await ContractService.getOneAgent(userId);
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
