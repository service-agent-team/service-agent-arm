import { createSlice } from '@reduxjs/toolkit';
import { createCarType, deletCarType, ediCarType, getCarType } from './actions';
import { ICarTypeInitalState, PayloadTariffEnum } from './types';

const initialState: ICarTypeInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  carType: null,
  errors: null,
};

export const carTypeSlice = createSlice({
  name: 'cartype',
  initialState,
  reducers: {
    setCarTypeLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarType.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getCarType.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.carType = payload.data;
        state.errors = null;
      })
      .addCase(getCarType.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createCarType.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createCarType.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createCarType.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(ediCarType.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(ediCarType.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(ediCarType.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deletCarType.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(deletCarType.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(deletCarType.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      });
  },
});

export const CarTypeReducer = carTypeSlice.reducer;
export const CarTypesliceActions = carTypeSlice.actions;
