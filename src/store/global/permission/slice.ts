import { createSlice } from '@reduxjs/toolkit';
import {
  createPermission,
  deletePermission,
  getOnePermision,
  getPermisions,
  updatePermission,
} from './actions';
import { IPermissionInitalState, PayloadEnum } from './types';

const initialState: IPermissionInitalState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  permissions: null,
  permission: null,
  errors: null,
};

export const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissionLoading: (state, { payload }: { payload: PayloadEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
    setPermissions: (state, { payload }) => {
      state.permissions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermisions.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getPermisions.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.permissions = payload.data;
        state.errors = null;
      })
      .addCase(getPermisions.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOnePermision.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOnePermision.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.permission = payload.data;
        state.errors = null;
      })
      .addCase(getOnePermision.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createPermission.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createPermission.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updatePermission.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updatePermission.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const index = state.permissions?.findIndex(
          (el) => Number(el.permission_id) === Number(payload.data.permission_id),
        );
        if (state.permissions && index) {
          state.permission = payload.data;
          state.permissions[index] = payload.data;
        }
        state.errors = null;
      })
      .addCase(updatePermission.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deletePermission.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deletePermission.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deletePermission.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const PermissionReducer = permissionSlice.reducer;
export const PermissionSliceActions = permissionSlice.actions;
