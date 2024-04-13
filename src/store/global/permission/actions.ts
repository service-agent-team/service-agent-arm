import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { PermissionService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDeletePermissionPayload,
  IOnePermissionResponse,
  IPermissionCreatePayload,
  IPermissionCreateResponse,
  IPermissionPayload,
  IPermissionResponse,
  IPermissionUploadPayload,
} from './types';
import { EndPointes } from '@/services/endpoints';

export const getPermisions = createAsyncThunk<IPermissionResponse, IPermissionPayload>(
  EndPointes.permissions.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await PermissionService.getPermissions();
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

export const getOnePermision = createAsyncThunk<IOnePermissionResponse, IDeletePermissionPayload>(
  EndPointes.permissions.getOne,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await PermissionService.getOnePermission(id);
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

export const createPermission = createAsyncThunk<
  IPermissionCreateResponse,
  IPermissionCreatePayload
>(
  EndPointes.permissions.create,
  async ({ permissionName, permissionDescription, callback }, thunkApi) => {
    try {
      const response = await PermissionService.createPermission({
        permissionDescription,
        permissionName,
      });
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

export const updatePermission = createAsyncThunk<IOnePermissionResponse, IPermissionUploadPayload>(
  EndPointes.permisions.edit,
  async ({ callback, id, ...body }, thunkApi) => {
    try {
      const response = await PermissionService.updatePermission(id, body);
      if (response.status === 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deletePermission = createAsyncThunk<IOnePermissionResponse, IDeletePermissionPayload>(
  EndPointes.permisions.delete,
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await PermissionService.deltePermission(id);
      if (response.status === 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
