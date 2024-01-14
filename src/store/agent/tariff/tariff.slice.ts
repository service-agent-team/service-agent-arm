import { createSlice } from '@reduxjs/toolkit';
import { getCategory } from './tariff.action';
import { InitialState } from './types';

const initialState: InitialState = {
  tariff: null,
  tariffs: null,
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
  name: 'tariff',
  initialState,
  reducers: {
    setSatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.tariffs = payload.data;
        state.loading.get = false;
      })
      .addCase(getCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      });
  },
});

export const agentTariffReducer = tariffSlice.reducer;
export const agentTariffSliceActions = tariffSlice.actions;
