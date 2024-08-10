import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import { getAllFacilityCategory } from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  facilityCategories: null,
  facilityCategory: null,
  errors: null,
};

export const bookingFacilityCategorySlice = createSlice({
  name: 'bookingFacilityCategory',
  initialState,
  reducers: {
    setFacilityCategory: (state, { payload }) => {
      state.facilityCategories = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFacilityCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllFacilityCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.facilityCategories = payload.content;
        state.errors = null;
      })
      .addCase(getAllFacilityCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const BookingFacilityCategoryReduce = bookingFacilityCategorySlice.reducer;
export const BookingFacilityCategorySliceActions = bookingFacilityCategorySlice.actions;
