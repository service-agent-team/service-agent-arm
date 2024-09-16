import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  getAllBedType,
  getOneBedType,
  createBedType,
  updateBedType,
  deleteBedType,
  createBedTypeTranslation,
} from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  bedTypes: null,
  bedType: null,
  errors: null,
};

export const bookingBedTypeSlice = createSlice({
  name: 'bookingBedType',
  initialState,
  reducers: {
    setBedType: (state, { payload }) => {
      state.bedTypes = payload;
    },
    setOneBedType: (state, { payload }) => {
      state.bedType = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBedType.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllBedType.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.bedTypes = payload;
        state.errors = null;
      })
      .addCase(getAllBedType.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneBedType.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneBedType.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.bedType = payload;
        state.errors = null;
      })
      .addCase(getOneBedType.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createBedType.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createBedType.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.bedTypes?.push(payload.data as any);
        state.errors = null;
      })
      .addCase(createBedType.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(createBedTypeTranslation.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createBedTypeTranslation.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.bedTypes) {
          const foundedIndex = state.bedTypes.findIndex((c) => c.id === payload.data.id);
          if (foundedIndex !== -1) {
            state.bedTypes[foundedIndex].translations.push({
              ...payload.data,
              languageType: payload.data.lang,
            });
          }
        }
        state.errors = null;
      })
      .addCase(createBedTypeTranslation.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateBedType.pending, (state) => {
        state.loading.put = true;
        state.errors = null;
      })
      .addCase(updateBedType.fulfilled, (state, { payload }) => {
        state.loading.put = false;
        const foundIndex = state.bedTypes?.findIndex((f) => f.id === payload.data.id);
        if (foundIndex && state.bedTypes) state.bedTypes[foundIndex] = payload.data as any;
        state.errors = null;
      })
      .addCase(updateBedType.rejected, (state, { payload }) => {
        state.loading.put = false;
        state.errors = payload;
      })
      .addCase(deleteBedType.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteBedType.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteBedType.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingBedTypeReduce = bookingBedTypeSlice.reducer;
export const BookingBedTypeSliceActions = bookingBedTypeSlice.actions;
