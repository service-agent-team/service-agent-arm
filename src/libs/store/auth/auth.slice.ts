import { cliearStorage } from '@/helpers';
import { createSlice } from '@reduxjs/toolkit';
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

    logout: (state) => {
      cliearStorage();
      state.isAuth = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: () => {},
});

export const AuthReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
