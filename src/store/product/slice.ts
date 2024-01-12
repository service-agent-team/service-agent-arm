import { createSlice } from '@reduxjs/toolkit';
import { IProductInitalState } from './types';

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
  extraReducers: {},
});

export const ProductReducer = productSlice.reducer;
export const ProductActions = productSlice.actions;
