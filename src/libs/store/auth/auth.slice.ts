import { cliearStorage } from '@/helpers';
import { createSlice } from '@reduxjs/toolkit';
import { SignIn } from './auth.actions';
import { InitialState } from './auth.interface';

const initialState: InitialState = {
  user: null,
  token: null,
  isAuth: false,
  loading: {
    sign: false,
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
      cliearStorage();
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
      });
  },
});

export const AuthReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
