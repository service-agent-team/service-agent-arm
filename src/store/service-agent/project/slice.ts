import { createSlice } from '@reduxjs/toolkit';
import {
  createAgentProjectByAgent,
  deleteAgentProject,
  editAgentProjectByAgent,
  getAllAgentProject,
  getOneAgentProject,
} from './actions';
import { IAgentProjectInitialState, IAgentProjectV2 } from './types';

const initialState: IAgentProjectInitialState = {
  loading: {
    get: false,
    post: false,
    delete: false,
    put: false,
  },
  agentProjects: null,
  agentProject: null,
  errors: null,
};

export const agentProjectSlice = createSlice({
  name: 'agentProject',
  initialState,
  reducers: {
    setAgentProject: (state, { payload }: { payload: IAgentProjectV2[] }) => {
      state.agentProjects = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentProject.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllAgentProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentProjects = payload.data.content;
      })
      .addCase(getAllAgentProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneAgentProject.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getOneAgentProject.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentProject = payload.data;
      })
      .addCase(getOneAgentProject.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createAgentProjectByAgent.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(createAgentProjectByAgent.fulfilled, (state, { payload }) => {
        state.agentProjects?.push(payload.data);
        state.loading.post = false;
      })
      .addCase(createAgentProjectByAgent.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(editAgentProjectByAgent.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(editAgentProjectByAgent.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        const { data } = payload;
        const findIndex = state.agentProjects?.findIndex((el) => el.projectId === data.projectId);
        if (findIndex && state.agentProjects) {
          state.agentProjects[findIndex] = data;
        }
      })
      .addCase(editAgentProjectByAgent.rejected, (state, { payload }) => {
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
