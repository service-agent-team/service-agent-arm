import { errorCatch } from '@/common/helpers';
import { ProcessService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EndPointes } from '@/services/endpoints';
import { ICreateProcessPayload, IProcess, IProcessPayload, IUpdateProcessPayload } from './types';

export const getAllProcess = createAsyncThunk<IProcess[], any>(
  EndPointes.process + '/getAll',
  async (_, thunkApi) => {
    try {
      const response = await ProcessService.getAll();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneProcess = createAsyncThunk<IProcess[], IProcessPayload>(
  EndPointes.process + '/getOne',
  async ({ id, cb }, thunkApi) => {
    try {
      const response = await ProcessService.getOne(id);
      if (response) {
        cb();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createProcess = createAsyncThunk<IProcess, ICreateProcessPayload>(
  EndPointes.process + '/create',
  async ({ cb, body }, thunkApi) => {
    try {
      const response = await ProcessService.create(body);
      if (response) {
        cb();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updateProcess = createAsyncThunk<IProcess, IUpdateProcessPayload>(
  EndPointes.process + '/update',
  async ({ cb, id, body }, thunkApi) => {
    try {
      const response = await ProcessService.update(id, body);
      if (response) {
        cb();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteProcess = createAsyncThunk<IProcess, IProcessPayload>(
  EndPointes.process + '/delete',
  async ({ cb, id }, thunkApi) => {
    try {
      const response = await ProcessService.delete(id);
      if (response) {
        cb();
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
