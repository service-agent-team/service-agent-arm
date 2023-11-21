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
  reducers: {},
  extraReducers: () => {},
});

export const AuthReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
