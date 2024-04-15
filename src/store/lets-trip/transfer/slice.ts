import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTransferInitialState } from './types';
import { getAllLetsTripTransfer } from './actions';

const initialState: ILetsTripTransferInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  transfer: null,
  transfers: null,
  errors: null,
};

export const letsTripTransferSlice = createSlice({
  name: 'letsTripTransfer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripTransfer.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripTransfer.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.transfers = payload.content;
        state.errors = null;
      })
      .addCase(getAllLetsTripTransfer.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
    // .addCase(getAllCategory.pending, (state) => {
    //   state.loading.get = true;
    //   state.errors = null;
    // })
    // .addCase(getAllCategory.fulfilled, (state, { payload }) => {
    //   state.loading.get = false;
    //   state.categories = payload.data.content;
    //   state.errors = null;
    // })
    // .addCase(getAllCategory.rejected, (state, { payload }) => {
    //   state.loading.get = false;
    //   state.errors = payload;
    // })
    // .addCase(createLetsTripTour.pending, (state) => {
    //   state.loading.post = true;
    //   state.errors = null;
    // })
    // .addCase(createLetsTripTour.fulfilled, (state, { payload }) => {
    //   state.loading.post = false;
    //   state.tours?.push(payload);
    //   state.errors = null;
    // })
    // .addCase(createLetsTripTour.rejected, (state, { payload }) => {
    //   state.loading.post = false;
    //   state.errors = payload;
    // });
  },
});

export const LetsTripTransferReduce = letsTripTransferSlice.reducer;
export const LetsTripTransferSliceActions = letsTripTransferSlice.actions;
