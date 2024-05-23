import { createSlice } from '@reduxjs/toolkit';
import {
  acceptAgnet,
  agentAddPermissionToUserProject,
  agentAddProjectToUser,
  agentAddRole,
  agentAddRolePermission,
  agentRemovePermissionProject,
  agentRemoveProject,
  agentRemoveRole,
  agentRemoveRolePermission,
  getAllUsers,
  getOneAgent,
  rejectAgnet,
} from './contract.action';
import { IAgentUserStatusType, InitialState } from './contract.interface';

const initialState: InitialState = {
  data: null,
  agent: null,
  status: IAgentUserStatusType.SUCCESS,
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  pagination: {
    page: 0,
    size: 10,
    total: 10,
  },
  error: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContractStatus: (state, { payload }) => {
      state.status = payload;
    },
    setContractPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setOneAgent: (state, { payload }) => {
      state.agent = payload;
    },
    setAgentRolePermissions: (state, { payload }) => {
      if (state.agent) state.agent.userRolePermissions = payload;
    },
    setAgentProjectPermissions: (state, { payload }) => {
      if (state.agent) state.agent.userProjectPermissions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.pagination = payload.pagination;
        state.loading.get = false;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      })
      .addCase(acceptAgnet.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(acceptAgnet.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(acceptAgnet.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      .addCase(rejectAgnet.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(rejectAgnet.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(rejectAgnet.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      // agent get one
      .addCase(getOneAgent.pending, (state) => {
        state.loading.get = true;
        state.error = null;
      })
      .addCase(getOneAgent.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agent = payload;
        state.error = null;
      })
      .addCase(getOneAgent.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.error = payload;
      })
      // agent role permissions
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
      });
  },
});

export const AgentContractReducer = contractSlice.reducer;
export const ContractSliceActions = contractSlice.actions;
