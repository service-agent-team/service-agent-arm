import { createSlice } from '@reduxjs/toolkit';
import { createUser, editUser, getOneUser, getUsers } from './actions';
import { IUserInitalState, IUserResponseData, PayloadEnum } from '@/types';

const initialState: IUserInitalState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  users: null,
  user: null,
  total: 0,
  errors: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserLoading: (state, { payload }: { payload: PayloadEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },

    setUsers: (state, { payload }) => {
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
        state.users = payload.data as IUserResponseData[];
        state.total = (payload.data as IUserResponseData[]).length;
        state.errors = null;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createUser.fulfilled, (state, _) => {
        state.loading.post = false;
        state.errors = null;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(getOneUser.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneUser.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.user = payload.data as IUserResponseData;
      })
      .addCase(getOneUser.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading.put = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        state.user = payload.data as IUserResponseData;
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      });
  },
});

export const UserReducer = userSlice.reducer;
export const UserSliceActions = userSlice.actions;
