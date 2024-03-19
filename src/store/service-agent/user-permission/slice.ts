import { createSlice } from '@reduxjs/toolkit';
import {
  createAgentUserPermission,
  deleteAgentUserPermission,
  getAllAgentUserPermission,
} from './action';
import { IAgentUserPermissionInitialState } from './types';

const initialState: IAgentUserPermissionInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  agentUserPermissions: null,
  errors: null,
};

export const agentUserPermissionSlice = createSlice({
  name: 'agentUserPermission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentUserPermission.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllAgentUserPermission.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agentUserPermissions = payload.data;
        state.errors = null;
      })
      .addCase(getAllAgentUserPermission.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createAgentUserPermission.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createAgentUserPermission.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.agentUserPermissions?.push(payload.data);
        state.errors = null;
      })
      .addCase(createAgentUserPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteAgentUserPermission.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteAgentUserPermission.fulfilled, (state, _) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteAgentUserPermission.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const AgentUserPermissionReducer = agentUserPermissionSlice.reducer;
export const AgentUserPermissionSliceActions = agentUserPermissionSlice.actions;
