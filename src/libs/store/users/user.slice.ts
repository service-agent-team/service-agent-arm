import { createSlice } from '@reduxjs/toolkit';
import { ISetUserPayload, IUserInitalState, PayloadEnum } from './user-interfaces';
import { getUsers } from './user.actions';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
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
