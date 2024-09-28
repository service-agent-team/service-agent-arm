import { errorCatch } from '@/common/helpers';
import { ProcessProjectService } from '@/services';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateProcessProjectPayload,
  IProcessProject,
  IProcessProjectPayload,
  IUpdateProcessPayload,
} from './types';

export const getAllProcessProject = createAsyncThunk<IProcessProject[], any>(
  EndPointes.processProject + '/getAll',
  async (_, thunkApi) => {
    try {
      const response = await ProcessProjectService.getAll();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneProcessProject = createAsyncThunk<IProcessProject, IProcessProjectPayload>(
  EndPointes.processProject + '/getOne',
  async ({ id }, thunkApi) => {
    try {
      const response = await ProcessProjectService.getOne(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createProcessProject = createAsyncThunk<IProcessProject, ICreateProcessProjectPayload>(
  EndPointes.processProject + '/create',
  async ({ cb, body }, thunkApi) => {
    try {
      const response = await ProcessProjectService.create(body);

      if (response) {
        cb();
      }

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updateProcessProject = createAsyncThunk<IProcessProject, IUpdateProcessPayload>(
  EndPointes.processProject + '/update',
  async ({ cb, id, body }, thunkApi) => {
    try {
      const response = await ProcessProjectService.update(id, body);

      if (response) {
        cb();
      }

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteProcessProject = createAsyncThunk<IProcessProject, IProcessProjectPayload>(
  EndPointes.processProject + '/delete',
  async ({ cb, id }, thunkApi) => {
    try {
      const response = await ProcessProjectService.delete(id);

      if (response.status === 204 && cb) {
        cb();
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
