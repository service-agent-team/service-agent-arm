import { createSlice } from '@reduxjs/toolkit';
import {
  createTariff,
  disableTariff,
  editTariff,
  enableTariff,
  getTariff,
  getTariffById,
} from './actions';
import { ITariff, ITariffInitalState, PayloadTariffEnum } from './types';

const initialState: ITariffInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
  },
  tariff: null,
  oneTariff: null,
  errors: null,
};

export const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {
    setLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setTariff: (state, { payload }: { payload: ITariff[] }) => {
      state.tariff = payload;
    },

    setError: (state, { payload }) => {
      state.errors = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTariff.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
        state.tariff = null;
      })
      .addCase(getTariff.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.tariff = payload.data;
        state.errors = null;
      })
      .addCase(getTariff.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createTariff.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createTariff.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createTariff.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(getTariffById.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getTariffById.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.errors = null;
        state.oneTariff = payload.data;
      })
      .addCase(getTariffById.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(editTariff.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(editTariff.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(editTariff.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(disableTariff.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(disableTariff.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(disableTariff.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(enableTariff.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(enableTariff.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(enableTariff.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      });
  },
});

export const TariffReducer = tariffSlice.reducer;
export const TariffSliceActions = tariffSlice.actions;
