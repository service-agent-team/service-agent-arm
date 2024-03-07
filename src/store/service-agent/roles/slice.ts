import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../../lets-trip/car-type/types';
import { createRoles, deleteRoles, editRoles, getRoles, getRolesById } from './action';
import { IRoles, IRolesInitalState } from './types';

const initialState: IRolesInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  roles: null,
  oneRole: null,
  errors: null,
};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setTariffLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setRoles: (state, { payload }: { payload: IRoles[] }) => {
      state.roles = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getRoles.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.roles = payload.data;
        state.errors = null;
      })
      .addCase(getRoles.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createRoles.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createRoles.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createRoles.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(getRolesById.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getRolesById.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.errors = null;
        state.oneRole = payload.data;
      })
      .addCase(getRolesById.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(editRoles.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(editRoles.fulfilled, (state) => {
        state.loading.patch = false;
        state.errors = null;
      })
      .addCase(editRoles.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteRoles.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteRoles.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteRoles.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const RolesReducer = rolesSlice.reducer;
export const RolesSliceActions = rolesSlice.actions;
