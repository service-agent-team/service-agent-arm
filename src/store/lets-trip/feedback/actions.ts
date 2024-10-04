import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FeedbackService } from '@/services';
import { appActions } from '@/store/app';
import { IFeedback, IFeedbackChangePayload, IFeedbackPayload, IResponse } from './types';

export const getAllFeedback = createAsyncThunk<IResponse<IFeedback[]>, IFeedbackPayload>(
  EndPointes.letsTripFeedback + '/get-all',
  async ({ type, state, page, size }, thunkApi) => {
    try {
      const response = await FeedbackService.getAll(type, state, page, size);
      if (response.data) {
        thunkApi.dispatch(
          appActions.setPagination({
            current: response.data.pageable.pageNumber + 1,
            pageSize: response.data.pageable.pageSize,
            total: response.data.totalElements,
          }),
        );
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const confirmFeedback = createAsyncThunk<IFeedback, IFeedbackChangePayload>(
  EndPointes.letsTripFeedback + '/confirm',
  async ({ id, cb }, thunkApi) => {
    try {
      const response = await FeedbackService.confirm(id);
      if (response.data && cb) {
        cb();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const rejectFeedback = createAsyncThunk<IFeedback, IFeedbackChangePayload>(
  EndPointes.letsTripFeedback + '/reject',
  async ({ id, cb }, thunkApi) => {
    try {
      const response = await FeedbackService.reject(id);
      if (response.data && cb) {
        cb();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
