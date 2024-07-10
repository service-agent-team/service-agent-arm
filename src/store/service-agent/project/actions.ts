import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAgentProjectPayload,
  IAgentProjectResponseV2,
  IAgentProjectV2,
  ICreateAgentProjectResponse,
  ICreteAgentProjectPayload,
  IDeleteAgentProjectPayload,
  IDeleteAgentProjectResponseV2,
  IUpdateProjectPayloadV2,
} from './types';
import { AgentProjectService } from '@/services';
import { AxiosResponse } from 'axios';
import { EndPointesV2 } from '@/services/endpoints-v2';
import { appActions } from '@/store/app';

export const getAllAgentProject = createAsyncThunk<
  AxiosResponse<IAgentProjectResponseV2>,
  IAgentProjectPayload
>(EndPointesV2.agent.project.getAll, async ({ callback, pageNumber, pageSize }, thunkApi) => {
  try {
    const response = await AgentProjectService.getAllAgentProject(pageNumber, pageSize);
    if (response.status == 200) {
      thunkApi.dispatch(
        appActions.setPagination({
          current: response.data.data.pageable.pageNumber + 1,
          pageSize: response.data.data.pageable.pageSize,
          total: response.data.data.totalElements,
        }),
      );
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneAgentProject = createAsyncThunk<
  AxiosResponse<IAgentProjectV2>,
  IDeleteAgentProjectPayload
>(EndPointesV2.agent.project.getOne, async ({ callback, id }, thunkApi) => {
  try {
    const response = await AgentProjectService.getOneAgentProject(id);
    if (response.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createAgentProjectByAgent = createAsyncThunk<
  ICreateAgentProjectResponse,
  ICreteAgentProjectPayload
>(EndPointesV2.agent.project.create, async ({ callback, name, description }, thunkApi) => {
  try {
    const response = await AgentProjectService.createAgentProjectByAgent({
      name,
      description,
    });
    if (response.status === 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const editAgentProjectByAgent = createAsyncThunk<
  ICreateAgentProjectResponse,
  IUpdateProjectPayloadV2
>(EndPointesV2.agent.project.edit, async ({ id, callback, name, description }, thunkApi) => {
  try {
    const response = await AgentProjectService.updateAgentProjectByAgent(id, {
      name,
      description,
    });
    if (response.status === 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteAgentProject = createAsyncThunk<
  IDeleteAgentProjectResponseV2,
  IDeleteAgentProjectPayload
>(EndPointesV2.agent.project.delete, async ({ callback, id }, thunkApi) => {
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
