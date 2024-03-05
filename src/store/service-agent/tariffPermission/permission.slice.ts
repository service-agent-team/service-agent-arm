import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import { addTariffPermission } from './permission.action';

const initialState: InitialState = {
  permission: null,
  permissions: null,
  status: 'success',
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null,
};

export const tariffPerSlice = createSlice({
  name: 'tariffPermission',
  initialState,
  reducers: {
    setSatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTariffPermission.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(addTariffPermission.fulfilled, (state, { payload }) => {
        state.permission = payload.data;
        state.loading.get = false;
      })
      .addCase(addTariffPermission.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      });
  },
});

export const AgentTariffPermissionReducer = tariffPerSlice.reducer;
export const AgentTariffPermissionSliceActions = tariffPerSlice.actions;
