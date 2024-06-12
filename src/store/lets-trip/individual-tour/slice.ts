import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripIndividualTourInitialState } from './types';
import {
  addItenararyLetsTripIndividualTour,
  addPriceLetsTripIndividualTour,
  createLetsTripIndividualTour,
  deleteLetsTripIndividualTour,
  geOneLetsTripIndividualTour,
  geOneRawLetsTripIndividualTour,
  getAllLetsTripIndividualTour,
  getByCountryLetsTripIndividualTour,
  otherUpdatesLetsTripIndividualTour,
  removeItenararyLetsTripIndividualTour,
  removePriceLetsTripIndividualTour,
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
  individualTourRaw: null,
  activeIndividualTours: null,
  byCountryIndividualTours: null,
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
      .addCase(getByCountryLetsTripIndividualTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getByCountryLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.byCountryIndividualTours = payload.content;
        state.errors = null;
      })
      .addCase(getByCountryLetsTripIndividualTour.rejected, (state, { payload }) => {
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
      .addCase(geOneRawLetsTripIndividualTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(geOneRawLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(geOneRawLetsTripIndividualTour.rejected, (state, { payload }) => {
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
      .addCase(addPriceLetsTripIndividualTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(addPriceLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(addPriceLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(removePriceLetsTripIndividualTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(removePriceLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(removePriceLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(addItenararyLetsTripIndividualTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(addItenararyLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(addItenararyLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(removeItenararyLetsTripIndividualTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(removeItenararyLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(removeItenararyLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(otherUpdatesLetsTripIndividualTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(otherUpdatesLetsTripIndividualTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.individualTourRaw = payload;
        state.errors = null;
      })
      .addCase(otherUpdatesLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
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
