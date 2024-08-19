import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripGroupTourInitialState } from './types';
import {
  addExtraInfoLetsTripGroupTour,
  addExtraInfoLetsTripGroupTourAll,
  addImageLetsTripGroupTour,
  addItenararyLetsTripGroupTour,
  addLocationLetsTripGroupTour,
  addNewDateLetsTripGroupTour,
  createLetsTripGroupTour,
  deleteImageLetsTripGroupTour,
  deleteLetsTripGroupTour,
  getByCountryIdLetsTripGroupTour,
  getOneLetsTripTour,
  getOneRawLetsTripTour,
  otherUpdatesLetsTripGroupTour,
  priceUpdateLetsTripGroupTour,
  removeDateLetsTripGroupTour,
  removeExtraInfoLetsTripGroupTour,
  removeItenararyLetsTripGroupTour,
  removeLocationLetsTripGroupTour,
  searchLetsTripGroupTour,
  updateByObjectLetsTripGroupTour,
  updateItenarary,
  updatePriceIncludesGroupTour,
  updatePriceNoteTripGroupTour,
} from './actions';

const initialState: ILetsTripGroupTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  groupTour: null,
  groupTourRaw: null,
  activeTours: null,
  byCountryIdTours: null,
  searchGroupTours: [],
  locations: [],
  errors: null,
  deleted: true,
  itenararyItem: null,
};

export const letsTripGroupTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {
    setLetsTripGroupTourByCountryId: (state, { payload }) => {
      state.byCountryIdTours = payload;
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
      state.groupTourRaw = payload;
    },
    setItenararyItem: (state, { payload }) => {
      state.itenararyItem = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchLetsTripGroupTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(searchLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.searchGroupTours = payload.content;
        state.errors = null;
      })
      .addCase(searchLetsTripGroupTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getByCountryIdLetsTripGroupTour.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getByCountryIdLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.byCountryIdTours = payload.content;
        state.errors = null;
      })
      .addCase(getByCountryIdLetsTripGroupTour.rejected, (state, { payload }) => {
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
        //@ts-ignore
        state.locations = payload.locations;
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
      .addCase(updatePriceIncludesGroupTour.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(updatePriceIncludesGroupTour.fulfilled, (state) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(updatePriceIncludesGroupTour.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateItenarary.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(updateItenarary.fulfilled, (state, { payload }) => {
        state.groupTourRaw = payload;
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(updateItenarary.rejected, (state, { payload }) => {
        state.loading.patch = false;
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
        state.byCountryIdTours?.push(payload);
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
      .addCase(priceUpdateLetsTripGroupTour.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(priceUpdateLetsTripGroupTour.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(priceUpdateLetsTripGroupTour.rejected, (state, { payload }) => {
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
      .addCase(addExtraInfoLetsTripGroupTourAll.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(addExtraInfoLetsTripGroupTourAll.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.groupTourRaw = payload;
        state.errors = null;
      })
      .addCase(addExtraInfoLetsTripGroupTourAll.rejected, (state, { payload }) => {
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
