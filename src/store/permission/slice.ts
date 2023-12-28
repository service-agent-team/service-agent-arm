import { createSlice } from '@reduxjs/toolkit';
import { getPermisions } from './actions';
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

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, { payload }: { payload: PayloadEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setUsers: (state, { payload }) => {
      state.permissions = payload;
    },

    setError: (state, { payload }) => {
      state.errors = payload;
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
      });
  },
});

export const PermissionReducer = userSlice.reducer;
export const PermissionSliceActions = userSlice.actions;
