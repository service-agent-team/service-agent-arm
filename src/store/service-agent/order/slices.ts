import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../../lets-trip/car-type/types';
import { getAgentOrders } from './actions';
import { IAgentPermissionInitialState } from './types';

const initialState: IAgentPermissionInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  order: null,
  orders: null,
  status: 4,
  errors: null,
};

export const agentOrderSlice = createSlice({
  name: 'agentOrder',
  initialState,
  reducers: {
    setTariffLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
    setAgentOrderStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgentOrders.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAgentOrders.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.orders = payload.data;
        state.errors = null;
      })
      .addCase(getAgentOrders.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const AgentOrderReducer = agentOrderSlice.reducer;
export const AgentOrderSliceActions = agentOrderSlice.actions;
