import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

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

export const tariffSlice = createSlice({
  name: 'tariffPermission',
  initialState,
  reducers: {
    setSatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(add.fulfilled, (state, { payload }) => {
        state.tariffs = payload.data;
        state.loading.get = false;
      })
      .addCase(add.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      });
  },
});

export const agentTariffReducer = tariffSlice.reducer;
export const agentTariffSliceActions = tariffSlice.actions;
