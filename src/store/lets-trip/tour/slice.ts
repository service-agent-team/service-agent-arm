import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTour, ILetsTripTourInitialState } from './types';
import { getAllLetsTripTour } from './actions';

const initialState: ILetsTripTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  tours: null,
  tour: null,
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
        state.tours = payload.content as ILetsTripTour[];
        state.errors = null;
      })
      .addCase(getAllLetsTripTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTourReduce = letsTripTourSlice.reducer;
export const LetsTripTourSliceActions = letsTripTourSlice.actions;
