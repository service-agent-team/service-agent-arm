import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../car-type/types';
import { ILetsTripOrderInitialState, LetsTripOrderStatus } from './types';

const initialState: ILetsTripOrderInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  orders: null,
  status: LetsTripOrderStatus.active,
  errors: null,
};

export const letsTripOrderSlice = createSlice({
  name: 'letsTripOrder',
  initialState,
  reducers: {
    setCarLoading: (state, { payload }: { payload: PayloadTariffEnum }) => {
      state.loading[payload] = !state.loading[payload];
    },
    setOrderStatus: (state, { payload }: { payload: LetsTripOrderStatus }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const LetsTripOrderReduce = letsTripOrderSlice.reducer;
export const LetsTripOrderSliceActions = letsTripOrderSlice.actions;
