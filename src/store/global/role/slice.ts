import { createSlice } from '@reduxjs/toolkit';
import { createRole, deleteRole, getAllRole, getOneRole, updateRole } from './actions';
import { IRoleInitialState } from './types';

const initialState: IRoleInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  roles: null,
  role: null,
  errors: null,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, { payload }) => {
      state.roles = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.roles = payload.data;
        state.errors = null;
      })
      .addCase(getAllRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.role = payload.data;
        state.errors = null;
      })
      .addCase(getOneRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createRole.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createRole.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.roles) state.roles.push(payload.data);
        state.errors = null;
      })
      .addCase(createRole.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const index = state.roles?.findIndex((el) => el.role_id === Number(payload.data.role_id));
        if (state.roles && index) state.roles[index] = payload.data;
        state.errors = null;
      })
      .addCase(updateRole.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteRole.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const RoleReducer = roleSlice.reducer;
export const RoleSliceActions = roleSlice.actions;
