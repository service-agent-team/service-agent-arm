import { createSlice } from '@reduxjs/toolkit';
import { ICarInitialState } from './types';
import {
  createProcessProject,
  deleteProcessProject,
  getAllProcessProject,
  getOneProcessProject,
  updateProcessProject,
} from './actions';

const initialState: ICarInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  project: null,
  projects: null,
  errors: null,
};

export const slice = createSlice({
  name: 'processProject',
  initialState,
  reducers: {
    setProcessProjects: (state, { payload }) => {
      state.projects = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProcessProject.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllProcessProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.projects = payload;
        state.errors = null;
      })
      .addCase(getAllProcessProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneProcessProject.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneProcessProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.project = payload;
        state.errors = null;
      })
      .addCase(getOneProcessProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createProcessProject.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createProcessProject.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.projects?.push(payload);
        state.errors = null;
      })
      .addCase(createProcessProject.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateProcessProject.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(updateProcessProject.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.project = payload;
        state.errors = null;
      })
      .addCase(updateProcessProject.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteProcessProject.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteProcessProject.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteProcessProject.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const ProcessProjectReducer = slice.reducer;
export const ProcessProjectSliceActions = slice.actions;
