import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripIndividualTourInitialState } from './types';
import {
  createLetsTripIndividualTour,
  deleteLetsTripIndividualTour,
  geOneLetsTripIndividualTour,
  getAllLetsTripIndividualTour,
} from './actions';

const initialState: ILetsTripIndividualTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  individualTour: null,
  individualTours: null,
  activeIndividualTours: null,
  deleted: true,
  errors: null,
};

export const letsTripIndividualTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {
    setLetsTripIndividualTour: (state, { payload }) => {
      state.individualTours = payload;
    },
    setLetsTripActiveIndividualTour: (state, { payload }) => {
      state.activeIndividualTours = payload;
    },
    setLetsTripIndividualTourStatus: (state, { payload }) => {
      state.deleted = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripIndividualTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.individualTours = payload.content;
        state.activeIndividualTours = payload.content?.filter((el) => el?.deleted === false);
        state.errors = null;
      })
      .addCase(getAllLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(geOneLetsTripIndividualTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(geOneLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.individualTour = payload;
        state.errors = null;
      })
      .addCase(geOneLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripIndividualTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.individualTours?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteLetsTripIndividualTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteLetsTripIndividualTour.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const LetsTripIndividualTourReduce = letsTripIndividualTourSlice.reducer;
export const LetsTripIndividualTourSliceActions = letsTripIndividualTourSlice.actions;
