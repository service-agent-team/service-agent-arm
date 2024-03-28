import { createSlice } from '@reduxjs/toolkit';
import { createAgentProject, deleteAgentProject, getAllAgentProject } from './actions';
import { IAgentProjectInitialState } from './types';

const initialState: IAgentProjectInitialState = {
  loading: {
    get: false,
    post: false,
    delete: false,
    put: false,
  },
  agentProjects: null,
  errors: null,
};

export const agentProjectSlice = createSlice({
  name: 'agentProject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentProject.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllAgentProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentProjects = payload.data;
      })
      .addCase(getAllAgentProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createAgentProject.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(createAgentProject.fulfilled, (state) => {
        state.loading.post = false;
      })
      .addCase(createAgentProject.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteAgentProject.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteAgentProject.fulfilled, (state) => {
        state.loading.delete = false;
      })
      .addCase(deleteAgentProject.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const AgentProjectReducer = agentProjectSlice.reducer;
export const AgentProjectSliceActions = agentProjectSlice.actions;
