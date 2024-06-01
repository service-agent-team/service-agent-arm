import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTransferInitialState } from './types';
import {
  createLetsTripTransfer,
  deleteLetsTripTransfer,
  getAllLetsTripTransfer,
  getOneLetsTripTransfer,
  updateLetsTripTransfer,
} from './actions';

const initialState: ILetsTripTransferInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  transfers: null,
  activeTransfers: null,
  transfer: null,
  deleted: true,
  errors: null,
};

export const letsTripTransferSlice = createSlice({
  name: 'letsTripTransfer',
  initialState,
  reducers: {
    setLetsTripTransfers: (state, { payload }) => {
      state.transfers = payload;
    },
    setLetsTripTransferStatus: (state, { payload }) => {
      state.deleted = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripTransfer.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripTransfer.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.transfers = payload.content;
        state.activeTransfers = payload.content.filter((t) => t.deleted === false);
        state.errors = null;
      })
      .addCase(getAllLetsTripTransfer.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneLetsTripTransfer.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneLetsTripTransfer.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.transfer = payload;
        state.errors = null;
      })
      .addCase(getOneLetsTripTransfer.rejected, (state, { payload }) => {
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
      })
      .addCase(updateLetsTripTransfer.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(updateLetsTripTransfer.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.transfer = payload;
        state.errors = null;
      })
      .addCase(updateLetsTripTransfer.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteLetsTripTransfer.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteLetsTripTransfer.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteLetsTripTransfer.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTransferReduce = letsTripTransferSlice.reducer;
export const LetsTripTransferSliceActions = letsTripTransferSlice.actions;
