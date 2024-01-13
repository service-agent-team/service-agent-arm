import { createSlice } from '@reduxjs/toolkit';
import { IProductInitalState } from './types';
import { addProduct, getByProducts, getOneProduct } from './action';

const initialState: IProductInitalState = {
  loading: {
    get: false,
    post: false,
    delete: false,
    put: false,
  },
  products: [],
  product: null,
  errors: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getByProducts.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getByProducts.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.products = payload.data?.content;
      })
      .addCase(getByProducts.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getOneProduct.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.product = payload.data;
      })
      .addCase(getOneProduct.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading.post = false;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const ProductReducer = productSlice.reducer;
export const ProductSliceActions = productSlice.actions;
