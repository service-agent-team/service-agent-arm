import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripGlobalCountryInitialState } from './types';
import { createGlobalCountry, getAllGlobalCountry } from './actions';

const initialState: ILetsTripGlobalCountryInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  globalCountries: null,
  globalCountry: null,
  locations: [],
  errors: null,
};

export const letsTripGlobalCountrySlice = createSlice({
  name: 'letsTripGlobalCountry',
  initialState,
  reducers: {
    setGlobalCountry: (state, { payload }) => {
      state.globalCountries = payload;
    },
    setGlobalCountryLocations: (state, { payload }) => {
      state.locations = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGlobalCountry.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllGlobalCountry.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.globalCountries = payload.data.content;
        state.errors = null;
      })
      .addCase(getAllGlobalCountry.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createGlobalCountry.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createGlobalCountry.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.globalCountry = payload;
        state.errors = null;
      })
      .addCase(createGlobalCountry.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const LetsTripGlobalCountryReduce = letsTripGlobalCountrySlice.reducer;
export const LetsTripGlobalCountrySliceActions = letsTripGlobalCountrySlice.actions;
