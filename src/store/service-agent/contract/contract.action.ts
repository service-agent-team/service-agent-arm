import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ContractService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAddAgentRolePermissionPayload,
  IOneAgentParams,
  IOneAgentResponse,
  IParams,
  IRejectParam,
  IUser,
  IUserResponse,
} from './contract.interface';
import { EndPointesV2 } from '@/services/endpoints-v2';

export const getAllUsers = createAsyncThunk<IUserResponse, IUser>(
  EndPointesV2.agent.contract.getAllUsers,
  async ({ callback, statusName, page, size }, thunkApi) => {
    try {
      const response = await ContractService.getAllUsers(statusName, page, size);
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
  async ({ callback, companyId, currency, userId, multipe_account }, thunkApi) => {
    try {
      const response = await ContractService.acceptAgent({
        companyId,
        currency,
        userId,
        multipe_account,
      });
      if (response) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const rejectAgnet = createAsyncThunk<any, IRejectParam>(
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

export const getOneAgent = createAsyncThunk<IOneAgentResponse, IOneAgentParams>(
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

export const agentAddRolePermission = createAsyncThunk<
  IOneAgentResponse,
  IAddAgentRolePermissionPayload
>('agent/addRolePermission', async ({ userId, roleId, permissionId, callback }, thunkApi) => {
  try {
    const response = await ContractService.agentAddRole(userId, roleId);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  } finally {
    await ContractService.agentAddRolePermission(userId, roleId, permissionId);
  }
});
