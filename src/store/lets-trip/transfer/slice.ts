import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTransferInitialState } from './types';
import { createLetsTripTransfer, getAllLetsTripTransfer } from './actions';

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
      })
      .addCase(createLetsTripTransfer.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripTransfer.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.transfers?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripTransfer.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTransferReduce = letsTripTransferSlice.reducer;
export const LetsTripTransferSliceActions = letsTripTransferSlice.actions;
