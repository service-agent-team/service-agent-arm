import { createSlice } from '@reduxjs/toolkit';
import { getAllRole } from './actions';
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
  errors: null,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRole.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
        state.roles = null;
      })
      .addCase(getAllRole.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.roles = payload.data;
        state.errors = null;
      })
      .addCase(getAllRole.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
    // .addCase(createUserRole.pending, (state) => {
    //   state.loading.post = true;
    //   state.errors = null;
    //   state.roles = null;
    // })
    // .addCase(createUserRole.fulfilled, (state, { payload }) => {
    //   state.loading.post = false;
    //   state.roles?.push(payload.data);
    //   state.errors = null;
    // })
    // .addCase(createUserRole.rejected, (state, { payload }) => {
    //   state.loading.post = false;
    //   state.errors = payload;
    // });
  },
});

export const RoleReducer = roleSlice.reducer;
export const RoleSliceActions = roleSlice.actions;
