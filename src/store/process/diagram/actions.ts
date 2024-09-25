import { errorCatch } from '@/common/helpers';
import { ProcessProjectService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateProcessProjectPayload,
  IProcessProjectPayload,
  IProcessProject,
  IUpdateProcessPayload,
} from './types';
import { EndPointes } from '@/services/endpoints';

export const getAllProcessProject = createAsyncThunk<IProcessProject[], any>(
  EndPointes.processProject + '/getAll',
  async (_, thunkApi) => {
    try {
      const response = await ProcessProjectService.getAll();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneProcessProject = createAsyncThunk<IProcessProject[], IProcessProjectPayload>(
  EndPointes.processProject + '/getOne',
  async ({ id, cb }, thunkApi) => {
    try {
      const response = await ProcessProjectService.getOne(id);
      if (response.data) {
        cb();
      }
      return response.data;
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

      if (response.data) {
        cb();
      }

      return response.data;
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

      if (response.data) {
        cb();
      }

      return response.data;
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

      if (response.status === 204) {
        cb();
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
