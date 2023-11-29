import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { ContractService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserResponse, IUser } from './contract.interface';

export const getAllUsers = createAsyncThunk<IUserResponse, IUser>(
  'agent/all',
  async ({ callback }, thunkApi) => {
    try {
      const response = await ContractService.getAllUsers();
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
