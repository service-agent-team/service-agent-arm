import { createSlice } from '@reduxjs/toolkit';
import { createAgentUserRole, getAllAgentUserRole } from './action';
import { IAgentUserRolesInitialState } from './types';

const initialState: IAgentUserRolesInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  agentUserRoles: null,
  // oneRole: null,
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
      .addCase(createAgentUserRole.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createAgentUserRole.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createAgentUserRole.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const AgentUserRoleReducer = agentUserRoleSlice.reducer;
export const AgentUserRoleSliceActions = agentUserRoleSlice.actions;
