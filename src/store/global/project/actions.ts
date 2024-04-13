import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { ProjectService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateProductPayload,
  IDeleteProductPayload,
  IOneProductResponse,
  IProductPayload,
  IProductResponse,
  IUpdateProductPayload,
} from './types';
import { EndPointes } from '@/services/endpoints';

export const getAllProject = createAsyncThunk<IProductResponse, IProductPayload>(
  EndPointes.project.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await ProjectService.getAllProject();
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

export const getOneProject = createAsyncThunk<IOneProductResponse, IDeleteProductPayload>(
  EndPointes.project.getOne,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await ProjectService.getOneProject(id);
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

export const createProject = createAsyncThunk<IOneProductResponse, ICreateProductPayload>(
  EndPointes.project.create,
  async ({ callback, ...body }, thunkApi) => {
    try {
      const response = await ProjectService.createProject(body);
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

export const updateProject = createAsyncThunk<IOneProductResponse, IUpdateProductPayload>(
  EndPointes.project.edit,
  async ({ callback, id, ...body }, thunkApi) => {
    try {
      const response = await ProjectService.updateProject(id, body);
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

export const deleteProject = createAsyncThunk<IOneProductResponse, IDeleteProductPayload>(
  EndPointes.project.delete,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await ProjectService.deleteProject(id);
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
