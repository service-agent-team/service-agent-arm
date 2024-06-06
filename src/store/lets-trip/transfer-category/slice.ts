import { createSlice } from '@reduxjs/toolkit';
import { ILetsTripTransferInitialState } from './types';
import {
  createLetsTripTransferCategory,
  deleteLetsTripTransferCategory,
  getAllLetsTripTransferCategory,
  getOneLetsTripTransferCategory,
  updateLetsTripTransferCategory,
} from './actions';

const initialState: ILetsTripTransferInitialState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  transferCategories: null,
  activeTransferCategories: null,
  transferCategory: null,
  pagination: { current: 0, pageSize: 50, total: 50 },
  deleted: true,
  errors: null,
};

export const letsTripTransferCategorySlice = createSlice({
  name: 'letsTripTransferCategory',
  initialState,
  reducers: {
    setLetsTripTransfersCategories: (state, { payload }) => {
      state.transferCategories = payload;
    },
    setLetsTripTransferCategoryStatus: (state, { payload }) => {
      state.deleted = payload;
    },
    setLetsTripTransferCategoryPagination: (state, { payload }) => {
      state.pagination = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLetsTripTransferCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllLetsTripTransferCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.transferCategories = payload.content;
        state.pagination = {
          current: payload.pageable.pageNumber,
          pageSize: payload.pageable.pageSize,
          total: payload.totalElements,
        };
        state.errors = null;
      })
      .addCase(getAllLetsTripTransferCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneLetsTripTransferCategory.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneLetsTripTransferCategory.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.transferCategory = payload;
        state.errors = null;
      })
      .addCase(getOneLetsTripTransferCategory.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createLetsTripTransferCategory.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createLetsTripTransferCategory.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.transferCategories?.push(payload);
        state.errors = null;
      })
      .addCase(createLetsTripTransferCategory.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(updateLetsTripTransferCategory.pending, (state) => {
        state.loading.patch = true;
        state.errors = null;
      })
      .addCase(updateLetsTripTransferCategory.fulfilled, (state, { payload }) => {
        state.loading.patch = false;
        state.transferCategory = payload;
        state.errors = null;
      })
      .addCase(updateLetsTripTransferCategory.rejected, (state, { payload }) => {
        state.loading.patch = false;
        state.errors = payload;
      })
      .addCase(deleteLetsTripTransferCategory.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteLetsTripTransferCategory.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteLetsTripTransferCategory.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const LetsTripTransferCategoryReduce = letsTripTransferCategorySlice.reducer;
export const LetsTripTransferCategorySliceActions = letsTripTransferCategorySlice.actions;
