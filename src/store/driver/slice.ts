import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../car-type/types';
import { createDriver, editDriver, getDriver } from './actions';
import { IDriverinitialState } from './types';

const initialState: IDriverinitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
  },
  driver: null,
  errors: null,
};

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriverLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriver.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getDriver.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.driver = payload.data;
        state.errors = null;
      })
      .addCase(getDriver.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createDriver.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createDriver.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createDriver.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(editDriver.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(editDriver.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(editDriver.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      });
  },
});

export const DriverReducer = driverSlice.reducer;
export const DriverSliceActions = driverSlice.actions;
