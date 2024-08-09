import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import { deleteFacility, getAllFacility } from './actions';

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
