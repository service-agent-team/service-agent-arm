import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneRoleResponse,
  IRoleCreatePayload,
  IRoleCreateResponse,
  IRoleDeletePayload,
  IRolePayload,
  IRoleResponse,
  IRoleUpdatePayload,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { RoleService } from '@/services';

export const getAllRole = createAsyncThunk<IRoleResponse, IRolePayload>(
  EndPointes.role.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await RoleService.getAllRole();
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

export const getOneRole = createAsyncThunk<IGetOneRoleResponse, IRoleDeletePayload>(
  EndPointes.role.getOne,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await RoleService.getOneRole(id);
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

export const createRole = createAsyncThunk<IRoleCreateResponse, IRoleCreatePayload>(
  EndPointes.role.create,
  async ({ callback, ...body }, thunkApi) => {
    try {
      const response = await RoleService.createRole(body);
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

export const updateRole = createAsyncThunk<IRoleCreateResponse, IRoleUpdatePayload>(
  EndPointes.role.edit,
  async ({ callback, id, ...body }, thunkApi) => {
    try {
      const response = await RoleService.updateRole(id, body);
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

export const deleteRole = createAsyncThunk<IRoleCreateResponse, IRoleDeletePayload>(
  EndPointes.role.delete,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await RoleService.deleteRole(id);
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
