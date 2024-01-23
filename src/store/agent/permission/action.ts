import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { PermissionService } from '@/services/agent';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUserPayload } from '../../users/types';
import { IRolesByIdPayload, IRolesDisablePayload } from '../roles/types';
import {
  IAgentPermisionByID,
  IAgentPermissionResponse,
  IPermissionCreatepayload,
  IPermissionEditpayload,
} from './types';

export const getAgentPermissions = createAsyncThunk<IAgentPermissionResponse, IGetUserPayload>(
  'get/Permissions/agent',
  async ({ callback }, thunkApi) => {
    try {
      const response = await PermissionService.getRoles();

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

export const createAgentPermission = createAsyncThunk<any, IPermissionCreatepayload>(
  'create/Permission/agent',
  async ({ name, description, createdByUser, callback }, thunkApi) => {
    try {
      const response = await PermissionService.create({ createdByUser, name, description });
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

export const getAgentPermissionByID = createAsyncThunk<IAgentPermisionByID, IRolesByIdPayload>(
  'get/permissions/by/id',
  async ({ id }, thunkApi) => {
    try {
      const response = await PermissionService.getById(id);

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editAgentPermission = createAsyncThunk<any, IPermissionEditpayload>(
  'edit/Permission/agent',
  async ({ name, description, createdByUser, callback, id }, thunkApi) => {
    try {
      const response = await PermissionService.edit({ createdByUser, name, description }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteAgentPermission = createAsyncThunk<any, IRolesDisablePayload>(
  'disbale/roles',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await PermissionService.delete(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
