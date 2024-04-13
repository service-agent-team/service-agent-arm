import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserPermissionPayload,
  IUserPermissionResponse,
  IOneUserPermissionResponse,
  IUserPermissionCreateResponse,
  IGetUserPermissionPayload,
  IUserPermissionCreatePayload,
  IUserPermissionUpdatePayload,
  IUserPermissionDeletePayload,
  IUserPermissionDeleteResponse,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { UserPermissionsService } from '@/services';

export const getAllUserPermission = createAsyncThunk<
  IUserPermissionResponse,
  IUserPermissionPayload
>(EndPointes.userPermission.getAll, async ({ callback }, thunkApi) => {
  try {
    const response = await UserPermissionsService.getAllUserPermission();
    if (response.status === 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneUserPermission = createAsyncThunk<
  IOneUserPermissionResponse,
  IGetUserPermissionPayload
>(EndPointes.userPermission.getOne, async ({ callback, id }, thunkApi) => {
  try {
    const response = await UserPermissionsService.getAOneUserPermission(id);
    if (response.status === 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createUserPermission = createAsyncThunk<
  IUserPermissionCreateResponse,
  IUserPermissionCreatePayload
>(EndPointes.userPermission.create, async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await UserPermissionsService.createUserPermission(body);
    if (response.status == 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateUserPermission = createAsyncThunk<
  IUserPermissionCreateResponse,
  IUserPermissionUpdatePayload
>(EndPointes.userPermission.edit, async ({ callback, id, ...body }, thunkApi) => {
  try {
    const response = await UserPermissionsService.updateUserPermission(id, body);
    if (response.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const deleteUserPermission = createAsyncThunk<
  IUserPermissionDeleteResponse,
  IUserPermissionDeletePayload
>(EndPointes.userPermission.delete, async ({ callback, id }, thunkApi) => {
  try {
    const response = await UserPermissionsService.deleteUserPermission(id);
    if (response.status == 200) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
