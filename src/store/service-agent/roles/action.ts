import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { RolesService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IRolesByIdPayload,
  IRolesByIdResponse,
  IRolesCreatePayload,
  IRolesDisablePayload,
  IRolesEditResponse,
  IRolesEditPayload,
  IRolesPayloadV2,
  IRolesResponseV2,
  IRolesCreateResponseV2,
  IRolesDeleteResponseV2,
} from './types';
import { EndPointesV2 } from '@/services/endpoints-v2';
import { AxiosResponse } from 'axios';

export const getRoles = createAsyncThunk<IRolesResponseV2, IRolesPayloadV2>(
  EndPointesV2.roles.getAll,
  async ({ callback, pageNumber, pageSize }, thunkApi) => {
    try {
      const response = await RolesService.getRoles(pageNumber, pageSize);

      if (response.data) {
        callback();
      }

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const createRoles = createAsyncThunk<
  AxiosResponse<IRolesCreateResponseV2>,
  IRolesCreatePayload
>(EndPointesV2.roles.create, async ({ name, description, callback }, thunkApi) => {
  try {
    const response = await RolesService.createRoles({ name, description });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getRolesById = createAsyncThunk<IRolesByIdResponse, IRolesByIdPayload>(
  EndPointesV2.roles.getOne + 'id',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await RolesService.getRoleById(id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const editRoles = createAsyncThunk<IRolesEditResponse, IRolesEditPayload>(
  'edit/roles',
  async ({ name, description, callback, id }, thunkApi) => {
    try {
      const response = await RolesService.editRoles({ name, description }, id);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteRoles = createAsyncThunk<
  AxiosResponse<IRolesDeleteResponseV2>,
  IRolesDisablePayload
>(EndPointesV2.roles.delete, async ({ callback, id }, thunkApi) => {
  try {
    const response = await RolesService.delete(id);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
