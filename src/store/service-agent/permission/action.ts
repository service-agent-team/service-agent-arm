import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { PermissionService } from '@/services/agent';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRolesByIdPayload, IRolesDisablePayload } from '../roles/types';
import {
  IAgentPermissionByID,
  IAgentPermissionCreatePayloadV2,
  IAgentPermissionCreateResponseV2,
  IAgentPermissionEditPayloadV2,
  IAgentPermissionPayload,
  IAgentPermissionResponseV2,
} from './types';
import { EndPointesV2 } from '@/services/endpoints-v2';
import { AxiosResponse } from 'axios';

export const getAgentPermissions = createAsyncThunk<
  AxiosResponse<IAgentPermissionResponseV2>,
  IAgentPermissionPayload
>(EndPointesV2.agentPermission.getAll, async ({ callback }, thunkApi) => {
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
});

export const createAgentPermission = createAsyncThunk<
  AxiosResponse<IAgentPermissionCreateResponseV2>,
  IAgentPermissionCreatePayloadV2
>(EndPointesV2.agentPermission.create, async ({ name, description, type, callback }, thunkApi) => {
  try {
    const response = await PermissionService.create({ name, description, type });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getAgentPermissionByID = createAsyncThunk<
  AxiosResponse<IAgentPermissionByID>,
  IRolesByIdPayload
>(EndPointesV2.agentPermission.getOne, async ({ id, callback }, thunkApi) => {
  try {
    const response = await PermissionService.getById(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const editAgentPermission = createAsyncThunk<any, IAgentPermissionEditPayloadV2>(
  EndPointesV2.agentPermission.edit,
  async ({ id, callback, name, description, type }, thunkApi) => {
    try {
      const response = await PermissionService.edit(id, { name, description, type });
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
  EndPointesV2.agentPermission.delete,
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
