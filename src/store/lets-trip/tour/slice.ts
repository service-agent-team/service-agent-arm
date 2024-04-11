import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTourInitialState } from './types';
import { createLetsTripTour, getAllCategory, getAllLetsTripTour } from './actions';

const initialState: ILetsTripTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  tours: null,
  tour: null,
  categories: null,
  errors: null,
};

export const letsTripTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.tours = payload.content;
        state.errors = null;
      })
      .addCase(getAllLetsTripTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.categories = payload.data.content;
        state.errors = null;
      })
      .addCase(getAllCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripTour.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.tours?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTourReduce = letsTripTourSlice.reducer;
export const LetsTripTourSliceActions = letsTripTourSlice.actions;
