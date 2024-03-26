import { createSlice } from '@reduxjs/toolkit';
import { getAllAgentProject } from './actions';
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
      });
  },
});

export const AgentProjectReducer = agentProjectSlice.reducer;
export const AgentProjectSliceActions = agentProjectSlice.actions;
