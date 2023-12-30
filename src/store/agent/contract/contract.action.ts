import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { ContractService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IParams, IUser, IUserResponse } from './contract.interface';

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
  async ({ userId, callback }, thunkApi) => {
    try {
      const response = await ContractService.acceptAgent(userId);
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

export const rejectAgnet = createAsyncThunk<any, IParams>(
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

export const getOneAgent = createAsyncThunk<any, IParams>(
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
