import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../../car-type/types';
import {
  createAgentPermission,
  deleteAgentPermission,
  editAgentPermission,
  getAgentPermissionByID,
  getAgentPermissions,
} from './action';
import { IAgentPermissionInitalState, IPermission } from './types';

const initialState: IAgentPermissionInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  permission: null,
  permissions: null,
  errors: null,
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setTariffLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setPermission: (state, { payload }: { payload: IPermission[] }) => {
      state.permissions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgentPermissions.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAgentPermissions.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.permissions = payload.data;
        state.errors = null;
      })
      .addCase(getAgentPermissions.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createAgentPermission.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createAgentPermission.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createAgentPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(getAgentPermissionByID.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAgentPermissionByID.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.errors = null;
        state.permission = payload.data;
      })
      .addCase(getAgentPermissionByID.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(editAgentPermission.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(editAgentPermission.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(editAgentPermission.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteAgentPermission.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteAgentPermission.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteAgentPermission.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const AgentPermissionReducer = permissionSlice.reducer;
export const AgentPermissionSliceActions = permissionSlice.actions;
