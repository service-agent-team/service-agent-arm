import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripGlobalRegionInitialState } from './types';
import { createGlobalRegion, getByCountryIdRegion } from './actions';

const initialState: ILetsTripGlobalRegionInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  globalRegions: null,
  globalRegion: null,
  locations: [],
  errors: null,
};

export const letsTripGlobalRegionSlice = createSlice({
  name: 'letsTripGlobalRegion',
  initialState,
  reducers: {
    setGlobalRegion: (state, { payload }) => {
      state.globalRegions = payload;
    },
    setGlobalRegionLocations: (state, { payload }) => {
      state.locations = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getByCountryIdRegion.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getByCountryIdRegion.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.globalRegions = payload.data.content;
        state.errors = null;
      })
      .addCase(getByCountryIdRegion.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createGlobalRegion.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createGlobalRegion.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.globalRegions?.push(payload);
        state.errors = null;
      })
      .addCase(createGlobalRegion.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const LetsTripGlobalRegionReduce = letsTripGlobalRegionSlice.reducer;
export const LetsTripGlobalRegionSliceActions = letsTripGlobalRegionSlice.actions;
