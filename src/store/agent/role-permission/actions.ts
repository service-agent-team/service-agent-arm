import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { AgentRolesService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAgentRolesPayload, IRolesResponse } from './types';

export const createAgentRoles = createAsyncThunk<IRolesResponse, IAgentRolesPayload>(
  'create/agent/Roles',
  async ({ userId, roleId, callback }, thunkApi) => {
    try {
      const response = await AgentRolesService.createUserRole({ roleId, userId });
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
