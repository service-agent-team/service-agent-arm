import { createSlice } from '@reduxjs/toolkit';
import { getAllProject } from './actions';
import { IProductInitialState } from './types';

const initialState: IProductInitialState = {
  loading: {
    get: false,
    post: false,
    delete: false,
    put: false,
  },
  projects: [],
  errors: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProject.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.projects = payload.data;
      })
      .addCase(getAllProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const ProjectReducer = projectSlice.reducer;
export const ProjectSliceActions = projectSlice.actions;
