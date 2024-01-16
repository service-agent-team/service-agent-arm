import { createSlice } from '@reduxjs/toolkit';
import { GetAllCarModel } from './action';
import { ICarModelInitalState } from './types';

const initialState: ICarModelInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  carModel: null,
  errors: null,
};

export const carModelSlice = createSlice({
  name: 'carmodel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCarModel.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(GetAllCarModel.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.carModel = payload.data;
        state.errors = null;
      })
      .addCase(GetAllCarModel.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const CarModelReducer = carModelSlice.reducer;
export const CarModelsliceActions = carModelSlice.actions;
