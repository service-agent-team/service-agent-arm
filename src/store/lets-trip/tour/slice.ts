import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripGroupTourInitialState } from './types';
import {
  createLetsTripGroupTour,
  deleteLetsTripGroupTour,
  getAllLetsTripGroupTour,
  getOneLetsTripTour,
} from './actions';

const initialState: ILetsTripGroupTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  groupTours: null,
  groupTour: null,
  errors: null,
};

export const letsTripTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {
    setLetsTripGroupTour: (state, { payload }) => {
      state.groupTours = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripGroupTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.groupTours = payload.content;
        state.errors = null;
      })
      .addCase(getAllLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneLetsTripTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneLetsTripTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.groupTour = payload;
        state.errors = null;
      })
      .addCase(getOneLetsTripTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.groupTours?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteLetsTripGroupTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteLetsTripGroupTour.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTourReduce = letsTripTourSlice.reducer;
export const LetsTripTourSliceActions = letsTripTourSlice.actions;
