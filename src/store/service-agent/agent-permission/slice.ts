import { createSlice } from '@reduxjs/toolkit';
import {
  agentAddPermissionToUserProject,
  agentAddProjectToUser,
  agentAddRole,
  agentAddRolePermission,
  agentRemovePermissionProject,
  agentRemoveProject,
  agentRemoveRole,
  agentRemoveRolePermission,
  updateAgentProjectPermission,
  updateAgentRolePermission,
  updateAgentTariffPermission,
} from './action';
import { InitialState } from './interface';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null,
};

export const agentPermissions = createSlice({
  name: 'agentPermissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent role permissions
      .addCase(updateAgentRolePermission.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(updateAgentRolePermission.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(updateAgentRolePermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      .addCase(agentAddRole.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(agentAddRole.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(agentAddRole.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      .addCase(agentAddRolePermission.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(agentAddRolePermission.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(agentAddRolePermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      // delete the role
      .addCase(agentRemoveRole.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(agentRemoveRole.fulfilled, (state) => {
        state.loading.delete = false;
        state.error = null;
      })
      .addCase(agentRemoveRole.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.error = payload;
      })
      .addCase(agentRemoveRolePermission.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(agentRemoveRolePermission.fulfilled, (state) => {
        state.loading.delete = false;
        state.error = null;
      })
      .addCase(agentRemoveRolePermission.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.error = payload;
      })
      // agent project permission
      .addCase(updateAgentProjectPermission.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(updateAgentProjectPermission.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(updateAgentProjectPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      .addCase(agentAddProjectToUser.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(agentAddProjectToUser.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(agentAddProjectToUser.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      .addCase(agentAddPermissionToUserProject.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(agentAddPermissionToUserProject.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(agentAddPermissionToUserProject.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      })
      // delete the project
      .addCase(agentRemoveProject.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(agentRemoveProject.fulfilled, (state) => {
        state.loading.delete = false;
        state.error = null;
      })
      .addCase(agentRemoveProject.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.error = payload;
      })
      .addCase(agentRemovePermissionProject.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(agentRemovePermissionProject.fulfilled, (state) => {
        state.loading.delete = false;
        state.error = null;
      })
      .addCase(agentRemovePermissionProject.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.error = payload;
      })
      // tariff permission
      .addCase(updateAgentTariffPermission.pending, (state) => {
        state.loading.post = true;
        state.error = null;
      })
      .addCase(updateAgentTariffPermission.fulfilled, (state) => {
        state.loading.post = false;
        state.error = null;
      })
      .addCase(updateAgentTariffPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.error = payload;
      });
  },
});

export const AgentPermissionsReducer = agentPermissions.reducer;
export const AgentPermissionsActions = agentPermissions.actions;
