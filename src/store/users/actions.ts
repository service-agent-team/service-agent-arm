import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { UserService } from '@/services/Users/user-service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRolesDisablePayload } from '../agent/roles/types';
import { ICreateUserPayload, IGetUserPayload, IUserEditPayload, IUserResponse } from '@/types';
import { IGetAllPayload } from '@/types/common';

export const getUsers = createAsyncThunk<IUserResponse, IGetUserPayload>(
  'get/users',
  async ({ callback }, thunkApi) => {
    try {
      const response = await UserService.getUsers();

      if (response.data.status == 200) {
        if (callback) {
          callback();
        }
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createUser = createAsyncThunk<IUserResponse, ICreateUserPayload>(
  'create/user',
  async ({ payload: { userName, password, email, role }, callback }, thunkApi) => {
    try {
      const response = await UserService.createUser({ userName, password, email, role: +role });
      if (response.data) {
        if (callback) {
          callback();
        }
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getOneUser = createAsyncThunk<IUserResponse, IGetAllPayload>(
  'get/userOne',
  async ({ id, callback }, thunkApi) => {
    try {
      const response = await UserService.getUserOne(id);

      if (response.data) {
        if (callback) {
          callback();
        }
      }

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editUser = createAsyncThunk<IUserResponse, IUserEditPayload>(
  'edit/userById',
  async ({ payload: { userName, email }, callback, id }, thunkApi) => {
    try {
      const response = await UserService.editUser(id, { userName, email });
      if (response.data && callback) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteUsers = createAsyncThunk<IUserResponse, IRolesDisablePayload>(
  'delete/users',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await UserService.delete(id as string);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
