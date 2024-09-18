import { createSlice } from '@reduxjs/toolkit';
import {
  getAllNotificationTemplates,
  getLetstripUsers,
  sendMultiTemplateNotification,
} from './actions';
import { IInitialState } from './type';

const initialState: IInitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  users: [],
  selected_userIds: [],
  templates: null,
};

export const letstripNotificationSlice = createSlice({
  name: 'letstripNotification',
  initialState,
  reducers: {
    setSelectedUserId: (state, { payload }) => {
      state.selected_userIds = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLetstripUsers.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getLetstripUsers.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.users = payload;
      })
      .addCase(getLetstripUsers.rejected, (state) => {
        state.loading.get = false;
      })
      .addCase(getAllNotificationTemplates.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllNotificationTemplates.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.templates = payload;
      })
      .addCase(getAllNotificationTemplates.rejected, (state) => {
        state.loading.get = false;
      })
      .addCase(sendMultiTemplateNotification.pending, (state) => {
        state.loading.post = true;
      })
      .addCase(sendMultiTemplateNotification.fulfilled, (state) => {
        state.loading.post = false;
      })
      .addCase(sendMultiTemplateNotification.rejected, (state) => {
        state.loading.post = false;
      });
  },
});

export const LetsTripNotificationReduce = letstripNotificationSlice.reducer;
export const LetsTripNotificationSliceActions = letstripNotificationSlice.actions;
