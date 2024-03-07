import { createSlice } from '@reduxjs/toolkit';
import { createAgentRoles } from './actions';
import { IRolesInitalState } from './types';

const initialState: IRolesInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  oneUserRole: null,
  userRoles: null,
  errors: null,
};

export const agentRolesPermissionSlice = createSlice({
  name: 'agentRolesPermissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAgentRoles.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(createAgentRoles.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.userRoles = payload.data;
        state.errors = null;
      })
      .addCase(createAgentRoles.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const AgentRolesPermissionReducer = agentRolesPermissionSlice.reducer;
export const AgentRolesPermissionSliceActions = agentRolesPermissionSlice.actions;
