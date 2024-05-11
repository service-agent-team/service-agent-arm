import { createSlice } from '@reduxjs/toolkit';
import { createLetsTripCategory, getAllLetsTripCategory } from './actions';
import { ILetsTripCategoryInitialState } from './types';

const initialState: ILetsTripCategoryInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  categories: null,
  category: null,
  errors: null,
};

export const letsTripCategorySlice = createSlice({
  name: 'letsTripCategory',
  initialState,
  reducers: {
    setLetsTripCountry: (state, { payload }) => {
      state.categories = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.categories = payload.content;
        state.errors = null;
      })
      .addCase(getAllLetsTripCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripCategory.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripCategory.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.categories?.push(payload.data);
        state.errors = null;
      })
      .addCase(createLetsTripCategory.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      });
  },
});

export const LetsTripCategoryReduce = letsTripCategorySlice.reducer;
export const LetsTripCategorySliceActions = letsTripCategorySlice.actions;
