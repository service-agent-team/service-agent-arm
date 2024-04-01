import { createSlice } from '@reduxjs/toolkit';
import { createUserRole, deleteUserRole, getAllUserRole } from './actions';
import { IUserRoleInitialState } from './types';

const initialState: IUserRoleInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  userRoles: null,
  errors: null,
};

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setUserRoles: (state, { payload }) => {
      state.userRoles = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
        state.userRoles = null;
      })
      .addCase(getAllUserRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.userRoles = payload.data;
        state.errors = null;
      })
      .addCase(getAllUserRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createUserRole.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createUserRole.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.userRoles?.push(payload.data);
        state.errors = null;
      })
      .addCase(createUserRole.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteUserRole.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteUserRole.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteUserRole.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const UserRoleReducer = userRoleSlice.reducer;
export const UserRoleSliceActions = userRoleSlice.actions;
