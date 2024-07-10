import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ContractService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAddAgentProjectPayload,
  IAddAgentProjectPermissionPayload,
  IAddAgentRolePayload,
  IAddAgentRolePermissionPayload,
  IUpdateAgentProjectPermissionPayload,
  IUpdateAgentRolePermissionPayload,
  IUpdateAgentTariffPermissionPayload,
} from './interface';
import { AgentPermissionsService } from '@/services/agent';

export const updateAgentRolePermission = createAsyncThunk<any, IUpdateAgentRolePermissionPayload>(
  'agent/updateRolePermission',
  async ({ callback, userId, roleId, permissionIds }, thunkApi) => {
    try {
      const response = await AgentPermissionsService.updateRolePermission(
        userId,
        roleId,
        permissionIds,
      );
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

export const updateAgentTariffPermission = createAsyncThunk<
  any,
  IUpdateAgentTariffPermissionPayload
>(
  'agent/updateTariffPermission',
  async ({ callback, userId, tariffId, permissionIds }, thunkApi) => {
    try {
      const response = await AgentPermissionsService.updateTariffPermission(
        userId,
        tariffId,
        permissionIds,
      );
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

export const updateAgentProjectPermission = createAsyncThunk<
  any,
  IUpdateAgentProjectPermissionPayload
>(
  'agent/updateProjectPermission',
  async ({ callback, userId, projectId, permissionIds }, thunkApi) => {
    try {
      const response = await AgentPermissionsService.updateProjectPermission(
        userId,
        projectId,
        permissionIds,
      );
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

export const agentAddRole = createAsyncThunk<any, IAddAgentRolePayload>(
  'agent/addRole',
  async ({ userId, roleId, callback }, thunkApi) => {
    try {
      const response = await ContractService.agentAddRole(userId, roleId);
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

export const agentAddRolePermission = createAsyncThunk<any, IAddAgentRolePermissionPayload>(
  'agent/addRolePermission',
  async ({ userId, roleId, permissionId, callback }, thunkApi) => {
    try {
      const response = await ContractService.agentAddRolePermission(userId, roleId, permissionId);
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

export const agentRemoveRole = createAsyncThunk<any, IAddAgentRolePayload>(
  'agent/removeRole',
  async ({ userId, roleId, callback }, thunkApi) => {
    try {
      const response = await ContractService.agentRemoveRoleFromUser(userId, roleId);
      if (response.status === 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const agentRemoveRolePermission = createAsyncThunk<any, IAddAgentRolePermissionPayload>(
  'agent/removeRolePermission',
  async ({ userId, roleId, permissionId, callback }, thunkApi) => {
    try {
      const response = await ContractService.agentRemovePermissionFromUserRole(
        userId,
        roleId,
        permissionId,
      );
      if (response.status === 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const agentAddProjectToUser = createAsyncThunk<any, IAddAgentProjectPayload>(
  'agent/addProjectToUser',
  async ({ userId, projectId, callback }, thunkApi) => {
    try {
      const response = await ContractService.addProjectToUser(userId, projectId);
      if (response.status === 201) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const agentAddPermissionToUserProject = createAsyncThunk<
  any,
  IAddAgentProjectPermissionPayload
>(
  'agent/addPermissionToProject',
  async ({ userId, projectId, permissionId, callback }, thunkApi) => {
    try {
      const response = await ContractService.addPermissionToUserProject(
        userId,
        projectId,
        permissionId,
      );
      if (response.status === 201) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const agentRemoveProject = createAsyncThunk<any, IAddAgentProjectPayload>(
  'agent/removeProject',
  async ({ userId, projectId, callback }, thunkApi) => {
    try {
      const response = await ContractService.removeProjectFromUser(userId, projectId);
      if (response.status === 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const agentRemovePermissionProject = createAsyncThunk<
  any,
  IAddAgentProjectPermissionPayload
>(
  'agent/removePermissionProject',
  async ({ userId, projectId, permissionId, callback }, thunkApi) => {
    try {
      const response = await ContractService.removePermissionFromToUserProject(
        userId,
        projectId,
        permissionId,
      );
      if (response.status === 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
