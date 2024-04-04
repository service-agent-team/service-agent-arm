import { createSlice } from '@reduxjs/toolkit';
import {
  createProject,
  deleteProject,
  getAllProject,
  getOneProject,
  updateProject,
} from './actions';
import { IProductInitialState } from './types';

const initialState: IProductInitialState = {
  loading: {
    get: false,
    post: false,
    delete: false,
    put: false,
  },
  projects: null,
  project: null,
  errors: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects(state, { payload }) {
      state.projects = payload;
    },
  },
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
      })
      .addCase(getOneProject.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getOneProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.project = payload.data;
      })
      .addCase(getOneProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.projects?.push(payload.data);
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading.put = true;
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const index = state.projects?.findIndex(
          (el) => Number(el.project_id) === Number(payload.data.project_id),
        );
        if (state.projects && index) state.projects[index] = payload.data;
      })
      .addCase(updateProject.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteProject.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const ProjectReducer = projectSlice.reducer;
export const ProjectSliceActions = projectSlice.actions;
