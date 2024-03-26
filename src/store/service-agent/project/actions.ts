import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAgentProjectPayload, IAgentProjectResponse } from './types';
import { AgentProjectService } from '@/services';
import { EndPointes } from '@/services/endpoints';

export const getAllAgentProject = createAsyncThunk<IAgentProjectResponse, IAgentProjectPayload>(
  EndPointes.agent.project.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await AgentProjectService.getAllAgentProject();

      if (response.data.status == 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
