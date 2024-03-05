import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { RolesService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../../global/users/types';
import {
  IRolesByIdPayload,
  IRolesByIdResponse,
  IRolesCreateResponse,
  IRolesCreatepayload,
  IRolesDisablePayload,
  IRolesEditResponse,
  IRolesEditpayload,
  IRolesResponse,
} from './types';

export const getRoles = createAsyncThunk<IRolesResponse, IGetUserPayload>(
  'get/Roles',
  async ({ callback }, thunkApi) => {
    try {
      const response = await RolesService.getRoles();

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

export const createRoles = createAsyncThunk<IRolesCreateResponse, IRolesCreatepayload>(
  'create/Roles',
  async ({ name, description, callback }, thunkApi) => {
    try {
      const response = await RolesService.createRoles({ name, description });
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

export const getRolesById = createAsyncThunk<IRolesByIdResponse, IRolesByIdPayload>(
  'get/roles/by.id',
  async ({ id }, thunkApi) => {
    try {
      const response = await RolesService.getRoleById(id);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editRoles = createAsyncThunk<IRolesEditResponse, IRolesEditpayload>(
  'edit/roles',
  async ({ name, description, callback, id }, thunkApi) => {
    try {
      const response = await RolesService.editRoles({ name, description }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteRoles = createAsyncThunk<IRolesEditResponse, IRolesDisablePayload>(
  'disbale/roles',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await RolesService.delete(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
