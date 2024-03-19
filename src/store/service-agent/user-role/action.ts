import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentUserRolesCreatePayload,
  IAgentUserRolesCreateResponse,
  IAgentUserRolesDeletePayload,
  IAgentUserRolesGetOneResponse,
  IAgentUserRolesGetOneResponsePayload,
  IAgentUserRolesGetResponse,
  IAgentUserRolesGetResponsePayload,
  IAgentUserRolesUpdatePayload,
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
export const getOneAgentUserRole = createAsyncThunk<
  IAgentUserRolesGetOneResponse,
  IAgentUserRolesGetOneResponsePayload
>(EndPointes.userRoles.getOne, async ({ id, callback }, thunkApi) => {
  try {
    const response = await AgentUserRoleService.getOneAgentUserRole(id);
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

export const updateAgentUserRole = createAsyncThunk<
  IAgentUserRolesCreateResponse,
  IAgentUserRolesUpdatePayload
>(EndPointes.userRoles.edit, async ({ id, userId, roleId, callback }, thunkApi) => {
  try {
    const response = await AgentUserRoleService.updateAgentUserRole({ id, userId, roleId });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
export const deleteAgentUserRole = createAsyncThunk<
  IAgentUserRolesCreateResponse,
  IAgentUserRolesDeletePayload
>(EndPointes.userRoles.delete, async ({ id, callback }, thunkApi) => {
  try {
    const response = await AgentUserRoleService.deleteAgentUserRole({ id });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
