import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './contract.interface';
import { getAllUsers } from './contract.action';

const initialState: InitialState = {
  data: null,
  loading: {
    sign: false,
  },
  error: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.data = payload.data;
    });
  },
});

export const ContractReducer = contractSlice.reducer;
export const ContractSliceActions = contractSlice.actions;
