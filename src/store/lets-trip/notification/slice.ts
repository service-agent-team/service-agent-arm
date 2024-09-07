import { createSlice } from '@reduxjs/toolkit';
import { getLetstripUsers } from './actions';
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
      });
  },
});

export const LetsTripNotificationReduce = letstripNotificationSlice.reducer;
export const LetsTripNotificationSliceActions = letstripNotificationSlice.actions;
