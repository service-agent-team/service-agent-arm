import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { UserPermissionService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPermissionCreatePayload, IPermissionCreateResponse, IPermissionResponse } from '..';
import { IGetUserPayload } from '../users/types';

export const getPermisions = createAsyncThunk<IPermissionResponse, IGetUserPayload>(
  'get/permissionsss',
  async ({ callback }, thunkApi) => {
    try {
      const response = await UserPermissionService.getPermissions();

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
>('create/permission', async ({ permissionName, permissionDescription, callback }, thunkApi) => {
  try {
    const response = await UserPermissionService.createPermission({
      permissionDescription,
      permissionName,
    });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
