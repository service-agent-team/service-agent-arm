import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripGroupTourInitialState } from './types';
import {
  addExtraInfoLetsTripGroupTour,
  addImageLetsTripGroupTour,
  addItenararyLetsTripGroupTour,
  addLocationLetsTripGroupTour,
  addNewDateLetsTripGroupTour,
  createLetsTripGroupTour,
  deleteImageLetsTripGroupTour,
  deleteLetsTripGroupTour,
  getAllLetsTripGroupTour,
  getOneLetsTripTour,
  getOneRawLetsTripTour,
  otherUpdatesLetsTripGroupTour,
  removeDateLetsTripGroupTour,
  removeExtraInfoLetsTripGroupTour,
  removeItenararyLetsTripGroupTour,
  removeLocationLetsTripGroupTour,
  updateByObjectLetsTripGroupTour,
  updatePriceNoteTripGroupTour,
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
  groupTourRaw: null,
  activeTours: null,
  locations: [],
  errors: null,
  deleted: true,
};

export const letsTripGroupTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {
    setLetsTripGroupTour: (state, { payload }) => {
      state.groupTours = payload;
    },
    setLetsTripActiveGroupTour: (state, { payload }) => {
      state.activeTours = payload;
    },
    setLetsTripGroupTourStatus: (state, { payload }) => {
      state.deleted = payload;
    },
    setLetsTripGroupTourLocations: (state, { payload }) => {
      state.locations = payload;
    },
    setLetsTripGroupTourRaw: (state, { payload }) => {
      state.locations = payload;
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
        state.activeTours = payload.content?.filter((el) => el?.deleted === false);
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
      .addCase(getOneRawLetsTripTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneRawLetsTripTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(getOneRawLetsTripTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(updateByObjectLetsTripGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(updateByObjectLetsTripGroupTour.fulfilled, (state) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(updateByObjectLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updatePriceNoteTripGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(updatePriceNoteTripGroupTour.fulfilled, (state) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(updatePriceNoteTripGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(addNewDateLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(addNewDateLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addNewDateLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(removeDateLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(removeDateLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(removeDateLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(addLocationLetsTripGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(addLocationLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addLocationLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(removeLocationLetsTripGroupTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(removeLocationLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(removeLocationLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(addImageLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(addImageLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addImageLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteImageLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(deleteImageLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(deleteImageLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
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
      .addCase(otherUpdatesLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(otherUpdatesLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(otherUpdatesLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(addExtraInfoLetsTripGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(addExtraInfoLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addExtraInfoLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(removeExtraInfoLetsTripGroupTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(removeExtraInfoLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(removeExtraInfoLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(addItenararyLetsTripGroupTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(addItenararyLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addItenararyLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      })
      .addCase(removeItenararyLetsTripGroupTour.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(removeItenararyLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.delete = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(removeItenararyLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.delete = false;
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

export const LetsTripGroupTourReduce = letsTripGroupTourSlice.reducer;
export const LetsTripGroupTourSliceActions = letsTripGroupTourSlice.actions;
