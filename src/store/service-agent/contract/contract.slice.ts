import { createSlice } from '@reduxjs/toolkit';
import { acceptAgnet, getAllUsers, getOneAgent, rejectAgnet } from './contract.action';
import { InitialState } from './contract.interface';

const initialState: InitialState = {
  data: null,
  agent: null,
  status: 'success',
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContarctSatus: (state, { payload }) => {
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
      })
      .addCase(acceptAgnet.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(acceptAgnet.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(acceptAgnet.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      .addCase(rejectAgnet.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(rejectAgnet.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(rejectAgnet.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      // agnet get one
      .addCase(getOneAgent.pending, (state) => {
        state.loading.get = true;
        state.error = null;
      })
      .addCase(getOneAgent.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.agent = payload;
        state.error = null;
      })
      .addCase(getOneAgent.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.error = payload;
      });
  },
});

export const AgentContractReducer = contractSlice.reducer;
export const ContractSliceActions = contractSlice.actions;
