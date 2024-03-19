import { createSlice } from '@reduxjs/toolkit';
import {
  createAgentUserRole,
  deleteAgentUserRole,
  getAllAgentUserRole,
  getOneAgentUserRole,
  updateAgentUserRole,
} from './action';
import { IAgentUserRolesInitialState } from './types';

const initialState: IAgentUserRolesInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  agentUserOneRole: null,
  agentUserRoles: null,
  errors: null,
};

export const agentUserRoleSlice = createSlice({
  name: 'agentUserRole',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentUserRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllAgentUserRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentUserRoles = payload.data;
        state.errors = null;
      })
      .addCase(getAllAgentUserRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneAgentUserRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneAgentUserRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentUserOneRole = payload.data;
        state.errors = null;
      })
      .addCase(getOneAgentUserRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createAgentUserRole.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createAgentUserRole.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.agentUserRoles?.push(payload.data);
        state.errors = null;
      })
      .addCase(createAgentUserRole.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateAgentUserRole.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(updateAgentUserRole.fulfilled, (state, _) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(updateAgentUserRole.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteAgentUserRole.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteAgentUserRole.fulfilled, (state, _) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteAgentUserRole.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const AgentUserRoleReducer = agentUserRoleSlice.reducer;
export const AgentUserRoleSliceActions = agentUserRoleSlice.actions;
