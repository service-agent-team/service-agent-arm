import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentUserPermissionGetResponse,
  IAgentUserPermissionGetResponsePayload,
  IAgentUserPermissionCreatePayload,
  IAgentUserPermissionCreateResponse,
  IAgentUserPermissionUpdateResponse,
  IAgentUserPermissionDeletePayload,
  IAgentUserPermissionDeleteResponse,
  IAgentUserPermissionUpdatePayload,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { AgentUserPermissionService } from '@/services/agent';

export const getAllAgentUserPermission = createAsyncThunk<
  IAgentUserPermissionGetResponse,
  IAgentUserPermissionGetResponsePayload
>(EndPointes.userPermissions.getAll, async ({ callback }, thunkApi) => {
  try {
    const response = await AgentUserPermissionService.getAllAgentUserPermission();
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createAgentUserPermission = createAsyncThunk<
  IAgentUserPermissionCreateResponse,
  IAgentUserPermissionCreatePayload
>(
  EndPointes.userPermissions.create,
  async ({ permissionId, userId, projectId, callback }, thunkApi) => {
    try {
      const response = await AgentUserPermissionService.createAgentUserPermission({
        permissionId,
        userId,
        projectId,
      });
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

export const updateAgentUserPermission = createAsyncThunk<
  IAgentUserPermissionUpdateResponse,
  IAgentUserPermissionUpdatePayload
>(
  EndPointes.userPermissions.create,
  async ({ permissionId, userId, projectId, callback }, thunkApi) => {
    try {
      const response = await AgentUserPermissionService.createAgentUserPermission({
        permissionId,
        userId,
        projectId,
      });
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

export const deleteAgentUserPermission = createAsyncThunk<
  IAgentUserPermissionDeleteResponse,
  IAgentUserPermissionDeletePayload
>(EndPointes.userPermissions.delete, async ({ permissionId, callback }, thunkApi) => {
  try {
    const response = await AgentUserPermissionService.deleteAgentUserPermission({
      permissionId,
    });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
