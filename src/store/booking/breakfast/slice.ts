import { EndPointes } from '@/services/endpoints';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createBreakfast, findBreakfasts, findOneBreakfast } from './action';
import { InitialSate } from './type';

const initialState: InitialSate = {
  loading: { get: false, post: false, put: false, delete: false },
  modal: { delete: false, translation: false },
  selectable_id: null,
  breakfasts: [],
  breakfast: null,
};

export type BreakfastModalKeys = keyof typeof initialState.modal;

export const breakfastSlice = createSlice({
  name: EndPointes.booking.breakfast,
  initialState,
  reducers: {
    setBreakfastModal: (
      state,
      { payload }: PayloadAction<{ name: BreakfastModalKeys; state: boolean }>,
    ) => {
      state.modal[payload.name] = payload.state;
    },
    setBreakfastSelectableId: (state, { payload }) => {
      state.selectable_id = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findBreakfasts.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(findBreakfasts.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.breakfasts = payload.data;
      })
      .addCase(findBreakfasts.rejected, (state) => {
        state.loading.get = false;
      })
      .addCase(findOneBreakfast.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(findOneBreakfast.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.breakfast = payload.data;
      })
      .addCase(findOneBreakfast.rejected, (state) => {
        state.loading.get = false;
      })
      .addCase(createBreakfast.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(createBreakfast.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        // state.breakfasts.push(payload.data);
        state.breakfasts = state.breakfasts.concat([payload.data]);
      })
      .addCase(createBreakfast.rejected, (state) => {
        state.loading.post = false;
      });
  },
});

export const breakfastReducer = breakfastSlice.reducer;
export const breakfastSliceActions = breakfastSlice.actions;
