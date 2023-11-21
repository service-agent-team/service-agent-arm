import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  token: null,
  isAuth: null,
  loading: {
    sign: false,
    email: false,
    check: false,
    reset: false,
  },
  isEmailSend: false,
};

const authSlice = createSlice({
  name: 'auth/slice',
  initialState,
  reducers: {
    
  },
});
