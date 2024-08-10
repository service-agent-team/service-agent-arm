import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createFacility,
  deleteFacility,
  editFacility,
  getAllFacility,
  getOneFacility,
} from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  facilities: null,
  facility: null,
  errors: null,
};

export const bookingFacilitySlice = createSlice({
  name: 'bookingFacility',
  initialState,
  reducers: {
    setBookingFacility: (state, { payload }) => {
      state.facilities = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFacility.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllFacility.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.facilities = payload.content;
        state.errors = null;
      })
      .addCase(getAllFacility.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneFacility.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneFacility.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.facility = payload;
        state.errors = null;
      })
      .addCase(getOneFacility.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createFacility.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createFacility.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.facilities?.push(payload.data);
        state.errors = null;
      })
      .addCase(createFacility.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(editFacility.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(editFacility.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const foundIndex = state.facilities?.findIndex((f) => f.id === payload.data.id);
        if (foundIndex && state.facilities) state.facilities[foundIndex] = payload.data;
        state.errors = null;
      })
      .addCase(editFacility.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteFacility.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteFacility.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteFacility.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingFacilityReduce = bookingFacilitySlice.reducer;
export const BookingFacilitySliceActions = bookingFacilitySlice.actions;
