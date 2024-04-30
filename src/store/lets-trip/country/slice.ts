import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripCountryInitialState } from './types';
import { getAllLetsTripCountry } from './actions';

const initialState: ILetsTripCountryInitialState = {
  loading: {
    get: false,
    post: false,
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
      });
  },
});

export const LetsTripCountryReduce = letsTripCountrySlice.reducer;
export const LetsTripCountrySliceActions = letsTripCountrySlice.actions;
