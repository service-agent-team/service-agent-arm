import { clearStorage } from '@/common/helpers';
import { createSlice } from '@reduxjs/toolkit';
import { SignIn, getMe } from './actions';
import { InitialState } from '@/store/auth/interface.ts';

const initialState: InitialState = {
  user: null,
  token: null,
  isAuth: false,
  loading: {
    sign: false,
    get: false,
  },
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },

    setAuth: (state, { payload }) => {
      state.isAuth = payload;
    },

    setLoading: ({ loading }, { payload }) => {
      loading.sign = payload;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },

    logout: (state) => {
      clearStorage();
      state.isAuth = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.loading.sign = true;
        state.error = null;
      })
      .addCase(SignIn.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isAuth = true;
        state.loading.sign = false;
        state.user = payload.data;
        state.token = payload.access_token;
      })
      .addCase(SignIn.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading.sign = false;
        state.isAuth = false;
      })
      .addCase(getMe.pending, (state) => {
        state.loading.get = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.user = payload.data;
        state.error = null;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading.get = false;
        state.error = null;
      });
  },
});

export const AuthReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
