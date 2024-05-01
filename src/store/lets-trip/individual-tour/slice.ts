import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripIndividualTourInitialState } from './types';
import { createLetsTripIndividualTour, getAllLetsTripIndividualTour } from './actions';

const initialState: ILetsTripIndividualTourInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  individualTour: null,
  individualTours: null,
  errors: null,
};

export const letsTripIndividualTourSlice = createSlice({
  name: 'letsTripTour',
  initialState,
  reducers: {
    setLetsTripIndividualTour: (state, { payload }) => {
      state.individualTours = payload;
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
        state.errors = null;
      })
      .addCase(getAllLetsTripIndividualTour.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      // .addCase(getOneLetsTripTour.pending, (state) => {
      //   state.loading.get = true;
      //   state.errors = null;
      // })
      // .addCase(getOneLetsTripTour.fulfilled, (state, { payload }) => {
      //   state.loading.get = false;
      //   state.groupTour = payload;
      //   state.errors = null;
      // })
      // .addCase(getOneLetsTripTour.rejected, (state, { payload }) => {
      //   state.loading.get = false;
      //   state.errors = payload;
      // })
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
      });
    // .addCase(deleteLetsTripGroupTour.pending, (state) => {
    //   state.loading.delete = true;
    //   state.errors = null;
    // })
    // .addCase(deleteLetsTripGroupTour.fulfilled, (state) => {
    //   state.loading.delete = false;
    //   state.errors = null;
    // })
    // .addCase(deleteLetsTripGroupTour.rejected, (state, { payload }) => {
    //   state.loading.delete = false;
    //   state.errors = payload;
    // });
  },
});

export const LetsTripIndividualTourReduce = letsTripIndividualTourSlice.reducer;
export const LetsTripIndividualTourSliceActions = letsTripIndividualTourSlice.actions;
