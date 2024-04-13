import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentProjectPayload,
  IAgentProjectResponse,
  ICreateAgentProjectResponse,
  ICreteAgentProjectPayload,
  IDeleteAgentProjectPayload,
  IDeleteAgentProjectResponse,
} from './types';
import { AgentProjectService } from '@/services';
import { EndPointes } from '@/services/endpoints';

export const getAllAgentProject = createAsyncThunk<IAgentProjectResponse, IAgentProjectPayload>(
  EndPointes.agent.project.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await AgentProjectService.getAllAgentProject();
      if (response.status == 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createAgentProjectByAgent = createAsyncThunk<
  ICreateAgentProjectResponse,
  ICreteAgentProjectPayload
>(
  EndPointes.agent.project.create,
  async ({ callback, name, description, createdByUser }, thunkApi) => {
    try {
      const response = await AgentProjectService.createAgentProjectByAgent({
        name,
        description,
        createdByUser,
      });
      if (response.data.status == 201) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteAgentProject = createAsyncThunk<
  IDeleteAgentProjectResponse,
  IDeleteAgentProjectPayload
>(EndPointes.agent.project.delete, async ({ callback, id }, thunkApi) => {
  try {
    const response = await AgentProjectService.deleteAgentProject(id);
    if (response.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
