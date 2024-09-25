import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createPropertyTranslation,
  deletePropertyTranslation,
  getAllProperty,
  getOneProperty,
} from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  properties: null,
  property: null,
  errors: null,
};

export const slice = createSlice({
  name: 'bookingProperty',
  initialState,
  reducers: {
    setProperties: (state, { payload }) => {
      state.properties = payload;
    },
    setOneProperty: (state, { payload }) => {
      state.property = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperty.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllProperty.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.properties = payload.content;
        state.errors = null;
      })
      .addCase(getAllProperty.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneProperty.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneProperty.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.property = payload;
        state.errors = null;
      })
      .addCase(getOneProperty.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createPropertyTranslation.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createPropertyTranslation.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.property?.translations) {
          state.property.translations.push(payload.data);
        }
        state.errors = null;
      })
      .addCase(createPropertyTranslation.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deletePropertyTranslation.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deletePropertyTranslation.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deletePropertyTranslation.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingPropertyReduce = slice.reducer;
export const BookingPropertySliceActions = slice.actions;
