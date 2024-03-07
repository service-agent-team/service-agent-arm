import { createSlice } from '@reduxjs/toolkit';
import { GetAllCarModel, SetImage } from './action';
import { ICarModelInitalState } from './types';

const initialState: ICarModelInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  image: null,
  carModels: null,
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
        state.carModels = payload.content;
        state.errors = null;
      })
      .addCase(GetAllCarModel.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(SetImage.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(SetImage.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.image = payload;
      })
      .addCase(SetImage.rejected, (state) => {
        state.loading.post = false;
      });
  },
});

export const CarModelReducer = carModelSlice.reducer;
export const CarModelsliceActions = carModelSlice.actions;
