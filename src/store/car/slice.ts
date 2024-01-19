import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../car-type/types';
import { createCar, createPrice, deleteCar, editCar, getCar, getCarById } from './actions';
import { ICarInitialState } from './types';

const initialState: ICarInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  car: null,
  errors: null,
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCar.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getCar.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.car = payload.data;
        state.errors = null;
      })
      .addCase(getCar.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createCar.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createCar.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createCar.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(editCar.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(editCar.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(editCar.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteCar.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteCar.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(getCarById.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getCarById.fulfilled, (state) => {
        state.loading.get = false;
        state.errors = null;
      })
      .addCase(getCarById.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createPrice.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createPrice.fulfilled, (state) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createPrice.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const CarReducer = carSlice.reducer;
export const CarSliceActions = carSlice.actions;
