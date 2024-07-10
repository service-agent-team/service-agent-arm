import { createSlice } from '@reduxjs/toolkit';
import {
  acceptAgent,
  getAllUsers,
  getOneAgent,
  rejectAgent,
  updateCanPaymentAgent,
} from './contract.action';
import { IAgentUserStatusType, InitialState } from './contract.interface';

const initialState: InitialState = {
  data: null,
  agent: null,
  status: IAgentUserStatusType.SUCCESS,
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  pagination: {
    page: 0,
    size: 10,
    total: 10,
  },
  error: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContractStatus: (state, { payload }) => {
      state.status = payload;
    },
    setContractPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setOneAgent: (state, { payload }) => {
      state.agent = payload;
    },
    setAgentRolePermissions: (state, { payload }) => {
      if (state.agent) state.agent.userRolePermissions = payload;
    },
    setAgentProjectPermissions: (state, { payload }) => {
      if (state.agent) state.agent.userProjectPermissions = payload;
    },
    setAgentCanPayment: (state, { payload }) => {
      if (state.agent) state.agent.isCanPayment = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.pagination = payload.pagination;
        state.loading.get = false;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      })
      .addCase(acceptAgent.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(acceptAgent.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(acceptAgent.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      .addCase(rejectAgent.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(rejectAgent.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(rejectAgent.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      })
      // agent get one
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
      })
      .addCase(updateCanPaymentAgent.pending, (state) => {
        state.loading.put = true;
        state.error = null;
      })
      .addCase(updateCanPaymentAgent.fulfilled, (state) => {
        state.loading.put = false;
        state.error = null;
      })
      .addCase(updateCanPaymentAgent.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.error = payload;
      });
  },
});

export const AgentContractReducer = contractSlice.reducer;
export const ContractSliceActions = contractSlice.actions;
