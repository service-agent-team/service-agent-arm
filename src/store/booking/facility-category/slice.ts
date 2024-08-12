import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createFacilityCategory,
  deleteFacilityCategory,
  getAllFacilityCategory,
  getOneFacilityCategory,
  updateFacilityCategory,
} from './actions';

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
    setBookingFacilityCategory: (state, { payload }) => {
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
      })
      .addCase(getOneFacilityCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneFacilityCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.facilityCategory = payload;
        state.errors = null;
      })
      .addCase(getOneFacilityCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createFacilityCategory.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createFacilityCategory.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.facilityCategories) {
          state.facilityCategories.push(payload.data);
        }
        state.errors = null;
      })
      .addCase(createFacilityCategory.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateFacilityCategory.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updateFacilityCategory.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const foundIndex = state.facilityCategories?.findIndex((f) => f.id === payload.data.id);
        if (foundIndex && state.facilityCategories)
          state.facilityCategories[foundIndex] = payload.data;
        state.errors = null;
      })
      .addCase(updateFacilityCategory.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteFacilityCategory.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteFacilityCategory.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteFacilityCategory.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingFacilityCategoryReduce = bookingFacilityCategorySlice.reducer;
export const BookingFacilityCategorySliceActions = bookingFacilityCategorySlice.actions;
