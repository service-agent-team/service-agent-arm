import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripCountryInitialState } from './types';
import { createLetsTripCountry, deleteLetsTripCountry, getAllLetsTripCountry } from './actions';

const initialState: ILetsTripCountryInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  countries: null,
  country: null,
  errors: null,
};

export const letsTripCountrySlice = createSlice({
  name: 'letsTripCountry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripCountry.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripCountry.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.countries = payload.data;
        state.errors = null;
      })
      .addCase(getAllLetsTripCountry.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripCountry.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripCountry.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.countries?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripCountry.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteLetsTripCountry.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteLetsTripCountry.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteLetsTripCountry.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const LetsTripCountryReduce = letsTripCountrySlice.reducer;
export const LetsTripCountrySliceActions = letsTripCountrySlice.actions;
