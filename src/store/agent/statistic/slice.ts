import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../../car-type/types';
import { getAgentOrdersStatis } from './actions';
import { IAgentPermissionInitalState } from './types';

const initialState: IAgentPermissionInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  statistic: null,
  errors: null,
  status: 4,
};

export const agentStatisticSlice = createSlice({
  name: 'agentOrderStatistic',
  initialState,
  reducers: {
    setTariffLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
    setOrderSatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgentOrdersStatis.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAgentOrdersStatis.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.statistic = payload.data;
        state.errors = null;
      })
      .addCase(getAgentOrdersStatis.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const AgentStatisticReducer = agentStatisticSlice.reducer;
export const AgentStatisticSliceActions = agentStatisticSlice.actions;
