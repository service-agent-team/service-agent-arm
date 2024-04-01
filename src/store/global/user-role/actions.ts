import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserRoleCreatePayload,
  IUserRoleCreateResponse,
  IUserRoleDeletePayload,
  IUserRolePayload,
  IUserRoleResponse,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { UserRoleService } from '@/services';

export const getAllUserRole = createAsyncThunk<IUserRoleResponse, IUserRolePayload>(
  EndPointes.userRole.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await UserRoleService.getAllUserRole();
      if (response.status === 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createUserRole = createAsyncThunk<IUserRoleCreateResponse, IUserRoleCreatePayload>(
  EndPointes.userRole.create,
  async ({ callback, ...body }, thunkApi) => {
    try {
      const response = await UserRoleService.createUserRole(body);
      if (response.status == 201) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteUserRole = createAsyncThunk<IUserRoleDeletePayload, IUserRoleDeletePayload>(
  EndPointes.userRole.delete,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await UserRoleService.deleteUserRole(id);
      if (response.status == 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
