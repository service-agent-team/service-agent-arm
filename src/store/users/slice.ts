import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './actions';
import { ISetUserPayload, IUserInitalState, PayloadEnum } from './types';

const initialState: IUserInitalState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  users: null,
  total: 0,
  errors: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, { payload }: { payload: PayloadEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setUsers: (state, { payload }: ISetUserPayload) => {
      state.users = payload;
    },

    setError: (state, { payload }) => {
      state.errors = payload;
    },

    setTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
        state.users = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.users = payload.data;
        state.total = payload.data.length;
        state.errors = null;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const UserReducer = userSlice.reducer;
export const UserSliceActions = userSlice.actions;
