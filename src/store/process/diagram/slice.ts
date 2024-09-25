import { createSlice } from '@reduxjs/toolkit';
import { ICarInitialState } from './types';
import { createProcessProject } from './actions';

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
      .addCase(createProcessProject.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(createProcessProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.project = payload;
        state.errors = null;
      })
      .addCase(createProcessProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const ProcessProjectReducer = slice.reducer;
export const ProcessProjectSliceActions = slice.actions;
