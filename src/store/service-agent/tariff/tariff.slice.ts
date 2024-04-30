import { createSlice } from '@reduxjs/toolkit';
import {
  createAgentTariffCategory,
  deleteAgentTariffCategory,
  getAllAgentCategory,
  getAllAgentTariffCategory,
  getOneAgentTariffCategory,
  updateAgentTariffCategory,
} from './tariff.action';
import { InitialState } from './types';

const initialState: InitialState = {
  tariff: null,
  tariffs: null,
  categories: null,
  status: 'success',
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null,
};

export const tariffSlice = createSlice({
  name: 'agentTariffCategory',
  initialState,
  reducers: {
    setAgentTariffCategoryStatus: (state, { payload }) => {
      state.status = payload;
    },
    setAgentTariffCategory: (state, { payload }) => {
      state.tariffs = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentTariffCategory.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllAgentTariffCategory.fulfilled, (state, { payload }) => {
        state.tariffs = payload.content;
        state.loading.get = false;
      })
      .addCase(getAllAgentTariffCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      })
      .addCase(getOneAgentTariffCategory.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getOneAgentTariffCategory.fulfilled, (state, { payload }) => {
        state.tariff = payload;
        state.loading.get = false;
      })
      .addCase(getOneAgentTariffCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      })
      .addCase(getAllAgentCategory.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllAgentCategory.fulfilled, (state, { payload }) => {
        state.categories = payload.content;
        state.loading.get = false;
      })
      .addCase(getAllAgentCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.get = false;
      })
      .addCase(createAgentTariffCategory.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(createAgentTariffCategory.fulfilled, (state, { payload }) => {
        state.tariffs?.push(payload.data);
        state.loading.post = false;
      })
      .addCase(createAgentTariffCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.post = false;
      })
      .addCase(updateAgentTariffCategory.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(updateAgentTariffCategory.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        const findIndex = state.tariffs?.findIndex((el) => el.tariffId === payload.data.tariffId);
        if (findIndex && state.tariffs && state.tariff) {
          state.tariffs[findIndex] = payload.data;
          state.tariff = payload.data;
        }
      })
      .addCase(updateAgentTariffCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.post = false;
      })
      .addCase(deleteAgentTariffCategory.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteAgentTariffCategory.fulfilled, (state) => {
        state.loading.delete = false;
      })
      .addCase(deleteAgentTariffCategory.rejected, (state, { error }) => {
        state.error = error;
        state.loading.delete = false;
      });
  },
});

export const AgentTariffReducer = tariffSlice.reducer;
export const AgentTariffSliceActions = tariffSlice.actions;
