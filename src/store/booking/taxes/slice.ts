import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createTaxe,
  createTaxeTranslation,
  deleteTaxe,
  getAllTaxes,
  getOneTaxe,
  updateTaxe,
} from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  taxes: null,
  taxe: null,
  errors: null,
};

export const bookingTaxesSlice = createSlice({
  name: 'bookingTaxes',
  initialState,
  reducers: {
    setTaxes: (state, { payload }) => {
      state.taxes = payload;
    },
    setOneTaxe: (state, { payload }) => {
      state.taxe = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaxes.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllTaxes.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.taxes = payload;
        state.errors = null;
      })
      .addCase(getAllTaxes.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneTaxe.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneTaxe.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.taxe = payload;
        state.errors = null;
      })
      .addCase(getOneTaxe.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createTaxe.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createTaxe.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.taxes?.push(payload.data as any);
        state.errors = null;
      })
      .addCase(createTaxe.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(createTaxeTranslation.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createTaxeTranslation.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.taxes) {
          const foundedIndex = state.taxes.findIndex((c) => c.id === payload.data.id);
          if (foundedIndex !== -1) {
            state.taxes[foundedIndex].translations.push({
              ...payload.data,
              languageType: payload.data.languageType,
            });
          }
        }
        state.errors = null;
      })
      .addCase(createTaxeTranslation.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateTaxe.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updateTaxe.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const foundIndex = state.taxes?.findIndex((f) => f.id === payload.data.id);
        if (foundIndex && state.taxes) state.taxes[foundIndex] = payload.data as any;
        state.errors = null;
      })
      .addCase(updateTaxe.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteTaxe.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteTaxe.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteTaxe.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingTaxesReduce = bookingTaxesSlice.reducer;
export const BookingTaxesSliceActions = bookingTaxesSlice.actions;
