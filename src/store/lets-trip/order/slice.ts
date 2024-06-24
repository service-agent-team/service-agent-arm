import { createSlice } from '@reduxjs/toolkit';
import {
  ILetsTripOrder,
  ILetsTripOrderInitialState,
  LetsTripOrderStatus,
  LetsTripOrderType,
} from './types';
import { getLetsTripOrderByStatus } from './actions';

const initialState: ILetsTripOrderInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  orders: null,
  order: null,
  status: LetsTripOrderStatus.CREATED,
  type: LetsTripOrderType.TOUR,
  errors: null,
};

export const letsTripOrderSlice = createSlice({
  name: 'letsTripOrder',
  initialState,
  reducers: {
    setLetsTripOrderStatus: (state, { payload }: { payload: LetsTripOrderStatus }) => {
      state.status = payload;
    },
    setLetsTripOrderType: (state, { payload }: { payload: LetsTripOrderType }) => {
      state.type = payload;
    },
    setLetsTripOrder: (state, { payload }) => {
      state.order = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLetsTripOrderByStatus.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getLetsTripOrderByStatus.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.orders = payload.content;
        state.errors = null;
      })
      .addCase(getLetsTripOrderByStatus.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      });
  },
});

export const LetsTripOrderReduce = letsTripOrderSlice.reducer;
export const LetsTripOrderSliceActions = letsTripOrderSlice.actions;
