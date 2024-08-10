import { EndPointes } from '@/services/endpoints';
import { createSlice } from '@reduxjs/toolkit';
import { findBreakfasts } from './action';
import { InitialSate } from './type';

const initialState: InitialSate = {
  loading: { get: false, post: false, put: false, delete: false },
  breakfasts: [],
  breakfast: null,
};

export const breakfastSlice = createSlice({
  name: EndPointes.booking.breakfast,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findBreakfasts.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(findBreakfasts.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.breakfasts = payload.data;
      })
      .addCase(findBreakfasts.rejected, (state) => {
        state.loading.get = false;
      });
  },
});

export const breakfastReducer = breakfastSlice.reducer;
export const breakfastSliceActions = breakfastSlice.actions;
