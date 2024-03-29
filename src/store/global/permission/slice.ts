import { createSlice } from '@reduxjs/toolkit';
import { createPermission, getPermisions } from './actions';
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermisions.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
        state.permissions = null;
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
      });
  },
});

export const PermissionReducer = permissionSlice.reducer;
export const PermissionSliceActions = permissionSlice.actions;
