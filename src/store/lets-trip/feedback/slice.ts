import { createSlice } from '@reduxjs/toolkit';
import { FeedbackStateType, FeedbackType, InitialState } from './types';
import { confirmFeedback, getAllFeedback, rejectFeedback } from './actions';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  feedback: null,
  feedbacks: null,
  type: FeedbackType.TOUR,
  state: FeedbackStateType.NEW,
  modal: { name: 'confirm', data: false },
  errors: null,
};

export const slice = createSlice({
  name: 'letsTripFeedbackSlice',
  initialState,
  reducers: {
    setFeedbacks: (state, { payload }) => {
      state.feedbacks = payload;
    },
    setOneFeedback: (state, { payload }) => {
      state.feedback = payload;
    },
    setFeedbackType: (state, { payload }) => {
      state.type = payload;
    },
    setFeedbackState: (state, { payload }) => {
      state.state = payload;
    },
    setFeedbackModal: (state, { payload }) => {
      state.modal = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedback.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllFeedback.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.feedbacks = payload.content;
        state.errors = null;
      })
      .addCase(getAllFeedback.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(confirmFeedback.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(confirmFeedback.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.feedbacks = state.feedbacks?.filter((f) => f.id !== payload.id) || state.feedbacks;
        state.errors = null;
      })
      .addCase(confirmFeedback.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(rejectFeedback.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(rejectFeedback.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        state.feedbacks = state.feedbacks?.filter((f) => f.id !== payload.id) || state.feedbacks;
        state.errors = null;
      });
  },
});

export const LetsTripFeedbackReduce = slice.reducer;
export const LetsTripFeedbackSliceActions = slice.actions;
