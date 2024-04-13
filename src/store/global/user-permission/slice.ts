import { createSlice } from '@reduxjs/toolkit';
import {
  createUserPermission,
  deleteUserPermission,
  getAllUserPermission,
  getOneUserPermission,
  updateUserPermission,
} from './actions';
import { IUserPermissionInitialState } from './types';

const initialState: IUserPermissionInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  userPermissions: null,
  userPermission: null,
  errors: null,
};

export const userPermissionSlice = createSlice({
  name: 'userPermission',
  initialState,
  reducers: {
    setUserPermission: (state, { payload }) => {
      state.userPermissions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserPermission.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllUserPermission.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.userPermissions = payload.data;
        state.errors = null;
      })
      .addCase(getAllUserPermission.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneUserPermission.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneUserPermission.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.userPermission = payload.data;
        state.errors = null;
      })
      .addCase(getOneUserPermission.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createUserPermission.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createUserPermission.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.userPermissions?.push(payload.data);
        state.errors = null;
      })
      .addCase(createUserPermission.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateUserPermission.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updateUserPermission.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const index = state.userPermissions?.findIndex(
          (el) => el.user_permission_id === Number(payload.data.user_permission_id),
        );
        if (state.userPermissions && index) state.userPermissions[index] = payload.data;
        state.errors = null;
      })
      .addCase(updateUserPermission.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteUserPermission.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteUserPermission.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteUserPermission.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const UserPermissionReducer = userPermissionSlice.reducer;
export const UserPermissionSliceActions = userPermissionSlice.actions;
