import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentUserRolesCreatePayload,
  IAgentUserRolesCreateResponse,
  IAgentUserRolesGetResponse,
  IAgentUserRolesGetResponsePayload,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { AgentUserRoleService } from '@/services/agent';

export const getAllAgentUserRole = createAsyncThunk<
  IAgentUserRolesGetResponse,
  IAgentUserRolesGetResponsePayload
>(EndPointes.userRoles.getAll, async ({ callback }, thunkApi) => {
  try {
    const response = await AgentUserRoleService.getAllAgentUserRole();
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createAgentUserRole = createAsyncThunk<
  IAgentUserRolesCreateResponse,
  IAgentUserRolesCreatePayload
>(EndPointes.userRoles.create, async ({ userId, roleId, callback }, thunkApi) => {
  try {
    const response = await AgentUserRoleService.createAgentUserRole({ userId, roleId });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
