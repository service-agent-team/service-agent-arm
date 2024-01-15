import { createSlice } from '@reduxjs/toolkit';
import { PayloadTariffEnum } from '../car-type/types';
import { getStatistica } from './action';
import { IDriverinitialState } from './types';

const initialState: IDriverinitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
  },
  statistica: null,
  errors: null,
};

export const orderSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistica.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getStatistica.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.statistica = payload.data[0];
        state.errors = null;
      })
      .addCase(getStatistica.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const OrderReducer = orderSlice.reducer;
export const OrderSliceActions = orderSlice.actions;
