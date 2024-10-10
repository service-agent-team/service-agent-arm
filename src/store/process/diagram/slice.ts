import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createProcess,
  deleteProcess,
  getAllProcess,
  getOneProcess,
  updateProcess,
} from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  process: null,
  processes: null,
  errors: null,
};

export const slice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    setProcesses: (state, { payload }) => {
      state.processes = payload;
    },
    setProcess: (state, { payload }) => {
      state.process = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProcess.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllProcess.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.processes = payload;
        state.errors = null;
      })
      .addCase(getAllProcess.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneProcess.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneProcess.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.process = payload;
        state.errors = null;
      })
      .addCase(getOneProcess.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createProcess.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createProcess.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.process = payload;
        state.errors = null;
      })
      .addCase(createProcess.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateProcess.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(updateProcess.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.process = payload;
        state.errors = null;
      })
      .addCase(updateProcess.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteProcess.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteProcess.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteProcess.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const ProcessReducer = slice.reducer;
export const ProcessSliceActions = slice.actions;
