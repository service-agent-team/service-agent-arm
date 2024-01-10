import { createSlice } from '@reduxjs/toolkit';
import { createTariff, getTariff } from './actions';
import { ITariff, ITariffInitalState, PayloadTariffEnum } from './types';

const initialState: ITariffInitalState = {
  loading: {
    get: false,
    post: false,
  },
  tariff: null,
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
      });
  },
});

export const TariffReducer = tariffSlice.reducer;
export const TariffSliceActions = tariffSlice.actions;
