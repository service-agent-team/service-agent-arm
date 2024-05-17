import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripStatisticInitialState } from './types';
import { getAllLetsTripStatistics } from './actions';

const initialState: ILetsTripStatisticInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  statistics: null,
  errors: null,
};

export const letsTripStatisticSlice = createSlice({
  name: 'letsTripOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripStatistics.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripStatistics.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.statistics = payload;
        state.errors = null;
      })
      .addCase(getAllLetsTripStatistics.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const LetsTripStatisticReduce = letsTripStatisticSlice.reducer;
export const LetsTripStatisticSliceActions = letsTripStatisticSlice.actions;
