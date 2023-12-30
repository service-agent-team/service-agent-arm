import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './contract.action';
import { InitialState } from './contract.interface';

const initialState: InitialState = {
  data: null,
  status: 'created',
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null,
  agent: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setSatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.loading.get = false;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      });
  },
});

export const AgentContractReducer = contractSlice.reducer;
export const ContractSliceActions = contractSlice.actions;
